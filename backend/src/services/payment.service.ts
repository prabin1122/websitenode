import Stripe from 'stripe';
import paypal from '@paypal/checkout-server-sdk';
import config from '../config/index.js';
import prisma from '../config/prisma.js';

const stripeClient = new Stripe(config.stripeSecretKey, { apiVersion: '2023-08-16' });

const paypalEnvironment = config.paypalMode === 'production'
  ? new paypal.core.LiveEnvironment(config.paypalClientId, config.paypalClientSecret)
  : new paypal.core.SandboxEnvironment(config.paypalClientId, config.paypalClientSecret);
const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);

const PaymentService = {
  async createStripeSession(orderId: string, amount: number, currency = 'USD') {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency, product_data: { name: `Order ${orderId}` }, unit_amount: Math.round(amount * 100) }, quantity: 1 }],
      mode: 'payment',
      success_url: `${config.frontendUrl}/checkout/success?orderId=${orderId}`,
      cancel_url: `${config.frontendUrl}/checkout/cancel?orderId=${orderId}`,
    });

    await prisma.payment.create({
      data: {
        orderId,
        provider: 'STRIPE',
        providerId: session.id,
        amount: amount.toString(),
        status: 'PENDING',
      },
    });

    return session;
  },

  async createPayPalOrder(orderId: string, amount: number, currency = 'USD') {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: orderId,
        amount: { currency_code: currency, value: amount.toFixed(2) },
      }],
      application_context: {
        return_url: `${config.frontendUrl}/checkout/success?orderId=${orderId}`,
        cancel_url: `${config.frontendUrl}/checkout/cancel?orderId=${orderId}`,
      },
    });

    const response = await paypalClient.execute(request);
    const paypalOrder = response.result;
    await prisma.payment.create({
      data: {
        orderId,
        provider: 'PAYPAL',
        providerId: paypalOrder.id,
        amount: amount.toString(),
        status: 'PENDING',
      },
    });

    return paypalOrder;
  },

  async handleStripeWebhook(payload: Buffer, signature: string) {
    const event = stripeClient.webhooks.constructEvent(payload, signature, config.stripeWebhookSecret);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const payment = await prisma.payment.findUnique({ where: { providerId: session.id } });
      if (payment) {
        await prisma.payment.update({ where: { id: payment.id }, data: { status: 'COMPLETED', confirmedAt: new Date() } });
      }
    }
    return event;
  },
};

export default PaymentService;

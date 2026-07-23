import { Request, Response } from 'express';
import PaymentService from '../services/payment.service.js';

const PaymentController = {
  async createSession(req: Request, res: Response) {
    const { provider, orderId, amount, currency } = req.body;
    if (provider === 'STRIPE') {
      const session = await PaymentService.createStripeSession(orderId, amount, currency);
      return res.status(201).json({ status: 'success', data: session });
    }

    if (provider === 'PAYPAL') {
      const order = await PaymentService.createPayPalOrder(orderId, amount, currency);
      return res.status(201).json({ status: 'success', data: order });
    }

    return res.status(400).json({ status: 'error', message: 'Unsupported payment provider' });
  },

  async stripeWebhook(req: Request, res: Response) {
    const signature = req.headers['stripe-signature'] as string;
    const event = await PaymentService.handleStripeWebhook(req.body, signature);
    return res.status(200).json({ received: event.type });
  },
};

export default PaymentController;

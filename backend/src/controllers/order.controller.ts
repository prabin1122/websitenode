import { Request, Response } from 'express';
import prisma from '../config/prisma.js';
import { Prisma } from '@prisma/client';

const OrderController = {
  async list(req: Request, res: Response) {
    try {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          items: { include: { product: true } },
          payment: true,
          user: true,
        },
      });
      return res.json({ status: 'success', data: orders });
    } catch (error: any) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: req.params.id },
        include: {
          items: { include: { product: true } },
          payment: true,
          user: true,
        },
      });
      if (!order) return res.status(404).json({ status: 'error', message: 'Order not found' });
      return res.json({ status: 'success', data: order });
    } catch (error: any) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { userId, total, tax, shippingCost, items } = req.body;
      const order = await prisma.order.create({
        data: {
          userId: userId || 'guest',
          total: new Prisma.Decimal(total || 0),
          tax: new Prisma.Decimal(tax || 0),
          shippingCost: new Prisma.Decimal(shippingCost || 0),
          items: {
            create: (items || []).map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: new Prisma.Decimal(item.price),
              total: new Prisma.Decimal(item.price * item.quantity),
            })),
          },
        },
        include: { items: true },
      });
      return res.status(201).json({ status: 'success', data: order });
    } catch (error: any) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const order = await prisma.order.update({
        where: { id: req.params.id },
        data: { status },
      });
      return res.json({ status: 'success', data: order });
    } catch (error: any) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  },
};

export default OrderController;

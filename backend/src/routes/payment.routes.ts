import express from 'express';
import { Router } from 'express';
import PaymentController from '../controllers/payment.controller.js';

const router = Router();

router.post('/session', PaymentController.createSession);
router.post('/stripe', express.raw({ type: 'application/json' }), PaymentController.stripeWebhook);

export default router;

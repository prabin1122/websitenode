import { Queue } from 'bullmq';
import redis from '../config/redis.js';

const emailQueue = new Queue('emails', { connection: redis });

const QueueService = {
  async enqueueEmail(payload: Record<string, unknown>) {
    await emailQueue.add('send-email', payload, { attempts: 3, backoff: { type: 'exponential', delay: 5000 } });
  },
};

export default QueueService;

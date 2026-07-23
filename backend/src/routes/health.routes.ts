import { Router } from 'express';
import prisma from '../config/prisma.js';
import redis from '../config/redis.js';

const router = Router();

router.get('/', async (req, res) => {
  let dbStatus = 'disconnected';
  let redisStatus = 'disconnected';

  try {
    const result = await prisma.$queryRaw`SELECT 1 as value`;
    if (result) dbStatus = 'ok';
  } catch (error) {
    dbStatus = 'disconnected';
  }

  try {
    redisStatus = await redis.ping();
  } catch (error) {
    redisStatus = 'disconnected';
  }

  return res.json({
    uptime: process.uptime(),
    database: dbStatus,
    cache: redisStatus,
  });
});

export default router;

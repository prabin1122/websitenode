import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger.js';

const prisma = new PrismaClient();

export const connectDatabase = async (): Promise<boolean> => {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully via Prisma');
    return true;
  } catch (error: any) {
    logger.error(`Database connection failure: ${error?.message || error}`);
    return false;
  }
};

export default prisma;

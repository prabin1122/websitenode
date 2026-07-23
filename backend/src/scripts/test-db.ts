import 'dotenv/config';
import prisma, { connectDatabase } from '../config/prisma.js';
import logger from '../utils/logger.js';

async function testConnection() {
  const dbUrl = process.env.DATABASE_URL || 'Not defined';
  const maskedUrl = dbUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
  logger.info(`Testing database connection to: ${maskedUrl}`);

  const connected = await connectDatabase();
  if (connected) {
    try {
      const userCount = await prisma.user.count();
      logger.info(`Connection successful! Total users in DB: ${userCount}`);
    } catch (err: any) {
      logger.warn(`Connected to server, but querying table failed (migrations/schema sync may be needed): ${err.message}`);
    }
  } else {
    logger.error('Failed to connect to the database. Verify PostgreSQL server is running and DATABASE_URL is correct.');
  }

  await prisma.$disconnect();
}

testConnection();

import 'dotenv/config';
import app from './app.js';
import logger from './utils/logger.js';
import config from './config/index.js';
import { connectDatabase } from './config/prisma.js';

const port = config.port;

app.listen(port, async () => {
  logger.info(`Backend service listening on port ${port}`);
  await connectDatabase();
});

import { Redis } from 'ioredis';
import config from './index.js';

const redis = new Redis(config.redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
});

export default redis;

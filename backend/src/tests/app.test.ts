import request from 'supertest';
import app from '../app.js';
import prisma from '../config/prisma.js';
import redis from '../config/redis.js';

describe('Health endpoint', () => {
  afterAll(async () => {
    await prisma.$disconnect();
    try {
      redis.disconnect();
    } catch (e) {
      // Ignore if not connected
    }
  });

  it('returns 200 and basic health JSON', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('database');
    expect(response.body).toHaveProperty('cache');
  });
});

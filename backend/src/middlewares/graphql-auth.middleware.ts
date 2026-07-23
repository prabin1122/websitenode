import jwt from 'jsonwebtoken';
import { Request } from 'express';
import config from '../config/index.js';

export default function authMiddleware(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { user: undefined };
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtAccessSecret) as { userId: string; role: string };
    return { user: decoded };
  } catch {
    return { user: undefined };
  }
}

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma, Role } from '@prisma/client';
import prisma from '../config/prisma.js';
import config from '../config/index.js';
import EmailService from './email.service.js';

const AuthService = {
  async register(payload: { email: string; password: string; firstName: string; lastName: string; role?: Role }) {
    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) throw new Error('Email already registered');

    const hashed = await bcrypt.hash(payload.password, 12);
    const user = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashed,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: payload.role ?? 'CUSTOMER',
      },
    });

    const verificationToken = jwt.sign({ userId: user.id }, config.jwtAccessSecret, { expiresIn: '1d' });
    await EmailService.sendVerificationEmail(user.email, verificationToken);

    return { id: user.id, email: user.email, role: user.role, verified: user.verified };
  },

  async login(payload: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(payload.password, user.password);
    if (!valid) throw new Error('Invalid credentials');
    if (!user.verified) throw new Error('Email not verified');

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, config.jwtAccessSecret, { expiresIn: config.accessTokenExpiresIn });
    const refreshToken = jwt.sign({ userId: user.id, role: user.role }, config.jwtRefreshSecret, { expiresIn: config.refreshTokenExpiresIn });

    return { accessToken, refreshToken };
  },

  async refresh(token: string) {
    const decoded = jwt.verify(token, config.jwtRefreshSecret) as jwt.JwtPayload;
    const user = await prisma.user.findUnique({ where: { id: String(decoded.userId) } });
    if (!user) throw new Error('Invalid refresh token');

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, config.jwtAccessSecret, { expiresIn: config.accessTokenExpiresIn });
    return { accessToken };
  },

  async verifyEmail(token: string) {
    const decoded = jwt.verify(token, config.jwtAccessSecret) as jwt.JwtPayload;
    await prisma.user.update({ where: { id: String(decoded.userId) }, data: { verified: true } });
  },

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return;
    const resetToken = jwt.sign({ userId: user.id }, config.jwtAccessSecret, { expiresIn: '1h' });
    await EmailService.sendPasswordResetEmail(user.email, resetToken);
  },

  async resetPassword(token: string, password: string) {
    const decoded = jwt.verify(token, config.jwtAccessSecret) as jwt.JwtPayload;
    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.update({ where: { id: String(decoded.userId) }, data: { password: hashed } });
  },
};

export default AuthService;

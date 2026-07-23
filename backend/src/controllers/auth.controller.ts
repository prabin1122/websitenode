import { Request, Response } from 'express';
import AuthService from '../services/auth.service.js';

const AuthController = {
  async register(req: Request, res: Response) {
    const user = await AuthService.register(req.body);
    return res.status(201).json({ status: 'success', data: user });
  },

  async login(req: Request, res: Response) {
    const tokens = await AuthService.login(req.body);
    return res.json({ status: 'success', data: tokens });
  },

  async refreshToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] ?? '';
    const tokens = await AuthService.refresh(token);
    return res.json({ status: 'success', data: tokens });
  },

  async verifyEmail(req: Request, res: Response) {
    await AuthService.verifyEmail(req.body.token);
    return res.json({ status: 'success', message: 'Email verified' });
  },

  async forgotPassword(req: Request, res: Response) {
    await AuthService.forgotPassword(req.body.email);
    return res.json({ status: 'success', message: 'Password reset email sent' });
  },

  async resetPassword(req: Request, res: Response) {
    await AuthService.resetPassword(req.body.token, req.body.password);
    return res.json({ status: 'success', message: 'Password reset completed' });
  },
};

export default AuthController;

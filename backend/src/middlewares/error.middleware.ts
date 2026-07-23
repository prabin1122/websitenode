import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.js';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err.stack ?? err.message);

  return res.status(500).json({
    status: 'error',
    message: err.message ?? 'Internal server error',
  });
}

export default errorHandler;

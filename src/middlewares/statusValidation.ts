import { Request, Response, NextFunction } from 'express';
import statusSchemas from '../schemas/statusSchemas';

const statusMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;

  const { error } = statusSchemas.validate({ status });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(Number(code)).json({ message });
  }

  return next();
};

export default statusMiddleware;

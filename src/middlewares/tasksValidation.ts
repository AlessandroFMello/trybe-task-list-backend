import { Request, Response, NextFunction } from 'express';
import tasksSchemas from '../schemas/tasksSchemas';

const tasksMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { task } = req.body;

  const { error } = tasksSchemas.validate({ task });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(Number(code)).json({ message });
  }

  return next();
};

export default tasksMiddleware;

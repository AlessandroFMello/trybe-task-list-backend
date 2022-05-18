import { Request, Response } from 'express';

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
) => {
  console.log(error);

  return res.status(500).json({ error, message: 'Algo deu errado, tente novamente' });
};

export default errorMiddleware;

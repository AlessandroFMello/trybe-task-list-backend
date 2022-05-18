import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const {
  MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_PORT,
} = process.env;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/TRYBE_TASK_LIST`,
    },
  },
});

export default prisma;

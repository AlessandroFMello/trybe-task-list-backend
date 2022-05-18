import { StatusCodes } from 'http-status-codes';
import prisma from '../models/connection';

export default class TasksServices {
  public async getAll() {
    const tasks = await prisma.taskList.findMany();

    if (!tasks) return { code: StatusCodes.NOT_FOUND, message: 'Task not found' };

    return { code: StatusCodes.OK, tasks };
  }

  public async getById(id: number) {
    const task = await prisma.taskList.findFirst({ where: { id } });

    if (!task) return { code: StatusCodes.NOT_FOUND, message: 'Task not found' };

    return { code: StatusCodes.OK, task };
  }

}

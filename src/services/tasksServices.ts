import { StatusCodes } from 'http-status-codes';
import prisma from '../models/connection';

export default class TasksServices {
  public async getAll() {
    const tasks = await prisma.taskList.findMany();

    if (!tasks) return { code: StatusCodes.NOT_FOUND, message: 'Task not found' };

    return { code: StatusCodes.OK, tasks };
  }

}

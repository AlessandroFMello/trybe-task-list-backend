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

  public async update(id: number, task: string) {
    const findTask = await this.getById(id);

    if (!findTask) return { code: StatusCodes.NOT_FOUND, message: 'Task not found' };

    const updated = await prisma.taskList.update({
      where: { id },
      data: {
        task,
      },
    });

    return { code: StatusCodes.OK, updated };
  }

  public async delete(id: number) {
    const task = await prisma.taskList.findFirst({ where: { id } });

    if (!task) return { code: StatusCodes.NOT_FOUND, message: 'Task not found' };

    const deleted = await prisma.taskList.delete({ where: { id } });

    if (!deleted) return { code: StatusCodes.BAD_REQUEST, message: 'Task not deleted' };

    return {
      code: StatusCodes.OK, message: 'Task deleted successfully', deleted,
    };
  }

}

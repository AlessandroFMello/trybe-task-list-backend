import { StatusCodes } from 'http-status-codes';
import prisma from '../models/connection';

export default class TasksServices {
  public async getAll() {
    const tasks = await prisma.taskList.findMany();

    if (!tasks) return { code: StatusCodes.NOT_FOUND, message: 'Tasks not found' };

    return { code: StatusCodes.OK, tasks };
  }

  public async getById(id: number) {
    const task = await prisma.taskList.findFirst({ where: { id } });

    if (!task) return { code: StatusCodes.NOT_FOUND, message: 'Task not found' };

    return { code: StatusCodes.OK, task };
  }

  public async updateTask(id: number, task: string) {
    const findTask = await prisma.taskList.findFirst({ where: { id } });

    if (!findTask) return { code: StatusCodes.NOT_FOUND, message: 'Task not found' };

    const updated = await prisma.taskList.update({
      where: { id },
      data: {
        task,
      },
    });

    return { code: StatusCodes.OK, updated };
  }

  public async updateStatus(id: number, status: string) {
    const findTask = await prisma.taskList.findFirst({ where: { id } });

    if (!findTask) return { code: StatusCodes.NOT_FOUND, message: 'Task not found' };

    const updated = await prisma.taskList.update({
      where: { id },
      data: {
        status,
      },
    });

    return { code: StatusCodes.OK, updated };
  }

  public async delete(id: number) {
    const task = await prisma.taskList.findFirst({ where: { id } });

    if (!task) return { code: StatusCodes.NOT_FOUND, message: 'Task not found' };

    const deleted = await prisma.taskList.delete({ where: { id } });

    return {
      code: StatusCodes.OK, message: 'Task deleted successfully', deleted,
    };
  }

  public async create(task: string) {
    const created = await prisma.taskList.create({
      data: {
        task,
        status: 'PENDING',
      },
    });

    return { code: StatusCodes.OK, created };
  }
}

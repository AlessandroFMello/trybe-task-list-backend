import { Request, Response } from 'express';
import TasksServices from '../services/tasksServices';

export default class TasksController {
  public tasksService: TasksServices;

  constructor() {
    this.tasksService = new TasksServices();
  }

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const { code, message, tasks } = await this.tasksService.getAll();

    if (!tasks) return res.status(code).json({ message });

    return res.status(code).json(tasks);
  };

}

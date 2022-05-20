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

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { code, message, task } = await this.tasksService.getById(Number(id));

    if (!task) return res.status(code).json({ message });

    return res.status(code).json(task);
  };

  public updateTask = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { task } = req.body;

    const { code, message, updated } = await this.tasksService.updateTask(Number(id), task);

    if (!updated) return res.status(code).json({ message });

    return res.status(code).json(updated);
  };

  public updateStatus = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { status } = req.body;

    const { code, message, updated } = await this.tasksService.updateStatus(Number(id), status);

    if (!updated) return res.status(code).json({ message });

    return res.status(code).json(updated);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const { code, message, deleted } = await this.tasksService.delete(Number(id));

    if (!deleted) return res.status(code).json({ message });

    return res.status(code).json({ message });
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { task } = req.body;

    const { code, created } = await this.tasksService.create(task);

    return res.status(code).json(created);
  };
}

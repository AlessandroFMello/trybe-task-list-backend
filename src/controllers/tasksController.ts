import { Request, Response } from 'express';
import TasksServices from '../services/tasksServices';

export default class TasksController {
  public tasksService: TasksServices;

  constructor() {
    this.tasksService = new TasksServices();
  }

}

import { Router } from 'express';
import TasksController from '../controllers/tasksController';

const router = Router();

const tasksController = new TasksController();

export default router;

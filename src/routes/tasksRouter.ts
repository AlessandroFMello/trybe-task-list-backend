import { Router } from 'express';
import TasksController from '../controllers/tasksController';

const router = Router();

const tasksController = new TasksController();

router.get('/', tasksController.getAll);

export default router;

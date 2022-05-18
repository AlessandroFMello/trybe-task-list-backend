import { Router } from 'express';
import TasksController from '../controllers/tasksController';

const router = Router();

const tasksController = new TasksController();

router.get('/', tasksController.getAll);

router.get('/:id', tasksController.getById);

router.put('/:id', tasksValidation, tasksController.update);

router.delete('/:id', tasksController.delete);

export default router;

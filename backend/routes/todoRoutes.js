import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  clearCompleted,
} from '../controllers/todoController.js';

const router = express.Router();

// GET all todos / POST new todo
router.route('/').get(getTodos).post(createTodo);

// DELETE all completed todos (must be before /:id routes)
router.delete('/completed', clearCompleted);

// PUT update / DELETE by id
router.route('/:id').put(updateTodo).delete(deleteTodo);

// PATCH toggle completion
router.patch('/:id/toggle', toggleTodo);

export default router;

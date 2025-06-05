import express from 'express';
import { TodoController } from '../controller/todo.controller.js';

const router = express.Router();


router.route("/create").post(TodoController.createTodo);
router.route("/todos").get(TodoController.getAllTodos);
router.route("/:todoId/update").put(TodoController.updateTodo);
router.route("/:todoId/delete").post(TodoController.deleteTodo);

export default router;
import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import { authorize } from "../middlewares/auth.middleware.js";

// routes for task management
const taskRouter = Router();

taskRouter.use(authorize); // Protect all task routes

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;

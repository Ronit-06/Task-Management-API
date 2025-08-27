import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignUser,
  unassignUser,
  addComment,
  deleteComment
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
taskRouter.post("/:id/assign", assignUser);
taskRouter.post("/:id/unassign", unassignUser);
taskRouter.post("/:id/comments", addComment);
taskRouter.delete("/:id/comments/:commentId", deleteComment);

export default taskRouter;

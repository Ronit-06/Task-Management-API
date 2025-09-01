import Task from "../models/task.model.js";
import mongoose from "mongoose";
import { triggerReminder } from "./reminderController.js";
import User from "../models/user.model.js";
import {
  createTaskLog,
  getAllTasksLog,
  updateTaskLog,
  deleteTaskLog,
  assignUserLog,
  unassignUserLog,
  addCommentLog,
  deleteCommentLog,
} from "./logController.js";

// Controller to get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    await getAllTasksLog({ userId: req.user._id || null });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Controller to get a task by ID
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = await Task.findById(taskId);
    if (!taskData) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(taskData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// Controller to create a new task
export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      assignedUser: req.body.assignedUser,
    });

    console.log("this is the user:" + req.user);

    await createTaskLog({
      taskId: newTask._id,
      userId: req.user ? req.user._id : null,
    });
    await triggerReminder(newTask);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Controller to update a task
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, dueDate, assignedUser } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        // The only fields that are allowed to be updated
        title,
        description,
        status,
        dueDate,
        assignedUser,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    await updateTaskLog({
      taskId: updatedTask._id,
      userId: req.user._id || null,
    });

    await triggerReminder(updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Controller to delete a task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);

    await deleteTaskLog({
      taskId: taskId,
      userId: req.user._id || null,
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Controller to assign a user to a task
export const assignUser = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { userId } = req.body;
    const task = await Task.findById(taskId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (task.assignedUser.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is already assigned to this task" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { assignedUser: userId }, updatedAt: Date.now() }, // to add user to array
      { new: true }
    );

    await assignUserLog({
      taskId,
      assignedUserId: userId,
      userId: req.user._id || null,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error assigning user to task", error });
  }
};

// Controller to unassign a user from a task
export const unassignUser = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { userId } = req.body;
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    if (!task.assignedUser.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is not assigned to this task" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $pull: { assignedUser: userId }, updatedAt: Date.now() }, // to remove user from array
      { new: true }
    );

    await unassignUserLog({
      taskId,
      unassignedUserId: userId,
      userId: req.user._id || null,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error unassigning user from task", error });
  }
};

//Add comment to a task
export const addComment = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { user, comment } = req.body;
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const newComment = { _id: new mongoose.Types.ObjectId(), user, comment };
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { comments: newComment }, updatedAt: Date.now() },
      { new: true }
    );

    await addCommentLog({
      taskId,
      commentId: newComment._id,
      userId: req.user._id || null,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment to task", error });
  }
};

//Delete comment from a task
export const deleteComment = async (req, res) => {
  try {
    const taskId = req.params.id;
    const commentId = req.params.commentId;
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const comment = task.comments.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $pull: { comments: { _id: commentId } }, updatedAt: Date.now() },
      { new: true }
    );

    await deleteCommentLog({
      taskId,
      commentId,
      userId: req.user._id || null,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment from task", error });
  }
};

//priority filtering
export const getTasksByPriority = async (req, res, next) => {
  try {
    const { priority } = req.params;
    const tasks = await Task.find({ priority });

    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      throw new Error(`Invalid priority: ${priority}`);
    }

    await getAllTasksLog({ priority, userId: req.user._id || null });

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

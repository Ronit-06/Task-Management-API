import Task from "../models/task.model.js";
import mongoose from "mongoose";

// Controller to get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
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

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Controller to update a task
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { ...req.body, updatedAt: Date.now() },
      { new: true } // need to add specific remove and add fields
    );
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
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { assignedUser: userId }, updatedAt: Date.now() }, // to add user to array
      { new: true }
    );
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
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $pull: { assignedUser: userId }, updatedAt: Date.now() }, // to remove user from array
      { new: true }
    );
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
    }

    const newComment = { _id: new mongoose.Types.ObjectId(), user, comment };
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { comments: newComment }, updatedAt: Date.now() },
      { new: true }
    );
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
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $pull: { comments: { _id: commentId } }, updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) { 
    res.status(500).json({ message: "Error deleting comment from task", error });
  }
}
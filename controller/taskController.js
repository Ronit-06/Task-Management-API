import task from "../models/task.model.js";

// Controller to get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Controller to get a task by ID
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = await task.findById(taskId);
    res.status(200).json(taskData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// Controller to create a new task
export const createTask = async (req, res) => {
  try {
    const newTask = await task.create({
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
    const updatedTask = await task.findByIdAndUpdate(
      taskId,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
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
    await task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};


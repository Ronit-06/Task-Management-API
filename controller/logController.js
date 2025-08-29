import Log from "../models/log.model.js";

//Activity log - Admin only
export const getLogs = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    const logs = await Log.find();
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};

export const getAllTasksLog = async ({ userId }) => {
  try {
    await Log.create({
      action: "Fetched All Tasks",
      details: "All tasks were fetched",
      user: userId || null,
    });
  } catch (e) {
    throw new Error("Failed to create log: " + e.message);
  }
};

export const createTaskLog = async ({ taskId, userId }) => {
  try {
    await Log.create({
      action: "Task Created",
      user: userId || "System", // Use userId directly
      details: `Task ${taskId} created`,
       
    });
  } catch (e) {
    throw new Error("Failed to create log: " + e.message);
  }
};

export const updateTaskLog = async ({ taskId, userId }) => {
  try {
    await Log.create({
      action: "Task Updated",
      details: `Task ${taskId} updated`,
      user: userId || null, // Use userId directly
    });
  } catch (e) {
    throw new Error("Failed to create log: " + e.message);
  }
};

export const deleteTaskLog = async ({ taskId, userId }) => {
  try {
    await Log.create({
      action: "Task Deleted",
      details: `Task ${taskId} deleted`,
      user: userId || null, // Use userId directly
    });
  } catch (e) {
    throw new Error("Failed to create log: " + e.message);
  }
};

export const assignUserLog = async ({ taskId, assignedUserId, userId }) => {
  try {
    await Log.create({
      action: "User Assigned to Task",
      details: `User ${assignedUserId} assigned to Task ${taskId}`,
      user: userId || null, // Use userId directly
    });
  } catch (e) {
    throw new Error("Failed to create log: " + e.message);
  }
};

export const unassignUserLog = async ({ taskId, unassignedUserId, userId }) => {
  try {
    await Log.create({
      action: "User Unassigned from Task",
      details: `User ${unassignedUserId} unassigned from Task ${taskId}`,
      user: userId || null, // Use userId directly
    });
  } catch (e) {
    throw new Error("Failed to create log: " + e.message);
  }
};

export const addCommentLog = async ({ taskId, commentId, userId }) => {
  try {
    await Log.create({
      action: "Comment Added to Task",
      details: `Comment ${commentId} added to Task ${taskId}`,
      user: userId || null, // Use userId directly
    });
  } catch (e) {
    throw new Error("Failed to create log: " + e.message);
  }
};

export const deleteCommentLog = async ({ taskId, commentId, userId }) => {
  try {
    await Log.create({
      action: "Comment Deleted from Task",
      details: `Comment ${commentId} deleted from Task ${taskId}`,
      user: userId || null, // Use userId directly
    });
  } catch (e) {
    throw new Error("Failed to create log: " + e.message);
  }
};

export const getTasksByPriorityLog = async ({ priority, userId }) => {
  try {
    await Log.create({
      action: "Fetched Tasks by Priority",
      details: `Tasks with priority ${priority} were fetched`,
      user: userId || null,
    });
  } catch (e) {
    throw new Error("Failed to create log: " + e.message);
  }
};

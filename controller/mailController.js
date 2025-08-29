import { sendReminderEmail } from "../utils/send-email.js";
import Log from "../models/log.model.js";

// Function to trigger reminder emails based on due dates
export const triggerReminder = async (task) => {
  try {
    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);

    // Calculate the difference in days
    const timeDifference = dueDate - currentDate;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    // Check if the difference matches the predefined intervals
    console.log(`Days remaining for task "${task.title}":`, daysRemaining);
    const reminderIntervals = [1, 3, 5, 7];
    if (reminderIntervals.includes(daysRemaining)) {
      // Send reminder email
      console.log(
        `Sending reminder for task "${task.title}" with ${daysRemaining} day(s) remaining.`
      );
      await sendReminderEmail({
        to: task.assignedUser, // Array of assigned users
        task: task,
        daysRemaining: daysRemaining,
      });
      console.log(
        `Reminder email sent for task "${task.title}" with ${daysRemaining} day(s) remaining.`
      );
    }

    await Log.create({
      action: "Reminder Triggered",
      details: `Reminder check for Task ${task._id} with ${daysRemaining} day(s) remaining`,
    });
  } catch (error) {
    console.error("Error triggering reminder:", error);
  }
};

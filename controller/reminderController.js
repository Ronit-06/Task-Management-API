import { emailQueue } from "../config/queue.js";
import Log from "../models/log.model.js";

// Function to trigger reminder emails based on due dates
export const triggerReminder = async (task) => {
  try {
    const dueDate = new Date(task.dueDate);
    const now = new Date();

    const reminderIntervals = [1, 3, 5, 7];

    await clearOldReminders(task._id);

    for (const days of reminderIntervals) {
      const sendTime = new Date(dueDate);
      sendTime.setDate(sendTime.getDate() - days);

      const delay = sendTime.getTime() - now.getTime();

      if (delay > 0) {
        await emailQueue.add(
          {
            to: task.assignedUser,
            task: task,
            daysRemaining: days,
          },
          {
            delay,
            jobId: `${task._id}-${days}`, // ensures uniqueness
            removeOnComplete: true,
            removeOnFail: true,
          } // Bull will wait until this delay is reached
        );
        
        console.log(
          `Queued reminder for task "${task.title}" (${days} days before due date)`
        );

        await Log.create({
          action: "Reminder Triggered",
          details: `Reminder check for Task ${task._id} with ${days} day(s) remaining`,
        });
      }
    }
  } catch (error) {
    console.error("Error scheduling reminders:", error);
  }
};

async function clearOldReminders(taskId) {
  const jobs = await emailQueue.getDelayed(); // only delayed jobs
  for (const job of jobs) {
    if (job.id.startsWith(`${taskId}-`)) {
      await job.remove();
      console.log(`Removed old reminder job ${job.id}`);
    }
  }
}

// //For debugging
// const checkQueue = async () => {
//   const waiting = await emailQueue.getWaiting(); // jobs waiting to be processed
//   const delayed = await emailQueue.getDelayed(); // jobs scheduled with delay
//   const active = await emailQueue.getActive(); // jobs currently being processed
//   const completed = await emailQueue.getCompleted(); // jobs already done
//   const failed = await emailQueue.getFailed(); // jobs that failed

//   console.log("Waiting jobs:", waiting.length);
//   console.log("Delayed jobs:", delayed.length);
//   console.log("Active jobs:", active.length);
//   console.log("Completed jobs:", completed.length);
//   console.log("Failed jobs:", failed.length);
  
// };

// checkQueue();


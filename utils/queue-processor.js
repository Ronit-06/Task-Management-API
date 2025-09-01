import { emailQueue } from "../config/queue.js";
import { sendReminderEmail } from "../utils/send-email.js";

emailQueue.process(async (job) => {
  const { to, task, daysRemaining } = job.data;

  console.log(`Processing email job for task "${task.title}"...`);

  // Send reminder emails
  await sendReminderEmail({ to, task, daysRemaining });

  console.log(`Email job for task "${task.title}" completed.`);
});
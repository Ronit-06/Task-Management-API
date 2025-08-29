import { EMAIL } from "../config/env.js";
import { reminderEmailTemplate } from "./email-template.js";
import { transporter } from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, task, daysRemaining }) => {
  if (!to || !task || !daysRemaining) {
    throw new Error("Missing parameters to send email");
  }

  for (const user of to) {
    const emailContent = reminderEmailTemplate(
      task.title,
      task.dueDate,
      task.description,
      user.user, // User's name
      daysRemaining
    );

    const subject = `Reminder: Task "${task.title}" is due in ${daysRemaining} day(s)`;

    const mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: subject,
      html: emailContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${user.email}`);
    } catch (error) {
      console.error(`Error sending email to ${user.email}:`, error);
    }
  }
};

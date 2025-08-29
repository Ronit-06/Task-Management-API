export const reminderEmailTemplate = (taskTitle, dueDate, description, userName, daysRemaining) => {
  // Determine the message and styling based on days remaining
  let urgencyColor;
  let urgencyMessage;

  switch (daysRemaining) {
    case 1:
      urgencyColor = "#ff4d4d"; // Red for high urgency
      urgencyMessage = "Your task is due tomorrow!";
      break;
    case 3:
      urgencyColor = "#ffa500"; // Orange for medium urgency
      urgencyMessage = "Your task is due in 3 days.";
      break;
    case 5:
      urgencyColor = "#ffd700"; // Yellow for low urgency
      urgencyMessage = "Your task is due in 5 days.";
      break;
    case 7:
      urgencyColor = "#32cd32"; // Green for very low urgency
      urgencyMessage = "Your task is due in 7 days.";
      break;
    default:
      urgencyColor = "#007bff"; // Default blue
      urgencyMessage = `Your task is due in ${daysRemaining} days.`;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background-color: ${urgencyColor};
            color: #ffffff;
            text-align: center;
            padding: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
          }
          .content h2 {
            color: #333333;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .content p {
            color: #555555;
            line-height: 1.6;
          }
          .footer {
            text-align: center;
            padding: 10px;
            background-color: #f4f4f9;
            color: #888888;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Task Reminder</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName},</h2>
            <p>${urgencyMessage}</p>
            <p>This is a reminder that your task <strong>"${taskTitle}"</strong> is due on <strong>${new Date(dueDate).toLocaleDateString()}</strong>.</p>
            <p><strong>Task Description:</strong> ${description}</p>
            <p>Please make sure to complete it on time.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Task Management System</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
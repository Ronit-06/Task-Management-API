import Queue from "bull";

// Create a Bull queue for sending emails
export const emailQueue = new Queue("emailQueue", {
  redis: {
    host: "redis-12570.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 12570,
    username: "default",
    password: "WwRwB1J1dVBmCHr2PAiQPxtJ657XxRmb",
  },
});

// Event listeners for debugging
emailQueue.on("completed", (job) => {
  console.log(`Job with ID ${job.id} has been completed.`);
});

emailQueue.on("failed", (job, err) => {
  console.error(`Job with ID ${job.id} failed with error: ${err.message}`);
});

emailQueue.on("error", (err) => {
  console.error("Redis connection error in emailQueue:", err);
});



import Queue from "bull";
import { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } from "./env.js";

// Create a Bull queue for sending emails
export const emailQueue = new Queue("emailQueue", {
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
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



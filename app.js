import express from "express";
import taskRouter from "./routes/taskRoutes.js";
import { PORT } from "./config/env.js";
import { connectDB } from "./mongodb/mongodb.js";

const app = express();

app.use(express.json());

app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Task Management API.");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectDB();
});

export default app;

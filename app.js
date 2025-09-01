import express from "express";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { PORT } from "./config/env.js";
import { connectDB } from "./mongodb/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());

app.use(arcjetMiddleware);

app.use("/api/users", userRouter); //Routes for user management
app.use("/api/auth", authRouter); //Routes for authentication
app.use("/api/tasks", taskRouter); //Roues for task management

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Task Management API."); // Test route
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`); // Start the server

  await connectDB();
});

export default app;

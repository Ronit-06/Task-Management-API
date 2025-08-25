import { getUsers, getUser } from "../controller/userController.js";
import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

//Routes for user management

userRouter.get("/", authorize, getUsers); //admin only
userRouter.get("/:id", authorize, getUser);

export default userRouter;
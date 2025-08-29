import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //Sign up user
    const { user, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [
        {
          user,
          email,
          password: hashedPassword,
          isAdmin: false, // Default to false
        },
      ],
      { session }
    );

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { newUser, token },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // Login user
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    //Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

//logout user : Just a placeholder as JWT is stateless
export const logout = async (res, next) => {
  try {
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

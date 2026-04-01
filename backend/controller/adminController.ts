import User from "../models/userModel";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ where: { email } }) as any;

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    // Plain password check (only for learning)
    if (user.password !== password) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Remove password before sending response
    const { password: _, ...userData } = user.toJSON();

    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: userData,
    });

  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
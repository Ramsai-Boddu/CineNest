import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { ref } from "node:process";

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

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      })
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '20m' });

    user.isLoggedIn = true;
    await user.save();
    const { password: _, ...userData } = user.toJSON();

    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: userData,
      accessToken,
      refreshToken
    });

  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
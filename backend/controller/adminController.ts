import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { sendOTPMail } from "../verify/sendEmail";
import cloudinary from "../utils/cloudinary";

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

    const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '20m' });
    const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '40m' });

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

export const sendOtp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;

    // 1. Validate email
    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ where: { email } }) as any;

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    sendOTPMail(otp, email);
    return res.status(200).json({
      status: true,
      message: "OTP sent successfully"
    });

  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ where: { email } }) as any;

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        status: false,
        message: "OTP not generated or already used",
      });
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({
        status: false,
        message: "OTP expired",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    // 7. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Password reset successful",
    });

  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id as string);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id as string;
    const user = await User.findOne({ where: { id } }) as any
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }
    user.isLoggedIn = false;
    await user.save();
    return res.status(200).json({
      status: true,
      message: "Logout successful",
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

interface AuthRequest extends Request {
  user?: any;
  file?: Express.Multer.File;
}

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const loggedInUser = req.user;

    console.log("LoggedIn User:", loggedInUser);
    console.log("Param UserId:", userId);
    if (
      loggedInUser?.id !== userId &&
      loggedInUser?.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to update this user",
      });
    }

    const user = await User.findByPk(userId as string);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, email } = req.body;

    // 🖼️ Existing image
    let profilePic = user.getDataValue("profilePic");

    // 🔥 FIXED FILE HANDLING
    const file = req.file;

    if (file) {
      const uploadResult: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(file.buffer); // ✅ NO ERROR
      });

      profilePic = uploadResult.secure_url;
    }

    // ✏️ Update user
    await user.update({
      name: name ?? user.getDataValue("name"),
      email: email ?? user.getDataValue("email"),
      profilePic,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

import { Request, Response } from "express";
import Movies from "../models/movieModel";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "All fields are required",
        status: false,
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        status: false,
      });
    }

    const newUser = await User.create({ name, email });

    return res.status(201).json({
      message: "User created successfully",
      status: true,
      data: newUser,
    });

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      message: "Users fetched successfully",
      status: true,
      data: users,
    });

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    
    const id = req.params.id as string; 

    if (!id) {
      return res.status(400).json({
        message: "Id is required"
      });
    }

   
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

   
    await user.update(req.body);

    return res.status(200).json({
      message: "User updated successfully",
      user
    });

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Error updating user",
        error: error.message
      });
    }

    return res.status(500).json({
      message: "Unknown error"
    });
  }
};


import { Request, Response } from "express";
import Movies from "../models/movieModel";
import User from "../models/userModel";
import { sendAddUserMail } from "../verify/sendEmail";

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
     sendAddUserMail(email,name);
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

export const getUsers = async (req: Request, res: Response) => {
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
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "Id is required",
      });
    }

    const user = await User.findByPk(id as string);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { name, email } = req.body;

    await user.update({
      name,
      email,
    });

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user",
    });
  }
};

export const manageActive = async(req:Request, res:Response): Promise<Response> => {
  try {
    const userId = req.params.userId as string;
    const user = await User.findOne({where: {id:userId}}) as any;

    if(!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    user.isActive = !user.isActive;
    await user.save();
    return res.status(200).json({
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
      status: true,
    });
  } catch (error:any) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id as string);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        await user.destroy();

        return res.status(200).json({
            status: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.error("Delete user error:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

export const deleteMovie = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await Movies.findOne({
      where: {
        id: id as string      },
    });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    await movie.destroy();

    return res.status(200).json({
      message: "Movie deleted successfully",
    });

  } catch (error: any) {
    console.error("DELETE ERROR:", error);

    return res.status(500).json({
      message: "error deleting movie",
      error: error.message,
    });
  }
};
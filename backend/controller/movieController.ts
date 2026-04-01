import { Request, Response } from "express";
import Movies from "../models/movieModel";

export const getMovies = async (req: Request, res: Response): Promise<Response> => {
  try {
    const movies = await Movies.findAll();

    return res.status(200).json({
      message: "Movies fetched successfully",
      status: true,
      data: movies.length > 0 ? movies : "No movies found",
    });

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
import { Request, Response } from "express";
import Movies from "../models/movieModel";

export const addMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await Movies.create({
            ...req.body   // ✅ userId will come from defaultValue
        });

        res.status(201).json({
            message: "Movie added successfully ✅",
            movie
        });

    } catch (error: any) {
        res.status(500).json({
            message: "Error adding movie ❌",
            error: error.message
        });
    }
};
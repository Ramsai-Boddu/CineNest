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



export const getMoviesByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId as string;

        const movies = await Movies.findAll({
            where: { userId }
        });

        if (movies.length === 0) {
            res.status(404).json({
                message: "No movies found for this user ❌"
            });
            return;
        }

        res.status(200).json({
            message: "Movies fetched successfully ✅",
            count: movies.length,
            movies
        });

    } catch (error: any) {
        res.status(500).json({
            message: "Error fetching movies ❌",
            error: error.message
        });
    }
};
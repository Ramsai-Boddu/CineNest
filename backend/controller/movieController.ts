import { Request, Response } from "express";
import Movies from "../models/movieModel";
import cloudinary from "../utils/cloudinary";

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

}

export const addMovie = async (req: any, res: Response): Promise<void> => {
    try {
        let moviePic: string | null = null;

        const file = req.file;

        if (file) {
            const uploadResult: any = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "movies" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.buffer);
            });

            moviePic = uploadResult.secure_url;
        }

        // ✅ CREATE MOVIE (FIXED)
        const movie = await Movies.create({
            ...req.body,
            releaseYear: Number(req.body.releaseYear), // 🔥 important
            rating: Number(req.body.rating),           // 🔥 important
            moviePic,
            userId: req.user.id, // ✅ REQUIRED FIX
        });

        res.status(201).json({
            message: "Movie added successfully ✅",
            movie,
        });

    } catch (error: any) {
        console.error("FULL ERROR:", error); // 🔥 add this for debugging

        res.status(500).json({
            message: "Error adding movie ❌",
            error: error.message,
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


export const updateMovie=async(req:Request,res:Response)=>{
    try {

       const id = req.params.id as string;
         const movie: any = await Movies.findByPk(id);

        if(!movie){
            return res.status(404).json({
                message:"movie not found"
            })
        }
        await movie.update(req.body);

        return res.status(200).json({
            message:"Movie updated successfully",
            movie,
        });
    } catch (error :any) {
        return res.status(500).json({
            message:"Error updating movie",
            error: error.message
        });
        
    }
}

export const deleteMovie =async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const {userId}=req.body;

        if(!userId){
            return res.status(400).json({
                message:"userId is required"
            });
        }
        const movie=await Movies.findOne({
            where:{
                id:id as string,
                userId
            }
        });
        
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        await movie.destroy();

        return res.json({
            message:"Movie deleted successfully"
        });
    } catch (error:any) {
        return res.status(500).json({
            message:"error deleting movie",
            error:error.message
        });
    }
}
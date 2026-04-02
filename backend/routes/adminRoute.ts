import express from 'express';
import { login } from '../controller/adminController';
import { addMovie, deleteMovie, getMoviesByUser, updateMovie } from '../controller/movieController';

const router = express.Router();

router.put('/login', login);
router.post("/add-movie",  addMovie);
router.get("/get-movie/:userId", getMoviesByUser);
router.put('/update-movie/:id',updateMovie)
router.delete("/delete-movie/:id",deleteMovie);
export default router;
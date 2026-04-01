import express from 'express';
import { login } from '../controller/adminController';
import { addMovie, getMoviesByUser } from '../controller/movieController';

const router = express.Router();

router.put('/login', login);
router.post("/add-movie",  addMovie);
router.get("/get-movie/:userId", getMoviesByUser);

export default router;
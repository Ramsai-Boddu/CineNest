import express from 'express';
import { login, resetPassword, sendOtp } from '../controller/adminController';
import { addMovie, deleteMovie, getMoviesByUser, updateMovie } from '../controller/movieController';

const router = express.Router();

router.put('/login', login);
router.post("/add-movie",  addMovie);
router.get("/get-movie/:userId", getMoviesByUser);
router.put('/update-movie/:id',updateMovie)
router.delete("/delete-movie/:id",deleteMovie);
router.put("/send-otp", sendOtp);
router.put("/reset-password", resetPassword);


export default router;
import express from 'express';
import { getUserById, login, logout, resetPassword, sendOtp, updateUser } from '../controller/adminController';
import { addMovie, deleteMovie, getMovieById, getMoviesByUser, updateMovie } from '../controller/movieController';
import { singleUpload } from '../middleware/multer';
import { authMiddleware } from '../middleware/authMid';

const router = express.Router();

router.post('/login', login);
router.post("/add-movie",authMiddleware,singleUpload,addMovie);
router.get("/get-movie/:userId",authMiddleware, getMoviesByUser);
router.get("/get-movieById/:movieId",authMiddleware, getMovieById);
router.put('/update-movie/:movieId',authMiddleware,singleUpload,updateMovie);
router.delete("/delete-movie/:id",authMiddleware,deleteMovie);
router.put("/send-otp", sendOtp);
router.put("/reset-password", resetPassword);
router.put("/logout/:id", logout);
router.put('/update-user/:id',authMiddleware,singleUpload,updateUser);
router.get("/get-user/:id", getUserById);

export default router;
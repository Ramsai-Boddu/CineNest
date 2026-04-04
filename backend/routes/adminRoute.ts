import express from 'express';
import { getUserById, login, logout, resetPassword, sendOtp, updateUser } from '../controller/adminController';
import { addMovie, deleteMovie, getMoviesByUser, updateMovie } from '../controller/movieController';
import { singleUpload } from '../middleware/multer';
import { authMiddleware } from '../middleware/authMid';

const router = express.Router();

router.post('/login', login);
router.post("/add-movie",  addMovie);
router.get("/get-movie/:userId", getMoviesByUser);
router.put('/update-movie/:id',updateMovie)
router.delete("/delete-movie/:id",deleteMovie);
router.put("/send-otp", sendOtp);
router.put("/reset-password", resetPassword);
router.put("/logout/:id", logout);
router.put('/update-user/:id',authMiddleware,singleUpload,updateUser);
router.get("/get-user/:id", getUserById);

export default router;
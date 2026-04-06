import express from 'express';
import { deleteMovie,createUser, deleteUser, getUsers, manageActive, updateUser } from '../controller/superController';
import {  getMovies } from '../controller/movieController';
import { isAdmin } from '../middleware/authorize';
import { authMiddleware } from '../middleware/authMid';

const router = express.Router();

router.post('/create-user',authMiddleware,isAdmin, createUser);
router.get('/get-users',authMiddleware,isAdmin,getUsers);
router.get('/movies', getMovies);
router.patch('/manage-active/:userId',authMiddleware,isAdmin, manageActive);
router.put('/update-user/:id', authMiddleware,isAdmin, updateUser);
router.delete("/delete-user/:id", authMiddleware, isAdmin, deleteUser);
router.delete("/delete-movie/:id", deleteMovie);


export default router;


import express from 'express';
import { createUser, getMovies, getUsers } from '../controller/superController.js';
const router = express.Router();
router.post('/create-user', createUser);
router.get('/get-users', getUsers);
router.get('/movies', getMovies);
export default router;

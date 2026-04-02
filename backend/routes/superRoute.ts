import express from 'express';
import { createUser, getUsers, updateUser } from '../controller/superController';
import { getMovies } from '../controller/movieController';

const router = express.Router();

router.post('/create-user', createUser);
router.get('/get-users',getUsers);
router.get('/movies', getMovies);
router.put('/update-user/:id', updateUser);
export default router;


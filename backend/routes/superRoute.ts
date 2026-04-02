import express from 'express';
import { createUser, getUsers, manageActive, updateUser } from '../controller/superController';
import { getMovies } from '../controller/movieController';

const router = express.Router();

router.post('/create-user', createUser);
router.get('/get-users',getUsers);
router.get('/movies', getMovies);
router.patch('/manage-active/:userId', manageActive);
router.put('/update-user/:id', updateUser);

export default router;


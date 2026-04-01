import express from 'express';
import { login } from '../controller/adminController';
import { addMovie } from '../controller/movieController';

const router = express.Router();

router.put('/login', login);
router.post("/add-movie",  addMovie);

export default router;
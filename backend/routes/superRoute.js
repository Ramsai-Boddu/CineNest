import express from 'express';
import { createUser, getUsers } from '../controller/superController.js';

const router = express.Router();

router.post('/create-user', createUser);
router.get('/get-users',getUsers);

export default router;
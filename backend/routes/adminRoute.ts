import express from 'express';
import { login } from '../controller/adminController';

const router = express.Router();

router.put('/login', login);

export default router;
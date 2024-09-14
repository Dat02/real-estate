import express from 'express';
import { updateUser, deleteUser } from '../controller/user.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);


export default router;

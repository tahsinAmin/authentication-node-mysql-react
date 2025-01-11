import express from "express";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from "../middleware/AuthUSer.js";

const router = express.Router();

router.get('/users', verifyUser, verifyAdmin, getUsers);
router.get('/users/:id', verifyUser, verifyAdmin, getUserById);
router.post('/users', createUser);
router.patch('/users/:id', verifyUser, updateUser);
router.delete('/users/:id', verifyUser, verifyAdmin, deleteUser);

export default router;


import express from 'express';
import * as authController from "../controllers/auth.controller.js";
import { verifyToken } from '../middleware/auth.middleware.js'; 
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', authMiddleware.validateRegister, authController.register);
router.post('/login', authMiddleware.validateLogin, authController.loginUser);
router.get('/user', verifyToken, authController.getUser);
router.delete('/delete/:id', verifyToken, authController.DeleteUser);

export default router;

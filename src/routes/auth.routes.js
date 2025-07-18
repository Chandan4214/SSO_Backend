import express from 'express';
import * as authController from "../controllers/auth.controller.js";
import { verifyToken } from '../middleware/auth.middleware.js'; 

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.loginUser); 
router.get('/user', verifyToken, authController.getUser);
router.delete('/delete/:id', verifyToken, authController.DeleteUser);

export default router;

// src/middlewares/auth.middleware.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};



// src/middleware/auth.middleware.js
export const validateRegister = (req, res, next) => {
  console.log("signup Middleware runs");
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  if (req.body.password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  if (!/\S+@\S+\.\S+/.test(req.body.email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  next();
};
  export const validateLogin = (req, res, next) => {
    console.log("Login Middleware runs");
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    if (!/\S+@\S+\.\S+/.test(req.body.email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    next();
  }
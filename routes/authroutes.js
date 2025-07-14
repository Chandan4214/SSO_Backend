import express from 'express';
import  {connectTODB} from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const router=express.Router();


router.post('/register',async(req,res)=>{
  const {username,email,password}=req.body;


  try {
    const db=await connectTODB();

    const [rows]=await db.query('SELECT * from users where email=?',[email]);

    if (rows.length>0){
      return res.status(409).json({message:'Email already exists'})
    }
    const hashPassword=await bcrypt.hash(password,10);
    await db.query('INSERT INTO users (username,email,password) VALUES(?,?,?)',[username,email,hashPassword]);    
    return res.status(201).json({message:'User created successfully'})

  } catch (error) {
    res.status(500).json({message:error.message})
  }
    
})


router.post('/login',async(req,res)=>{
  const {email,password}=req.body;


  try {
    const db=await connectTODB();

    const [rows]=await db.query('SELECT * from users where email=?',[email]);
    
    if (rows.length===0){
      return res.status(404).json({message:'User not existed '})
    }
      const isMatch=await bcrypt.compare(password,rows[0].password);
       if (!isMatch){
         return res.status(401).json({message:'Invalid credentials'});
      }

      const token=jwt.sign({id:rows[0].id},process.env.JWT_KEY,{expiresIn:'1h'});

       return res.status(201).json({token:token})

  } catch (error) {
    res.status(500).json({message:error.message})
  }
    
})







const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header:", authHeader); 

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY); 

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};














router.get('/user', verifyToken, async (req, res) => {
  try {
    const db = await connectTODB();
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});












export default router;

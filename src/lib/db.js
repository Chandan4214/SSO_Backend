// src/lib/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js'; 

dotenv.config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,      
  process.env.DB_PASSWORD,  
  {
    host: process.env.DB_HOST, 
    dialect: 'mysql',
    logging: false,            // Disable SQL logging (optional)
  }
);

// Define models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;      // used to connect to the database and sync models

// Register models
db.User = UserModel(sequelize); 

export default db;

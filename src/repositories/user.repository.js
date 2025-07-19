import { connectTODB } from "../lib/db.js";
import {User} from "../models/user.model.js";
const db = await connectTODB();

// Find user by ID
export const findUserById = async (id) => {
 
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0]; // return single user object
};

// Find user by email
export const findUserByEmail = async (email) => {
  
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // return single user object
};

//Create a new user
export const createUser = async (username, email, password) => {

  const newUser = new User({ name: username, email, password });     // calling constructor so that validation is done 
   console.log(newUser);
  const [result] = await db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [newUser.name, newUser.email, newUser.password]
  );
  if (result.affectedRows === 0) {
    throw new Error('User creation failed');
  }
  newUser.id = result.insertId; 
  return newUser; // return the ID of the inserted user
};



export const Delete=async(id)=>{
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result

}



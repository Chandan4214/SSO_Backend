import { connectTODB } from "../lib/db.js";
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

// Create a new user
export const createUser = async (username, email, password) => {
 
  const [result] = await db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return result.insertId; // return the ID of the inserted user
};



export const Delete=async(id)=>{
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result

}



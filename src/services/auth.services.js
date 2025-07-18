import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { findUserById, findUserByEmail, createUser ,Delete} from '../repositories/user.repository.js';

export const registerUser = async (username, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(username, email, hashedPassword);
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
   return { token, userId: user.id };
};


export const DeleteUser = async (id) => {
  const user = await findUserById(id);
  if (!user) throw new Error('User not found');
   await Delete(id);     // it will call to the db logic--------(repository function called DeleteUser)
};




export const getUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) throw new Error('User not found');
  return user;
};

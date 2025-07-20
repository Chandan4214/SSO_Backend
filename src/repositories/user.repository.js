// src/repositories/user.repository.js
import db from '../lib/db.js'; // This includes sequelize and User model
const { User } = db;

// Find user by ID
export const findUserById = async (id) => {
  const user = await User.findByPk(id); // Sequelize's primary key lookup
  return user?.toJSON() ?? null;
};

// Find user by email
export const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  return user?.toJSON() ?? null;
};

// Create a new user
export const createUser = async (name, email, password) => {
  try {
    const user = await User.create({ name, email, password }); // validation & hashing handled in model
    return user.toJSON();
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

// Delete user by ID
export const Delete = async (id) => {
  const result = await User.destroy({ where: { id } });
  return result > 0; // returns true if deleted
};

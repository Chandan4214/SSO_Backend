import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import authrouter from "./src/routes/auth.routes.js"
import db from './src/lib/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authrouter)


app.listen(process.env.PORT, () => {
  console.log('Server is running on port ', process.env.PORT);
   db.sequelize.sync({ alter: true })
    .then(() => {
      console.log('Database synced successfully.');
    })
    .catch((err) => {
      console.error('Error syncing database:', err);
    });




})

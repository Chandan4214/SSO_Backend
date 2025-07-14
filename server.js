import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import authrouter  from './routes/authroutes.js'

const app = express();
app.use(cors());
app.use(express.json());
console.log(process.env.PORT);
app.use('/auth', authrouter)


app.listen(process.env.PORT, () => {
  console.log('Server is running on port ', process.env.PORT);
})

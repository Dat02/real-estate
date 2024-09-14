import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from '../api/routes/user.js'
import authRouter from '../api/routes/auth.js'
import { errorHandler } from './utils/error.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
    .connect(process.env.MONGODB)
    .then(() => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err);
    });

const _dirname = path.resolve();

const app = express();

app.use(express.static(path.join(_dirname, '/client/dist')));

app.use(express.json());

app.use(cookieParser());


const PORT  = 3000;
app.listen(PORT, () => {
    console.log('server is running on ' + PORT );
});

app.get('*',(req,res) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
})


app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});


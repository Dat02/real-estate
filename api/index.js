import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from '../api/routes/user.js'
import authRouter from '../api/routes/auth.js'

dotenv.config();

mongoose
    .connect(process.env.MONGODB)
    .then(() => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err);
    })


const app = express();
app.use(express.json());


app.listen(3000, () => {
    console.log('server is running');
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
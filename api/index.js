const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
app.listen(3000, () => {
    console.log('server is running');
});
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './lib/db.js';

const app = express();
const port = 3000;

// app.use('/api/user/');
// app.use('/api/capsule/');

connectDB().then(() => {
    app.listen(port,() => {
        console.log(`app is listening at prt ${port}`);
    })
})
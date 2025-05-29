import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './lib/db.js';
import authUser from './routes/router.user.js'


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/user/',authUser);
// app.use('/api/capsule/');

connectDB().then(() => {
    app.listen(port,() => {
        console.log(`app is listening at prt ${port}`);
    })
})
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// Load environment variables from .env file
dotenv.config();

// Connect Database
import connectDB from '../server/config/db.js'
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

//Run Server on PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("APT is running");
});
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
    res.send("APT is running");
});
/*const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import userServices
const userServices = require('./services/userServices');*/



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userServices from "./src/services/userServices.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Static files
app.use(express.static("public"));

// POST route, used with signUp.html&.js
app.post("/register", async (req, res) => {
    const { username, firstName, lastName, email, password, userRole } = req.body;

    // Validate input
    if (!username || !firstName || !lastName || !email || !password || !userRole) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Call the addUser function from userServices
        await userServices.addUser(username, firstName, lastName, email, password, userRole);
        
        // Respond with success message
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Error during registration", error: err.message });
    }
});

// Set the port from environment or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


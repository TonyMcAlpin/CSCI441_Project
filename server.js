// Import userServices

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import medicationRoutes from "./src/routes/medicationRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import activityRoutes from "./src/routes/activityRoutes.js";
import requestRoutes from "./src/routes/requestRoutes.js";
import './src/cronJobs/appointmentNotifications.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies  

// Static files
app.use(express.static("public"));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Route for homepage (changed to Login.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "LogIn.html"));
  });

app.get("/LogIn.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "LogIn.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "index.html"));
});

app.get("/Activities.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "Activities.html"));
});

app.get("/Appointments.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "Appointments.html"));
});

app.get("/Medications.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "Medications.html"));
});

app.get("/contactus.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "contactus.html"));
});

app.get("/SignUp.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "SignUp.html"));
});

app.get("/ResetPassword.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "ResetPassword.html"));
});

app.get("/providerDashboard.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "providerDashboard.html"));
});
  

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/activities", activityRoutes); 
app.use("/api/requests", requestRoutes);


// Set the port from environment or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

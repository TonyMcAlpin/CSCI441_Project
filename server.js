// Import userServices

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import medicationRoutes from "./src/routes/medicationRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import activityRoutes from "./src/routes/activityRoutes.js";
import requestRoutes from "./src/routes/requestRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Static files
app.use(express.static("public"));

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/activities", activityRoutes); 
app.use("/api/requests", requestRoutes);


// Set the port from environment or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Import userServices

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import medicationRoutes from "./src/routes/medicationRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import activityRoutes from "./src/routes/activityRoutes.js";

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

// POST route for login
/*app.post("/login", async (req, res) => {
    const { username, password } = req.body; // Access username and password from the request body

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Call your authentication service or logic to validate user credentials
        const user = await userServices.validateUserLogin(username, password);

        if (user) {
            // Successful login, send user data
            res.status(200).json({ message: "Login successful", user: user });
        } else {
            // Invalid login credentials
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Error during login", error: err.message });
    }
});*/

// Set the port from environment or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

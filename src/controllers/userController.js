import userServices from "../services/userServices.js";

// POST route, used with signUp.html&.js
const registerUser = async (req, res) => {
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
};

export default{
    registerUser
}
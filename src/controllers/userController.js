import bcrypt from "bcryptjs";
import userServices from "../services/userServices.js";

// POST route, used with signUp.html & .js for registering users
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

// POST route, used for logging in users
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password });

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        
        const user = await userServices.validateUserLogin(username, password);

        if (user) {
            
            res.status(200).json({
                message: "Login successful",
                user: { id: user.id, username: user.username, role: user.role_id }
            });
        } else {
            // Invalid username or password
            res.status(400).json({ message: "Invalid username or password" });
        }

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Reset user password

const resetPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    // Validate input
    if (!username || !newPassword) {
        return res.status(400).json({ message: "Username and new password are required." });
    }

    try {
        // Check if user exists
        const user = await userServices.fetchUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        await userServices.updateUserPassword(username, newPassword);

        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.error("Error during password reset:", error);
        res.status(500).json({ message: "Server error." });
    }
};



// Get All Medications for Specific User

const getMedications = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const medications = await userServices.getMedications(user_id);

        // Return list of medications. May be an empty list
        return res.status(200).json(medications);
    }
    catch(err){
        console.error("Error when Fetching Medications: ",err);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

// Get All Appointments for a Specific User

const getAppointments = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const appointments = await userServices.getAppointments(user_id);

        return res.status(200).json(appointments);
    }
    catch(err){
        console.error("Error when Fetching Appoinments: ", err);
        return res.status(500).json({message: "Internal Server Error"})
    }
};

// Get All Activities for a Specific User

const getActivities = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const acitivties = await userServices.getActivities(user_id);

        return res.status(200).json(acitivties);
    }
    catch(err){
        console.error("Error When Fetching Activities: ", err);
        return res.status(500).json({message: "Internal Server Error"})
    }
};

// Get ALL users with role "1"
const getPatients = async (req, res) => {
    try {
        const patients = await userServices.getPatients();

        return res.status(200).json(patients);
    }catch(err){
        console.error("Error when Fetching Patients: ", err);
        console.error("Full error stack:", err.stack);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.toString()
            });
        
    }
}

// Get All Requests for a user
const getRequests = async (req, res) =>{

    try{
        const user_id = req.params.user_id;
        const requests = await userServices.getRequests(user_id);
        return res.status(200).json(requests);
    }
    catch(err){
        console.error("Error When Retrieving Requests: ", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

// Get Specific User
const getUser = async (req, res) => {

    try{
        const id = req.params.id;
        const [user] = await userServices.fetchUser(id);
        //console.log(user);
        return res.status(200).json(user);
    }
    catch(err){
        console.error("Error When Retrieving User: ", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Get request for user goal
const getActivityGoal = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const results = await userServices.getActivityGoal(user_id);
        const goalResult = results[0];

        if (!goalResult || goalResult.activity_goal === undefined || goalResult.activity_goal === null) {
            
            return res.status(200).json({ goal: 0 });
        }

        res.status(200).json({ goal: goalResult.activity_goal });
    } catch (err) {
        console.error("Error fetching goal: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Update and Set Goal

const setActivityGoal = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { goal } = req.body;

        if (!goal) {
            return res.status(400).json({ message: "Goal is required" });
        }

        await userServices.setActivityGoal(user_id, goal);
        res.status(200).json({ message: "Goal updated successfully" });
    } catch (err) {
        console.error("Error updating goal: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export default {
    registerUser,
    loginUser,
    getMedications,
    getAppointments,
    getActivities,
    getPatients,
    resetPassword,
    getRequests,
    getUser,
    getActivityGoal,
    setActivityGoal


};

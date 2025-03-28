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
        console.error("Error when Fetching Activities: ", err);
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default {
    registerUser,
    loginUser,
    getMedications,
    getAppointments,
    getActivities  
};

import db from "../connections/db.js";
import bcrypt from "bcryptjs"

// GET: Fetch all Users
async function fetchUsers(){
    try{
        const [users] = await db.query("SELECT * FROM users");

        return users;
    }catch(err){
        console.error("Error fetching accounts: ", err);
        throw err;
    }
}

// GET{id}: Fetch a Specific User
async function fetchUser(id){

        const [user] = await db.query(
            `SELECT * FROM users
            WHERE (id = ?)`,
            [id]
        );
        return user;

}

// POST: Add a New User
async function addUser(userName, firstName, lastName, email, password, role){
    try{
        // Hash the password for secure storage in the database
        const hashedPass = await bcrypt.hash(password,10);

        await db.query(
            `INSERT INTO users(username, first_name ,last_name, email, password, role_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [userName, firstName, lastName, email, hashedPass, role]
        );
        console.log("User Add Successfully!\n");
    }catch(err){
        console.error("Error When Attempting To Add User: ", err);
        throw err;
    }
}

// PUT: Update User
async function updateUser(id, userName, firstName, lastName, email, password, role){
    try{
        // Creates a new hash for the password 
        const hashedPass = await bcrypt.hash(password,10);

        await db.query(
            `UPDATE users 
            SET username = ?, first_name = ?, last_name = ?, email = ?, password = ?, role_id = ?
            WHERE (id = ?)`,
            [userName, firstName, lastName, email, hashedPass, role, id]
        );
        console.log("User Updated Successfully!");
    }catch(err){
        console.error("Error When Attempting To Update User: ",err);
        throw err;
    }
}


// DELETE: Delete a Specific User and All Related Data
async function deleteUser(id){
    try{
        await db.query(
            `DELETE FROM users 
            WHERE (id = ?)`,
            [id]
        );
        console.log("User Deleted Successfully!\n");
    }catch(err){
        console.error("Error When Attempting To Delete User: ", err);
        throw err;
    }
}

// Get All Medications for a Specific User

async function getMedications(user_id){

    const [medications] = await db.query( 
        `SELECT * FROM medications
        WHERE (user_id = ?)`,
        [user_id]
    );
    return medications;
}

// Get All Appointments for a Specific User

async function getAppointments(user_id){
   
        const [appointments] = await db.query(
            `SELECT * FROM appointments
            WHERE (user_id = ?)`,
            [user_id]
        );
        return appointments;
}

// Get All Activities for a Specific User

async function getActivities(id){

        const [activities] = await db.query(
            `SELECT * FROM activities
             WHERE (user_id = ?)`,
             [id]
        );

        return activities;
}


// Login Validation
async function validateUserLogin(username, password) {
    try {
        // Fetch user by username
        const [user] = await db.query(
            `SELECT * FROM users WHERE username = ?`, 
            [username]
        );

        // If no user found, return null
        if (!user || user.length === 0) {
            return null;
        }


        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (passwordMatch) {
            // Return the user data if login is successful
            return user[0];  // You can choose what data to return (id, username, role, etc.)
        } else {
            // Return null if password does not match
            return null;
        }

    } catch (err) {
        console.error("Error during login validation: ", err);
        throw err;
    }
}

// Get all users with role "1"
async function getPatients() {
    try{
        const [patients] = await db.query(
            `SELECT * FROM users
            WHERE role_id = 1 ORDER BY last_name`
        );

        return patients;
    }catch (err){
        console.error("Error fetching patients: ", err);
        console.error("Full error stack:", err.stack);
        throw err;
    }
}


//Get user by username
async function fetchUserByUsername(username) {
    try {
        const [user] = await db.query(
            `SELECT * FROM users WHERE username = ?`, 
            [username]
        );

        // Return the user if found, otherwise return null
        return user.length > 0 ? user[0] : null;
    } catch (err) {
        console.error("Error fetching user by username: ", err);
        throw err;
    }
}

//Update user password
async function updateUserPassword(username, newPassword) {
    try {
        // Hash the new password before updating it
        const hashedPass = await bcrypt.hash(newPassword, 10);

        // Update the user password
        await db.query(
            `UPDATE users SET password = ? WHERE username = ?`,
            [hashedPass, username]
        );
        console.log("Password updated successfully!");
    } catch (err) {
        console.error("Error updating password: ", err);
        throw err;
    }
}

async function getRequests(user_id){
    
    const [requests] = await db.query(
        `SELECT * 
         FROM requests
         WHERE (patient_id = ? OR provider_id = ?)`,
         [user_id,user_id]
    );
    return requests;
    
}



export default {
    fetchUsers,
    fetchUser,
    addUser,
    updateUser,
    deleteUser,
    getMedications,
    getAppointments,
    getActivities,
    getRequests,
    validateUserLogin,
    getPatients,
    fetchUserByUsername,
    updateUserPassword
};


//////TESTING//////

//console.log("FetchUsers(): \n");
//await fetchUsers();

//console.log("updateUser(): ");
//await updateUser(6, "updated_user", "Updated Tony6","Soprano6","updatedtest6@gmail.com", "123",2)

//console.log("addUser(): \n");
//await addUser("test_user_7", "Tony7","Soprano7","test7@gmail.com", "123456",1);

//console.log("deleteUser(): \n");
//await deleteUser(5);

//console.log("FetchUsers(): \n");
//await fetchUsers();

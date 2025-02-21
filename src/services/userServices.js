import db from "../connections/db.js";
import bcrypt from "bcrypt"

// GET: Fetch all Users
async function fetchUsers(){
    try{
        const [users] = await db.query("SELECT * FROM users");
        console.log("Users: ", users);
        return users;
    }catch(err){
        console.error("Error fetching accounts: ", err);
        throw err;
    }
}

// GET{id}: Fetch a Specific User
async function fetchUser(id){
    try{
        const [user] = await db.query(
            `SELECT * FROM users
            WHERE (id = ?)`,
            [id]
        );
        console.log("User: ", user);
        return user;
    }catch(err){
        console.error("Error fetching accounts: ", err);
        throw err;
    }
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


// DELTE: Delete a Specific User and All Related Data
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

export default {
    fetchUsers,
    fetchUser,
    addUser,
    updateUser,
    deleteUser
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

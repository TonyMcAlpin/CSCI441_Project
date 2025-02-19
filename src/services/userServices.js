import db from "../connections/db.js";

// Fetch all Users
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

// Fetch a specific User
async function fetchUser(id){
    try{
        const [user] = await db.query(
            `SELECT * FROM users
            WHERE (id = ${id})`
        );
        console.log("User: ", user);
        return user;
    }catch(err){
        console.error("Error fetching accounts: ", err);
        throw err;
    }
}

console.log("FetchUsers(): \n");
await fetchUsers();
console.log("FetchUser(): \n");
await fetchUser(1);
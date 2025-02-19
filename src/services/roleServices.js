import db from "../connections/db.js";

// Fetch All Roles
async function fetchRoles() {
    try{
        const [roles] = await db.query("SELECT * FROM roles");
        console.log("Roles: ", roles);
        return roles;
    }catch(err){
        console.error("Error fetching roles: ", err);
        throw err;
    }
}

await fetchRoles();
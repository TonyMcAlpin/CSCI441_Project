import db from "../connections/db.js";

// Fetching all Activities for a Specific User
async function fetchActivities(id){
    try{
        const [activities] = await db.query(
            `SELECT * FROM activities
            WHERE (user_id = ${id})`
        );
        console.log("Activities: ", activities);
        return activities;
    }catch(err){
        console.error("Error fetching activities: ",err);
        throw err;
    }
}

await fetchActivities(1);



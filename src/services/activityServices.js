import db from "../connections/db.js";

// Fetching all Activities for a Specific User
async function getActivities(id){
    try{
        const [activities] = await db.query(
            `SELECT * FROM activities
             WHERE (user_id = ?)`,
             [id]
        );
        //console.log("Activities: ", activities);
        return activities;
    }catch(err){
        console.error("Error When Fetching Activities: ",err);
        throw err;
    }
}

// GET: Fetch a single Activity by its id
async function getActivity(id){
    try{
        const [activity] = await db.query(
            `SELECT * FROM activities
             WHERE (id = ?)`,
             [id] 
        );
        //console.log("Activity: ", activity);
        return activity;
    }
    catch(err){
        console.error("Error When Fetching Activity: ", err);
        throw err;
    }
}

// POST: Add a New Activity
async function addActivity(act_date, duration, comments, user_id){
    try{
        const [result] = await db.query(
            `INSERT INTO activities( act_date, duration, comments, user_id)
             VALUES(?,?,?,?)`,
             [act_date, duration, comments, user_id]
        );
        //console.log("Activiy Added Successfully!");
        return result; //Return result to be used by controller
    }
    catch(err){
        console.error("Error When Adding Activity: ", err);
        throw err;
    }
}

// PUT: Update exisiting Activity by id

async function updateActivity(act_date, duration, comments, id){
    try{    
        const [result] = await db.query(
            `UPDATE activities
             SET act_date = ?, duration = ?, comments = ?
             WHERE (id = ?)`,
             [act_date, duration, comments, id]
        );
        //console.log("Activity Updated Successfully!");
        return result; //Return result to be used by controller
    }
    catch(err){
        console.error("Error When Updating Activity: ", err);
        throw err;
    }
}

// DELETE: Delete an Activity by id

async function deleteActivity(id){
    try{
        const [result] = await db.query(
            `DELETE FROM activities
             WHERE (id = ?)`,
             [id]
        );
        //console.log("Activity Deleted Successfully!");
        return result; //Return result to be used by controller
    }
    catch(err){
        console.error("Error when Deleting Activity: ", err);
        throw err;
    }
}


export default{
    getActivities,
    getActivity,
    addActivity,
    updateActivity,
    deleteActivity
}


//////TESTING//////

// await getActivities(13);

// await addActivity('2025-02-06', 60, "Lifted at the Gym", 13);

// await updateActivity('2025-02-28', 60, "Went on a 6 mile run", 3);

// await deleteActivity(4);

// await getActivities(13);



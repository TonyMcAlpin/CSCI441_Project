import db from "../connections/db.js";

// GET: Fetch a single Activity by its id
async function getActivity(id){

        const [activity] = await db.query(
            `SELECT * FROM activities
             WHERE (id = ?)`,
             [id] 
        );
 
        return activity;

}

// POST: Add a New Activity
async function addActivity(act_date, duration, comments, user_id){

        const [result] = await db.query(
            `INSERT INTO activities( act_date, duration, comments, user_id)
             VALUES(?,?,?,?)`,
             [act_date, duration, comments, user_id]
        );
        
        return result; //Return result to be used by controller

}

// PUT: Update exisiting Activity by id

async function updateActivity(act_date, duration, comments, id){
 
        const [result] = await db.query(
            `UPDATE activities
             SET act_date = ?, duration = ?, comments = ?
             WHERE (id = ?)`,
             [act_date, duration, comments, id]
        );

        return result; //Return result to be used by controller

}

// DELETE: Delete an Activity by id

async function deleteActivity(id){

        const [result] = await db.query(
            `DELETE FROM activities
             WHERE (id = ?)`,
             [id]
        );
        
        return result; //Return result to be used by controller

}


export default{
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



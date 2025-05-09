/* written by: Austin Hoelscher, Anthony McAlpin 
tested by: Austin Hoelscher, Anthony McAlpin
debugged by: Austin Hoelscher, Anthony McAlpin  */



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

//Get average activity per day from selected time 

async function getAverageActivity(user_id, start_date, end_date) {
        const [result] = await db.query(
            `SELECT AVG(duration) AS average_duration
             FROM activities
             WHERE user_id = ? AND act_date BETWEEN ? AND ?`,
            [user_id, start_date, end_date]
        );

        // Return the result with average duration
        return result; 
    }

// Get total activity duration for current week (Used for Goal Functions) 
async function getWeeklyTotalActivity(user_id, week_start, week_end) {
    const [result] = await db.query(
        `SELECT SUM(duration) AS total_duration
         FROM activities
         WHERE user_id = ? AND act_date BETWEEN ? AND ?`,
        [user_id, week_start, week_end]
    );
    return result;
}


export default{
    getActivity,
    addActivity,
    updateActivity,
    deleteActivity,
    getAverageActivity,
    getWeeklyTotalActivity
}


//////TESTING//////

// await getActivities(13);

// await addActivity('2025-02-06', 60, "Lifted at the Gym", 13);

// await updateActivity('2025-02-28', 60, "Went on a 6 mile run", 3);

// await deleteActivity(4);

// await getActivities(13);



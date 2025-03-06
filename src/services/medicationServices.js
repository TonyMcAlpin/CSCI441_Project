import db from "../connections/db.js";

// GET: Fetching all Medications for a Specific User
async function getMedications(user_id){
    try{
        const [medications] = await db.query( 
            `SELECT * FROM medications
            WHERE (user_id = ?)`,
            [user_id]
        );
        console.log("Medications: ", medications);
        return medications;
    }catch(err){
        console.error("Error when fetching Medications: ",err);
        throw err;
    }
}

// GET: Fetch a single Medication by its id
async function getMedication(id){
    try{
        const [medication] = await db.query(
            `SELECT * FROM medications
             WHERE (id = ?)`,
             [id]
        );
        //console.log("Medication: ", medication);
        return medication;
    }
    catch(err){
        console.error("Error when fetching Medication: ",err)
    }
}

// POST: Add a New Medication
async function addMedication(start_date, end_date, med_name, quantity, units, frequency, comments, user_id){
    try{
        const [result] = await db.query(
            `INSERT INTO medications(start_date, end_date, med_name, quantity, units, frequency, comments, user_id)
             VALUES (?,?,?,?,?,?,?,?)`,
            [start_date, end_date, med_name, quantity, units, frequency, comments, user_id]
        );
        //console.log("Medication Added Successfully!");
        return result; //Return result to be used by controller
    }
    catch(err){
        console.error("Error When Attempting to Add Medication: ",err);
        throw err;
    }
}

// PUT: Update exisiting Medication by id
async function updateMedication(start_date, end_date, med_name, quantity, units, frequency, comments, id){
    try{
        const [result] = await db.query(
            `UPDATE medications
             SET start_date = ?, end_date = ?, med_name = ?, quantity = ?, units = ?, frequency = ?, comments = ?
             WHERE (id = ?)`,
             [start_date, end_date, med_name, quantity, units, frequency, comments, id]
        );
        //console.log("Medication Updated Successfully!")
        return result; //Return result to be used by controller
    }
    catch(err){
        console.error("Error When Attempting to Update Medication: ",err);
        throw err;
    }
}

// DELETE: Delete an Medication by id
async function deleteMedication(id){
    try{
        const [result] = await db.query(
            `DELETE FROM medications
            WHERE (id = ?)`,
            [id]
        );
        //console.log("Medication Deleted Successfully!");
        return result; //Return result to be used by controller
    }
    catch(err){
        console.error("Error When Attempting to Delete Medication: ",err);
        throw err;
    }
}

export default{
    getMedications,
    getMedication,
    addMedication,
    updateMedication,
    deleteMedication
}

//////TESTING//////
// await getMedication(5);

// await getMedications(13);

// await addMedication('2025-03-05', null, 'Tylenol', '1 Pills', '25 mg each', 'twice a day', 'Has been helping to reduce headaches', 8);

// await updateMedication('2025-03-05', null, 'Asprin', '1 Pill', '50 mg', 'Once a day', 'Has been helping to reduce headaches', 3)

// await deleteMedication(3);

// await getMedications(13);
import db from "../connections/db.js";

// GET: Fetch a single Medication by its id
async function getMedication(id){

        const [medication] = await db.query(
            `SELECT * FROM medications
             WHERE (id = ?)`,
             [id]
        );

        return medication; //Return medication to be used by controller
}

// POST: Add a New Medication
async function addMedication(start_date, end_date, prescriber, med_name, quantity, units, frequency, comments, user_id){

        const [result] = await db.query(
            `INSERT INTO medications(start_date, end_date, prescriber, med_name, quantity, units, frequency, comments, user_id)
             VALUES (?,?,?,?,?,?,?,?,?)`,
            [start_date, end_date, prescriber, med_name, quantity, units, frequency, comments, user_id]
        );

        return result; //Return result to be used by controller
    
}

// PATCH: Update exisiting Medication by id
async function updateMedication(start_date, end_date, prescriber, med_name, quantity, units, frequency, comments, id){

        const [result] = await db.query(
            `UPDATE medications
             SET start_date = ?, end_date = ?, prescriber = ?, med_name = ?, quantity = ?, units = ?, frequency = ?, comments = ?
             WHERE (id = ?)`,
             [start_date, end_date, prescriber, med_name, quantity, units, frequency, comments, id]
        );

        return result; //Return result to be used by controller
}

// DELETE: Delete an Medication by id
async function deleteMedication(id){

        const [result] = await db.query(
            `DELETE FROM medications
            WHERE (id = ?)`,
            [id]
        );

        return result; //Return result to be used by controller

}

export default{
    getMedication,
    addMedication,
    updateMedication,
    deleteMedication
}

//////TESTING//////
// await getMedication(5);

//await getMedications(13);

// await addMedication('2025-03-05', null, 'Tylenol', '1 Pills', '25 mg each', 'twice a day', 'Has been helping to reduce headaches', 8);

// await updateMedication('2025-03-05', null, 'Asprin', '1 Pill', '50 mg', 'Once a day', 'Has been helping to reduce headaches', 3)

// await deleteMedication(3);

// await getMedications(13);
import db from "../connections/db.js";

// GET: Fetch a single appointment by its id
async function getAppointment(id){

        const [appointment] = await db.query(
            `SELECT * FROM appointments
             WHERE (id = ?)`,
             [id]
        );

        return appointment;

}

// POST: Add a New Appointment

async function addAppointment(app_date, medical_title, provider_name, purpose, phone_number, provider_email, user_id){

        const [result] = await db.query(
            `INSERT INTO appointments(app_date, medical_title, provider_name, purpose, phone_number, provider_email, user_id)
            VALUES(?,?,?,?,?,?,?)`,
            [app_date, medical_title, provider_name, purpose, phone_number, provider_email, user_id]
        );
        
        return result; //Return result to be used by controller

}

// PUT: Update exisiting appointment by id
async function updateAppointment(app_date, medical_title, provider_name, purpose, phone_number, provider_email, id){

        const [result] = await db.query(
            `UPDATE appointments
             SET app_date = ?, medical_title = ?, provider_name = ?, purpose = ?, phone_number = ?, provider_email = ?
             WHERE (id = ?)`,
             [app_date, medical_title, provider_name, purpose, phone_number, provider_email, id]
        );
        
        return result; //Return result to be used by controller

}

// DELETE: Delete an appointment by id

async function deleteAppointment(id){

        const [result] = await db.query(
            `DELETE FROM appointments
            WHERE (id = ?)`,
            [id]
        );

        return result; //Return result to be used by controller

}

export default {
    getAppointment,
    addAppointment,
    updateAppointment,
    deleteAppointment
}

//////TESTING//////

// await getAppointment(5);

// await getAppointments(13);

// await addAppointment('2025-03-01', 'Primary Physician', 'Dr. Johnson', 'I had a Sore Throat', '555-555-5555', 'drj@gmail.com', 13);

// await updateAppointment('2025-03-04', 'Ear Nose and Throat Specialist', 'Dr. Johnson', 'Strep Throat', '555-555-5555', 'drj@gmail.com', 5);

// await deleteAppointment(4);

// await getAppointments(13);

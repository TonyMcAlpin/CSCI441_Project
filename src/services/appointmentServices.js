import db from "../connections/db.js";

// GET: Fetching all Appointments for a Specific User
async function getAppointments(user_id){
    try{    
        const [appointments] = await db.query(
            `SELECT * FROM appointments
            WHERE (user_id = ?)`,
            [user_id]
        );
        console.log("Appointments: ", appointments);
        return appointments;
    }catch(err){
        console.error("Error fetching appointments: ", err);
        throw err;
    }
}

// GET: Fetch a single appointment by its id
async function getAppointment(id){
    try{
        const [appointment] = await db.query(
            `SELECT * FROM appointments
             WHERE (id = ?)`,
             [id]
        );
        //console.log("Appointment: ", appointment);
        return appointment;
    }
    catch(err){
        console.err("Error when fetching Appointment: ", err);
        throw err;
    }
}

// POST: Add a New Appointment

async function addAppointment(app_date, medical_title, provider_name, purpose, phone_number, provider_email, user_id){
    try{
        const [result] = await db.query(
            `INSERT INTO appointments(app_date, medical_title, provider_name, purpose, phone_number, provider_email, user_id)
            VALUES(?,?,?,?,?,?,?)`,
            [app_date, medical_title, provider_name, purpose, phone_number, provider_email, user_id]
        )
        //console.log("Appointment Added Successfully!");
        return result; //Return result to be used by controller
    }
    catch(err){
        console.error("Error When Adding Appointment: ", err);
        throw err;
    }
}

// PUT: Update exisiting appointment by id
async function updateAppointment(app_date, medical_title, provider_name, purpose, phone_number, provider_email, id){
    try{
        const [result] = await db.query(
            `UPDATE appointments
             SET app_date = ?, medical_title = ?, provider_name = ?, purpose = ?, phone_number = ?, provider_email = ?
             WHERE (id = ?)`,
             [app_date, medical_title, provider_name, purpose, phone_number, provider_email, id]
        )
        //console.log("Appointment Updated Successfully!");
        return result; //Return result to be used by controller
    }
    catch(err){
        console.error("Error when Updating Appointment: ", err);
        throw err;
    }
}

// DELETE: Delete an appointment by id

async function deleteAppointment(id){
    try{
        const [result] = await db.query(
            `DELETE FROM appointments
            WHERE (id = ?)`,
            [id]
        )
        //console.log("Appointment Deleted Successfully!");
        return result; //Return result to be used by controller
    }
    catch(err){
        console.error("Error when Attempting to Delete Appointment: ", err);
        throw err;
    }
}

export default {
    getAppointments,
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

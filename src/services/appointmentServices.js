import db from "../connections/db.js";

// Fetching all Appointments for a Specific User
async function fetchAppointments(id){
    try{    
        const [appointments] = await db.query(
            `SELECT * FROM appointments
            WHERE (user_id = ${id})`
        );
        console.log("Appointments: ", appointments);
        return appointments;
    }catch(err){
        console.error("Error fetching appointments: ", err);
        throw err;
    }
}

// POST: Add a New Appointment



//////TESTING//////

await fetchAppointments(1);
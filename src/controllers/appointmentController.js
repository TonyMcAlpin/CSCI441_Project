import appointmentServices from "../services/appointmentServices.js";

const getAppointment = async (req, res) => {

    // Grab appointment id from url
    const appointment_id = req.params.id;

    try{

        const appointment = await appointmentServices.getAppointment(appointment_id);

        // Check if appointment was found
        if(appointment.length === 0){
            return res.status(404).json({message: "Appointment Not Found."});
        }
        return res.status(200).json(appointment);
    }
    catch(err){
        console.error("Error While Fetching Appointment: ", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

const addAppointment = async (req, res) => {

    // Grab user ID from url
    const user_id = req.params.user_id;

    // name of required fields
    const requiredFields = ["app_date", "purpose", "app_time"];

    // Check if all reqiured fields are filled
    if(!requiredFields.every(field => req.body[field])){
        return res.status(400).json({message: "Missing Required Fields."});
    }

    try{

        const { app_date, medical_title, provider_name, purpose, phone_number, provider_email, app_time } = req.body;
        await appointmentServices.addAppointment(app_date, medical_title, provider_name, purpose, phone_number, provider_email, user_id, app_time);

        return res.status(201).json({message: "Appointment Created Successfully!"});
    }
    catch(err){
        console.error("Error When Adding Appointment: ", err);
        return res.status(500).json({message: "Internal Server Error."});
    }
};

const updateAppointment = async (req, res) => {

    // Grab appointment ID from url
    const appointment_id = req.params.id;

    // Array for checking all required fields
    const requiredFields = ["app_date", "purpose"];

    //check if all required fields are filled
    if(!requiredFields.every(field => req.body[field])){
        return res.status(400).json({message: "Missing Required Fields."});
    }

    try{
        
        const updatedApp = await appointmentServices.updateAppointment(...Object.values(req.body), appointment_id);

        // Check if any appointments were updated
        if(updatedApp.affectedRows === 0){
            return res.status(404).json({message: "Appointment Not Found."});
        }

        return res.status(200).json({message: "Appointment Updated Successfully!"});

    }
    catch(err){
        console.log("Error When Updating Appointment: ", err);
        return res.status(500).json({message: "Internal Server Error."});
    }
};

const deleteAppointment = async (req, res) => {
    // Get appointment ID from url
    const appointment_id = req.params.id;

    try{
        const delAppointment = await appointmentServices.deleteAppointment(appointment_id);

        // If no appointment with the matching id is found
        if(delAppointment.affectedRows === 0){
            return res.status(404).json({message: "Appointment Not Found."});
        }

        return res.status(200).json({message: "Appointment Deleted Successfully!"});
    }
    catch(err){
        console.error("Error When Deleting Appointment: ", err);
        return res.status(500).json({message: "Internal Server Error."});
    }

};

export default{
    getAppointment,
    addAppointment,
    updateAppointment,
    deleteAppointment
}
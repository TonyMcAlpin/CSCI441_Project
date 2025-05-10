// written by: Austin Hoelscher
// tested by: Austin Hoelscher & Iris Perry
// debugged by: Austin Hoelscher & Iris Perry

import medicationServices from "../services/medicationServices.js";

//GET: Get a specific medication entry
const getMedication = async (req, res) => {
    
    // Grab medication id from url
    const medication_id = req.params.id;

    try{
        const medication = await medicationServices.getMedication(medication_id);

        // If Medication is not found
        if(medication.length === 0){
            return res.status(404).json({message: "Medication Not Found"});
        }

        return res.status(200).json(medication);
    }
    catch(err){
        console.error("Error when fetching Medications: ",err);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

//POST: Add a new medication entry
const addMedication = async (req, res) => {

    // Grab user id from url
    const user_id = req.params.user_id;

    console.log("Received user_id from params:", req.params.user_id);
    console.log("Received request body:", req.body);


    // Array With the name of the required fields
    const requiredFields = ["start_date", "med_name", "quantity", "units", "frequency", "comments"];

    // Check that the properties in in req.body, with the corresponding names in requiredFields, have values
    if(!requiredFields.every(field => req.body[field])){
        return res.status(400).json({message: "Missing Required Fields"});
    }

    try{
        await medicationServices.addMedication(...Object.values(req.body),user_id);
        return res.status(201).json({message: "Medication Added Successfully!"});
    }
    catch(err){
        console.error("Error When Attempting to Add Medication: ",err);
        return res.status(500).json({message: "Internal Server Error"});

    }
};

// PUT: Update A Medication Entry
const updateMedication = async (req, res) => {

    // Grab medication id from url
    const medication_id = req.params.id;

    // Array With the name of the required fields
    const requiredFields = ["start_date", "med_name", "prescriber", "quantity", "units", "frequency", "comments"];

    // Check that the properties in in req.body, with the corresponding names in requiredFields, have values
    if(!requiredFields.every(field => req.body[field])){
        return res.status(400).json({message: "Missing Required Fields."});
    }

    try{
        let {start_date, end_date, med_name, prescriber, quantity, units, frequency, comments} = req.body;

        end_date = end_date === "" ? null : end_date;

        const medication = await medicationServices.updateMedication(start_date, end_date, med_name, prescriber, quantity, units, frequency, comments, medication_id);

        //const medication = await medicationServices.updateMedication(...Object.values(req.body), medication_id);

        // If the medication id is not found
        if(medication.affectedRows == 0){
            return res.status(404).json({message: "Medication was not Found."});
        }

        return res.status(200).json({message: "Medication Updated Successfully!"});
    }
    catch(err){
        console.error("Error When Attempting to Update Medication: ",err);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

const deleteMedication = async (req, res) => {

    // Grab medication id from url
    const medication_id = req.params.id;

    try{
        const delMedication = await medicationServices.deleteMedication(medication_id);
        if(delMedication.affectedRows === 0){
            return res.status(404).json({message: "Medication was not Found."});
        }
        return res.status(200).json({message: "Medication Deleted Successfully!"});
    }
    catch(err){
        console.error("Error When Attempting to Delete Medication: ",err);
        return res.status(500).json({message: "Internal Server Error"});
    }
};


export default{
    getMedication,
    addMedication,
    updateMedication,
    deleteMedication
}
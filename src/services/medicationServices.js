import db from "../connections/db.js";

// Fetching all Medications for a Specific User
async function fetchMedications(id){
    try{
        const [medications] = await db.query(
            `SELECT * FROM medications
            WHERE (user_id = ?)`,
            [id]
        );
        console.log("Medications: ", medications);
        return medications;
    }catch(err){
        console.error("Error when fetching Medications: ",err);
        throw err;
    }
}



//////TESTING//////

await fetchMedications(1);
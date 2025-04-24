import db from "../connections/db.js"


const getRequest = async (id) => {

    const [request] = await db.query(
        `SELECT * 
         FROM requests
         WHERE (id = ?)`,
         [id]
    );
    return request;
}

const makeRequest = async (patient_id, provider_id) => {
    const [result] = await db.query(
      `INSERT INTO requests(patient_id,provider_id)
       VALUES(?,?)`,
       [patient_id, provider_id]  
    );  

    return result;
}

const updateRequest = async (accepted, closed, id) => {
    
    const [result] = await db.query(
        `UPDATE requests
         SET accepted = ? , closed = ?
         WHERE (id = ?)`,
        [accepted, closed, id]
    );
    return result;
}





export default{
    getRequest,
    makeRequest,
    updateRequest
}
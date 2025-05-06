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

const updateRequest = async (accept_date, close_date, id) => {
    
    const [result] = await db.query(
        `UPDATE requests
         SET accept_date = ?, close_date = ?
         WHERE id = ?`,
        [accept_date, close_date, id]
    );
    return result;
}

const cancelRequest = async (id) => {
    const [result] = await db.query(
        `UPDATE requests
         SET cancel_date = NOW()
         WHERE id = ?`,
        [id]
    );
    return result;
};

const closeRequest = async (id) => {
    const [result] = await db.query(
        `UPDATE requests
         SET close_date = NOW()
         WHERE id = ?`,
        [id]
    );
    return result;
};



export default{
    getRequest,
    makeRequest,
    updateRequest,
    cancelRequest,
    closeRequest
}
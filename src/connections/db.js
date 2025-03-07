import mysql from "mysql2/promise.js";
import config from "./config.js";


//This is our database object that will be required for all services or
// functions that need to interact with the database.

const pool = mysql.createPool({
    ...config.connectionString
});




// Function for testing the database connection.

async function testConnection() {
    try {
        const connection = await pool.getConnection(); 
        console.log("MySQL Database Connected Successfully!");
        connection.release();
    } catch (err) {
        console.error(" Database Connection Failed!", err);
    }
}

// If for whatever reason there is an issue for connecting to the database
// It will be logged to the console by calling the testConnection() function.

//testConnection();

export default pool;
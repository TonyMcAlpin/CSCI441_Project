import dotenv from "dotenv";
dotenv.config();

// Config for connection string from .env file.
// The Raw values are there for ease of use.
const config = {
    connectionString:{
        host: process.env.DB_HOST || "pher-db.czamsuygcpg4.us-east-2.rds.amazonaws.com",
        user: process.env.DB_USER || "admin",
        password: process.env.DB_PASSWORD || "T1ger11!!3046909",
        database: process.env.DB_NAME || "pherDb",
    }
};

export default config;
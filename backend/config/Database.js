const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const dbConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Aiven requires SSL with their CA certificate
    ssl: process.env.DB_SSL === "true" ? { 
        ca: fs.readFileSync(path.join(__dirname, '..', 'ca.pem')),
        rejectUnauthorized: true 
    } : undefined,
});

module.exports = dbConnection;

const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

let sslConfig = undefined;
if (process.env.DB_SSL === "true") {
    const caPath = path.join(__dirname, "..", "ca.pem");
    if (fs.existsSync(caPath)) {
        sslConfig = {
            ca: fs.readFileSync(caPath),
            rejectUnauthorized: true,
        };
    } else {
        sslConfig = {
            rejectUnauthorized: false,
        };
    }
}

const dbConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: sslConfig,
});

module.exports = dbConnection;

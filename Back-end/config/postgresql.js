// Back-end\config\postgresql.js
const postgres = require("postgres");
require("dotenv").config();

const sql = postgres(process.env.DATABASE_URL, {
    ssl: 'require',  // Enforce SSL for secure connection
    idle_timeout: 10, // Disconnect inactive clients
    max: 10          // Limits max concurrent connections
});

module.exports = sql;  // Use CommonJS export

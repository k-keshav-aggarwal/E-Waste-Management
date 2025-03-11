const pkg = require("pg") 
const { Pool } = pkg

//change the object to match the server details
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password",
    database: "rebootearth"
})

module.exports =  { pool }
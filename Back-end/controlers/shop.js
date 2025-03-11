import { pool } from "../db/connection.js"

const getItems = async(req,res) => {
    const result = await pool.query("SELECT * from shop;")
    if(!result) return res.status(500).json({message: "cannot fetch items from shop"})
    res.status(200).json(result.rows)
}

export {getItems}
const { pool } = require("../db/connection.js");

const getCenters = async (req, res) => {
    const result = await pool.query("SELECT * from collection_centers;");
    if (!result) return res.status(500).json({ message: "could not fetch collection centers list" });
    res.status(200).json(result.rows);
};

const createCenter = async (req, res) => {
    let { name, phone, city, admin_id } = req.body;
    admin_id = Number(admin_id);
    if (admin_id === 0) admin_id = null;
    const result = await pool.query(
        "INSERT INTO collection_centers (name, phone, city, admin_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, phone, city, admin_id]
    );
    if (!result) return res.status(500).json({ message: "error creating collection center" });
    res.status(201).json({ message: "successfully created collection center", center: result.rows[0] });
};

const deleteCenter = async (req, res) => {
    const id = req.params.id;
    const result = await pool.query("DELETE from collection_centers where center_id = $1", [id]);
    if (!result) return res.status(500).json({ message: "error deleting collection center" });
    res.status(200).json({ message: "successfully deleted collection center" });
};

module.exports = {
    getCenters,
    createCenter,
    deleteCenter
};

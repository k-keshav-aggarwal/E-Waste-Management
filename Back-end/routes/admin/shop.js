const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Get unconfigured shop items
router.get("/", async (req, res) => {

    /* Raw SQL:
    SELECT *
    FROM shop
    WHERE price = 0
    AND detail = 'N/A';
    */

    try {
        const { data, error } = await supabase
            .from("shop")
            .select("*")
            .eq('price', 0)
            .eq('detail', 'N/A');

        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching shop items:", err);
        res.status(500).json({ error: "Error fetching shop items" });
    }
});

// Update shop item
router.put("/update", async (req, res) => {

    /* Raw SQL:
    UPDATE shop
    SET price = $1, detail = $2
    WHERE part_id = $3;
    */

    try {
        const { part_id, price, detail } = req.body;

        // Validate required fields
        if (!part_id || price === undefined || detail === undefined) {
            return res.status(400).json({ error: "Missing required fields: part_id, price, or detail" });
        }

        const { data, error } = await supabase
            .from("shop")
            .update({ price: price, detail: detail })
            .eq("part_id", part_id);

        if (error) {
            console.error("Error updating shop record:", error);
            return res.status(500).json({ error: "Error updating shop record" });
        }

        console.log("Updated shop record:", data);
        res.json(data);
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Unexpected error occurred" });
    }
});

module.exports = router;
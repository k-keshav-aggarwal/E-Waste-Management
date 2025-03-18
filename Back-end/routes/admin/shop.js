const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase.from("e_waste_items").select("*");
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching e-waste items:", err);
        res.status(500).json({ error: "Error fetching e-waste items" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { part_name, price, item_id, center_id } = req.body;
        
        if (!part_name || price === undefined || !item_id || !center_id) {
            return res.status(400).json({ error: "Missing required fields or invalid price" });
        }
        
        const { data, error } = await supabase.from("shop").insert([
            { part_name, price: parseFloat(price), item_id, center_id }
        ]);
        
        if (error) throw error;
        res.status(201).json({ message: "Item added to shop successfully", data });
    } catch (err) {
        console.error("Error adding item to shop:", err);
        res.status(500).json({ error: "Error adding item to shop" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Read data
router.get("/", async (req, res) => {
    try {
        // Joining e_waste_items with users and collection_centers
        const { data, error } = await supabase
            .from("e_waste_items")
            .select(`
                *,
                users:users (
                    user_id,
                    email,
                    user_name,
                    phone,
                    city
                ),
                collection_centers:collection_centers (
                    center_id,
                    center_name,
                    phone,
                    city
                )
            `);

        if (error) {
            console.error("Error fetching joined data:", error);
            return res.status(500).json({ error: "Error fetching joined data" });
        }

        res.json(data);
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Unexpected error occurred" });
    }
});

// Insert data
router.post("/insert", async (req, res) => {
    try {
        const { item_name, category, item_condition, user_id, center_id } = req.body;

        if (!item_name || !category || !item_condition || !user_id || !center_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const { data, error } = await supabase
            .from("e_waste_items")
            .insert([{ item_name, category, item_condition, user_id, center_id }])
            .select("*");

        if (error) {
            console.error("Error inserting e-waste item:", error);
            return res.status(500).json({ error: "Error inserting e-waste item" });
        }

        console.log("Inserted e-waste item:", data);
        res.status(201).json(data);
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Unexpected error occurred" });
    }
});

// Delete data
router.post("/delete", async (req, res) => {
    try {
        // Extract parameters from the request body
        const { item_name, category, item_condition, user_id, center_id } = req.body;

        // Validate that all required fields are provided
        if (!item_name || !category || !item_condition || !user_id || !center_id) {
            return res.status(400).json({ error: "All fields (item_name, category, item_condition, user_id, center_id) are required" });
        }

        // Delete the record matching the provided fields
        const { data, error } = await supabase
            .from("e_waste_items")
            .delete()
            .match({
                item_name,
                category,
                item_condition,
                user_id: parseInt(user_id, 10),
                center_id: parseInt(center_id, 10)
            })
            .select("*");

        if (error) {
            console.error("Error deleting e-waste item:", error);
            return res.status(500).json({ error: "Error deleting e-waste item" });
        }

        console.log("Deleted e-waste item:", data);
        res.status(200).json(data);
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Unexpected error occurred" });
    }
});

module.exports = router;

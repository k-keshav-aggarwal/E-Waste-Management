const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Read data
router.get("/", async (req, res) => {

    /* 
    Raw SQL for joined data:
    SELECT 
        e_waste_items.*,
        users.user_id,
        users.email,
        users.user_name,
        users.phone AS user_phone,
        users.city AS user_city,
        collection_centers.center_id,
        collection_centers.center_name,
        collection_centers.phone AS center_phone,
        collection_centers.city AS center_city
    FROM e_waste_items
    LEFT JOIN users ON e_waste_items.user_id = users.user_id
    LEFT JOIN collection_centers ON e_waste_items.center_id = collection_centers.center_id;
    */

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

    /*
    Raw SQL for insert:
    INSERT INTO e_waste_items 
        (item_name, category, item_condition, user_id, center_id)
    VALUES
        ($1, $2, $3, $4, $5)
    RETURNING *;
    */

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

    /*
    Raw SQL for delete:
    DELETE FROM e_waste_items
    WHERE 
        item_name = $1 AND
        category = $2 AND
        item_condition = $3 AND
        user_id = $4 AND
        center_id = $5
    RETURNING *;
    */

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

// Aggregate Function
router.get('/aggregate', async (req, res) => {

    /* Raw SQL:
    1. Get user_id by email:
    SELECT user_id FROM users WHERE email = $1 LIMIT 1;

    2. Count user's e-waste items:
    SELECT COUNT(*) FROM e_waste_items WHERE user_id = $1;
    */

    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // First get user by email
console.log(email)
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_id')
            .eq('email', email)
            .single();

        if (userError || !userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Then count items for this user
        const { count, error: countError } = await supabase
            .from('e_waste_items')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userData.user_id);

        if (countError) throw countError;

        res.json({ count });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

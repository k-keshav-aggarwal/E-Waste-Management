const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Route to get user details by email using query parameter
router.get("/", async (req, res) => {
    try {
        // Retrieve email from the query parameters instead of the body
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Fetch user details from Supabase
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single(); // Ensures only one record is retrieved

        if (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ error: "Error fetching user" });
        }

        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Fetched User Data:", data);
        res.json(data);
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Unexpected error occurred" });
    }
});

module.exports = router;

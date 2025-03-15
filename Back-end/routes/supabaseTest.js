const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase.from("users").select("*").limit(1);
        if (error) throw error;
        console.log("yes")
        res.json({ message: "Connected to Supabase!", data });
    } catch (error) {
        console.error("Supabase Connection Error:", error);
        res.status(500).json({ error: "Failed to connect to Supabase" });
    }
});

module.exports = router;

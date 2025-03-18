const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase.from("collection_centers").select("*");
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching collection centers:", err);
        res.status(500).json({ error: "Error fetching collection centers" });
    }
});


router.post("/", async (req, res) => {
    try {
        //delete this code once you set center_id to auto increment
        const { data: maxData, error: maxError } = await supabase
            .from("collection_centers")
            .select("center_id")
            .order("center_id", { ascending: false })
            .limit(1)
            .single();

        if (maxError && maxError.code !== "PGRST116") throw maxError;
        const center_id = maxData.center_id + 1;
        
        const { data, error } = await supabase.from("collection_centers").insert([{ center_id,center_name, phone, city, admin_id }]).select().single();
        if (error) throw error;
        res.status(201).json({ message: "Successfully created collection center", center: data });
    } catch (err) {
        console.error("Error creating collection center:", err);
        res.status(500).json({ error: "Error creating collection center" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from("collection_centers").delete().eq("center_id", id);
        if (error) throw error;
        res.status(200).json({ message: "Successfully deleted collection center" });
    } catch (err) {
        console.error("Error deleting collection center:", err);
        res.status(500).json({ error: "Error deleting collection center" });
    }
});

module.exports = router;

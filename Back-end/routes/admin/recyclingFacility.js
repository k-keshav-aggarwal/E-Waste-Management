const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


router.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase.from("recycling_facilities").select("*");
        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching recycling centers:", err);
        res.status(500).json({ error: "Error fetching recycling centers" });
    }
});


router.post("/", async (req, res) => {
    try {
        //delete this code once you set facility_id to auto increment
        const { data: maxData, error: maxError } = await supabase
            .from("recycling_facilities")
            .select("facility_id")
            .order("facility_id", { ascending: false })
            .limit(1)
            .single();

        if (maxError && maxError.code !== "PGRST116") throw maxError;
        const facility_id = maxData.facility_id + 1;


        let { facility_name, phone, city, admin_id } = req.body;
        admin_id = Number(admin_id) || null;

        const { data, error } = await supabase
            .from("recycling_facilities")
            .insert([{ facility_id,facility_name, phone, city, admin_id }])
            .select()
            .single();
        
        if (error) throw error;
        res.status(201).json({ message: "Successfully created recycling center", center: data });
    } catch (err) {
        console.error("Error creating recycling center:", err);
        res.status(500).json({ error: "Error creating recycling center" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from("recycling_facilities").delete().eq("facility_id", id);
        if (error) throw error;
        res.status(200).json({ message: "Successfully deleted recycling center" });
    } catch (err) {
        console.error("Error deleting recycling center:", err);
        res.status(500).json({ error: "Error deleting recycling center" });
    }
});

module.exports = router;

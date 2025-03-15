const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Registration endpoint
router.post("/register", async (req, res) => {
  const { email, password, role, adminCode, phone, user_name, city, admin_name, designation } = req.body;

  try {
    // Check if the email exists in either table
    const { data: existingUser } = await supabase.from("users").select("*").eq("email", email).single();
    const { data: existingAdmin } = await supabase.from("admins").select("*").eq("email", email).single();

    if (existingUser || existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate Admin Code for admin registration
    if (role === "admin") {
      const { data: codeData } = await supabase.from("admin_codes").select("*").eq("code", adminCode).single();
      if (!codeData) {
        return res.status(400).json({ message: "Invalid admin code" });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let tableName = role === "admin" ? "admins" : "users";
    let insertData = role === "admin"
      ? { email, password: hashedPassword, phone, admin_name, designation }
      : { email, password: hashedPassword, phone, user_name, city };

    const { data, error } = await supabase
      .from(tableName)
      .insert([insertData])
      .select("*")
      .single();

    if (error) throw error;

    const id = role === "admin" ? data.admin_id : data.user_id;
    res.status(201).json({ message: "User registered successfully", id: id });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user } = await supabase.from("users").select("*").eq("email", email).single();
    const { data: admin } = await supabase.from("admins").select("*").eq("email", email).single();

    if ((!user && !admin)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isAdmin = !!admin;
    const userData = isAdmin ? admin : user;
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({
      id: userData.user_id || userData.admin_id,
      email: userData.email,
      role: isAdmin ? "admin" : "user",
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    

    res.status(200).json({ token, role: isAdmin ? "admin" : "user" });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;

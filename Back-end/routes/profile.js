const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Fetch profile endpoint
router.post("/profile", async (req, res) => {

  /*
  Raw SQL for profile fetch:
  -- For users:
  SELECT * FROM users WHERE email = $1 LIMIT 1
  
  -- For admins:
  SELECT * FROM admins WHERE email = $1 LIMIT 1
  */

  const { email, role } = req.body;

  try {
    let tableName = role === 'admin' ? 'admins' : 'users';
    const { data, error } = await supabase.from(tableName).select('*').eq('email', email).single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({
      name: role === 'admin' ? data.admin_name : data.user_name,
      email: data.email,
      phone: data.phone,
      city: role === 'user' ? data.city : null,
      designation: role === 'admin' ? data.designation : null,
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update profile endpoint
router.post("/update-profile", async (req, res) => {

    /*
  Raw SQL for profile update:
  -- For users:
  UPDATE users
  SET 
    user_name = $1,
    phone = $2,
    city = $3
  WHERE email = $4
  RETURNING *
  
  -- For admins:
  UPDATE admins
  SET 
    admin_name = $1,
    phone = $2,
    designation = $3
  WHERE email = $4
  RETURNING *
  */

  const { email, name, phone, city, designation, role } = req.body;

  try {
    let tableName = role === 'admin' ? 'admins' : 'users';
    const updateData = {
      ...(role === 'admin' ? { admin_name: name } : { user_name: name }),
      phone,
      ...(role === 'user' ? { city } : { designation }),
    };

    const { data, error } = await supabase.from(tableName).update(updateData).eq('email', email).select();
    if (error) throw error;

    res.status(200).json({ message: 'Profile updated successfully', data });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://e-waste-management-opal.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.options('*', cors());
app.use(express.static(path.join(__dirname, "public")));

// Import route modules
const chatBotRoutes = require("./routes/chatBot");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const supabaseTestRoutes = require("./routes/supabaseTest");
const collectionCentre = require("./routes/collectionCentre");
const e_wasteItems = require("./routes/e-wasteItems");
const users = require("./routes/users");
const shop = require("./routes/shopRoutes");

//admin routes
const adminCollectionCenter  = require("./routes/admin/collectionCenter");
const adminRecyclingFacility  = require("./routes/admin/recyclingFacility");
const adminShop = require("./routes/admin/shop");

// Mount routes
app.use("/chat-bot", chatBotRoutes);
app.use("/auth", authRoutes);
app.use("/", profileRoutes); // profile endpoints: /profile & /update-profile
app.use("/test-supabase", supabaseTestRoutes);
app.use("/collectionCentre", collectionCentre);
app.use("/ewaste-items", e_wasteItems);
app.use("/users", users);
app.use("/shop", shop);
app.use("/admin/collectionCenter", adminCollectionCenter);
app.use("/admin/recyclingFacility", adminRecyclingFacility);
app.use("/admin/shop", adminShop);


app.get("/", (req, res) => {
  console.log("backend connected");
  res.send("Backend is connected");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

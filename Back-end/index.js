const express = require("express");
const cors = require("cors");
const { pool } = require("./db/connection.js");
const { collectionCenterRouter, recyclingCenterRouter, shopRouter } = require("./routes/index.js");

const app = express();

app.get("/", (req, res) => {
    res.send("hello");
});

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/collection_centers", collectionCenterRouter);
app.use("/recycling_centers", recyclingCenterRouter);
app.use("/shop", shopRouter);

// Handle both SIGINT (Ctrl + C) and SIGTERM (server shutdown)
const closeConnection = async () => {
    console.log("Closing PostgreSQL connection...");
    await pool.end();
    console.log("PostgreSQL connection closed.");
    process.exit(0);
};

process.on("SIGINT", closeConnection);
process.on("SIGTERM", closeConnection);

app.listen(5000, () => {
    console.log("Server listening on port 5000");
});

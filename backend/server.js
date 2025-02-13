
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const API_KEY = process.env.MY_API_KEY;


const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["frontend-apikey"]; // Case-insensitive
  if (apiKey === API_KEY) {
    next(); // Allow request
  } else {
    console.log("Unauthorized access due to invalid API key.");
    res.status(403).json({ error: "Unauthorized: Invalid API Key" });
  }
};


// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "stock_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// API Routes

// Add Stock
app.post("/add", verifyApiKey, (req, res) => {
  const { item_name, quantity } = req.body;
  const sql = "INSERT INTO stocks (item_name, quantity) VALUES (?, ?)";
  db.query(sql, [item_name, quantity], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Stock added successfully!" });
  });
});

// View Stocks
app.get("/view", verifyApiKey, (req, res) => {
  const sql = "SELECT * FROM stocks";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
});

// Remove Stock
app.delete("/remove/:id", verifyApiKey, (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM stocks WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Stock removed successfully!" });
  });
});

//. Update Stock
app.put("/update/:id", verifyApiKey, (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const sql = "UPDATE stocks SET quantity = ? WHERE id = ?";
  db.query(sql, [quantity, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Stock updated successfully!" });
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

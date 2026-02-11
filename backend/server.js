const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRouter = require("./routes/Router");
const OderRouter = require("./routes/OderRouter");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 
app.use('/upload', express.static('uploads'));

// Routes
app.use("/api", UserRouter); // Handles user routes
app.use("/api/orders", OderRouter); // Handles order routes

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/my_db")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("server running on port", PORT));
const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./utils/database");
require("dotenv").config();
const UserRoutes = require("./routes/user");
const postRoute = require("./routes/post");

const app = express();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/posts',postRoute); 
app.use("/users", UserRoutes);


app.get("/", (req, res) => {
  console.log("backend is working");
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

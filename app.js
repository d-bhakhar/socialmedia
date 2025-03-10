const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/user");

const app = express();
app.use(express.json());

app.use(UserRoutes);

app.get("/", (req, res) => {
  console.log("backend is working");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

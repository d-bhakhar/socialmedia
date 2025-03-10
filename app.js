const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const connectDB = require('./utils/database');
require('dotenv').config();
const UserRoutes = require("./routes/user");
const postRoute = require('./routes/post');


const app = express();
connectDB();
// const userRoute = require('./routes/user');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(postRoute); 
app.use(UserRoutes);

app.get("/", (req, res) => {
  console.log("backend is working");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

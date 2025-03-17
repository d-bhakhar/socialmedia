const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./utils/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/user");
const postRoute = require("./routes/post");
const authRoute = require("./routes/auth");
const authenticateToLogin = require("./middleware/auth");

const app = express();
connectDB();

// console.log("authRoute:", authRoute);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/users", authenticateToLogin, userRoutes);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("backend is working");
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

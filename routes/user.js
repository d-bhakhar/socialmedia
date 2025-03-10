const express = require('express');
const userrouter = require("../controllers/user");
const routes = express.Router();


routes.get("/get-users", userrouter.getUsers);
routes.post("/create-user", userrouter.createUser);
routes.post("/update-user", userrouter.updateUser);
routes.post("/delete-user", userrouter.deleteUser); 


module.exports = routes;
const express = require('express');
const userrouter = require("../controllers/user");
const routes = express.Router();


routes.get("/", userrouter.getUsers);
routes.post("/", userrouter.createUser);
routes.post("/:id", userrouter.updateUser);
routes.post("/:id", userrouter.deleteUser); 


module.exports = routes;
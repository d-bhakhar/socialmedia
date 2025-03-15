const express = require("express");
const userrouter = require("../controllers/user");
const routes = express.Router();

routes.get("/", userrouter.getUsers);
routes.post("/", userrouter.createUser);
routes.put("/:id", userrouter.updateUser);
routes.delete("/:id", userrouter.deleteUser);

routes.get("/:id/following", userrouter.followingList);
routes.get("/:id/followers", userrouter.follwersList);
routes.get("/:id/post-count", userrouter.postCount);

module.exports = routes;

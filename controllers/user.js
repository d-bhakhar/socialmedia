const user = require("../models/user")

exports.getUsers = (req, res) => {
    const user = user.findById(req.params.id);
    res.json(user);
};
exports.createUser = (req, res) => {
  const user = new user({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profilepicture: req.body.profilepicture,
    about: req.body.about,
    created_at: req.body.created_at,
  });
  user.save();
  res.json("User created");
};
exports.updateUser = (req, res) => {
  const updatedname = req.body.name;
  const updatedemail = req.body.email;
  const updatedpassword = req.body.password;
  const updatedprofilepicture = req.body.profilepicture;
  const updatedabout = req.body.about;
  const updatedcreated_at = req.body.created_at;
  user.findById(id).then((user) => {
    user.name = updatedname;
    user.email = updatedemail;
    user.password = updatedpassword;
    user.profilepicture = updatedprofilepicture;
    user.about = updatedabout;
    user.created_at = updatedcreated_at;
    user.save();
  });
  res.json("User updated");
};
exports.deleteUser = (req, res) => {
  const user = user.findBtIdAndRemove(req.params.body);
  res.json("user deleted");
};


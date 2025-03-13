const user = require("../models/user");

exports.getUsers = async (req, res, next) => {
  try {
    const user = await user.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = new user({
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profilepicture: req.body.profilepicture,
      about: req.body.about,
      created_at: req.body.created_at,
    });
    await user.save();
    return res.json("user created!", user);
    console.log("user not found", user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await user.findByIdAndUpdate(req.params.body);
    const updatedname = req.body.name;
    const updatedemail = req.body.email;
    const updatedpassword = req.body.password;
    const updatedprofilepicture = req.body.profilepicture;
    const updatedabout = req.body.about;
    const updatedcreated_at = req.body.created_at;
    user.name = updatedname;
    user.email = updatedemail;
    user.password = updatedpassword;
    user.profilepicture = updatedprofilepicture;
    user.about = updatedabout;
    user.created_at = updatedcreated_at;
    await user.save();
    return res.json("User updated", user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await user.findByIdAndRemove(req.params.id);
    return res.json("user deleted");
  } catch (error) {
    next(error);
  }
};

exports.follwingList = async (req, res, next) => {
  try {
    if (!following) {
      return res.status(404).json({ message: "You Not Following Anyone" });
    }
    const following = await following.findById(req.params.id);
    return res.json(following);
  } catch (error) {
    next(error);
  }
};

exports.follwersList = async (req, res, next) => {
  try {
    if (!followers) {
      return res.status(404).json({ message: "you don't have any followers" });
    }
    const followers = await following.findById(req.params.id);
    return res.status(404).json(followers);
  } catch (error) {
    next(error);
  }
};

exports.postCount = async (req, res, next) => {
  try {
    if (!post) {
      return res.status(404).json({ message: "You don't have any posts" });
    }
    const postcount = await Post.countDocuments({ user: req.params.post });
    // return res.json(postcount)
    return res.status(200).json(postcount);
  } catch (error) {
    next(error);
  }
};

// erports.commentsCountonPost = async (req, res, next) => {
//   try {

//   }catch{
//     next(error);
//   }
// }

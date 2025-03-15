const User = require("../models/user");
const Post = require("../models/post");

exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    // const user = await User.find(); // to get all users
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
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profilepicture: req.body.profilepicture,
      about: req.body.about,
    });

    await newUser.save();
    return res.json("user created!", newUser);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedname = req.body.name;
    const updatedemail = req.body.email;
    const updatedpassword = req.body.password;
    const updatedprofilepicture = req.body.profilepicture;
    const updatedabout = req.body.about;
    const updatedcreated_at = req.body.created_at;

    // const updatedUser = await User.findByIdAndUpdate(req.params.id); // because we added here '/:id' in the url (routes.put("/:id", userrouter.updateUser);)
    // // we can use this save method when we are using this 'fingbyId()'  method
    // updatedUser.name = updatedname;
    // updatedUser.email = updatedemail;
    // updatedUser.password = updatedpassword;
    // updatedUser.profilepicture = updatedprofilepicture;
    // updatedUser.about = updatedabout;
    // updatedUser.created_at = updatedcreated_at;
    // if (!updatedUser) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    // await updatedUser.save();
    // return res.json("User updated", updatedUser);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: updatedname,
        email: updatedemail,
        password: updatedpassword,
        profilepicture: updatedprofilepicture,
        about: updatedabout,
        created_at: updatedcreated_at,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json("User updated", updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

exports.followingList = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("following");
    if (!user || !user.following.length) {
      return res.status(404).json({ message: "You are not following anyone" });
    }
    return res.json(user.following);
  } catch (error) {
    next(error);
  }
};

exports.follwersList = async (req, res, next) => {
  try {
    const user = await user.findById(req.params.id).populate("followers");
    if (!user || !user.followers.length) {
      return res.status(404).json({ message: "you don't have any followers" });
    }
    return res.status(404).json(followers);
  } catch (error) {
    next(error);
  }
};

exports.postCount = async (req, res, next) => {
  try {
    const postcount = await Post.countDocuments({ user: req.params.id });
    return res.status(200).json({ postCount: postcount });
  } catch (error) {
    next(error);
  }
};
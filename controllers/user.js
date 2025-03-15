const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");


exports.getUsers = async (req, res, next) => {
  try {
    // Get the decoded user object from `req.user` (set in middleware)
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Invalid Token." });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log("user:", user);
    res.json(user); // Return the user
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    console.log("New user created:", newUser);
    res.json(newUser); // Return the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Validate the ID
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
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
      userId,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilepicture: req.body.profilepicture,
        about: req.body.about,
        created_at: req.body.created_at,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User updated:", updatedUser);
    return res.status(200).json({ message: "User updated", user: updatedUser });
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
    console.log("User deleted:", user);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

exports.followingList = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "following",
      select: "_id",
    });
    if (!user || !user.following.length) {
      return res.status(404).json({ message: "You are not following anyone" });
    }

    // Extract only the IDs from the populated following
    const followingId = user.following.map((following) => following._id);
    console.log("Following list:", followingId);
    return res.status(200).json(user.following);
  } catch (error) {
    next(error);
  }
};

exports.follwersList = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "followers",
      select: "_id",
    });
    console.log("User:", user);
    if (!user || !user.followers.length) {
      return res.status(404).json({ message: "you don't have any followers" });
    }

    // Extract only the IDs from the populated followers
    const followerIds = user.followers.map((follower) => follower._id);
    console.log("Followers list:", followerIds);
    return res.status(200).json(user.followers);
  } catch (error) {
    next(error);
  }
};

exports.postCount = async (req, res, next) => {
  try {
    const postcount = await Post.countDocuments({ user: req.params.id });
    console.log("Post count:", postcount);
    return res.status(200).json({ postCount: postcount });
  } catch (error) {
    next(error);
  }
};
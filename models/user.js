const mongoose = require('mongoose');
const { number } = require('yargs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //   id: {
  //     type: Number,
  //     unique: true,
  //     required: true,
  //   },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepicture: {
    type: String,
    required: false,
  },
  about: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  followers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postsCount: {
    type: Number,
    defaultValue: 0,
  },
  commentsCount: {
    type: Number,
    defaultValue: 0,
  },
});
exports.module = mongoose.model('User',userSchema);
const express = require("express");

const crypto = require("crypto");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

// const { v4: uuidv4 } = require('uuid');

const jwt = require('jsonwebtoken');

const { setUser, getuser } = require('../service/auth');

exports.postSignup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

        const hashpassword = await bcrypt.hash(password, 10);

        const user = new User({
            name: name,
            email: mail,
            password: hashpassword
        });
        console.log('user created now saving :', hashpassword);
        const result = await user.save();
        console.log('user saved !', result);

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.status(500).send("server error !");
  }
};

// bcrypt.hash(password, 10)
//     .then(hashpassword => {
//         const user = new user({
//             name: name,
//             email: email,
//             password: hashpassword
//         })
//         console.log('user created now saving :', hashpassword);
//         user.save().then(result => {
//             console.log('user saved !', result);
//             res.redirect('/login');
//         })
//     })
//     .catch(err => {
//         console.log(err);
//     })

exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

        const user = await User.findOne({
            email: email,
        });
        if (!user) {
            console.log('user authentication failed !', user);
            return res.status(401).redirect('/login');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log('user authentication failed ! incorrect password !', user);
            return res.status(400).json({ message: "Invalid credentials." });
        }
        // const sessionId = uuidv4();
        // setUser(sessionId, user);
        // res.cookie('uid', sessionId);
        const token = setUser(user);
        res.cookie('token', token);
        console.log('user authentication sussessfull !', user);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error !');
    }
};


const express = require('express');

const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

// const { v4: uuidv4 } = require('uuid');

const setUser = require('../service/auth');

exports.postSignup = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const hashpassword = await bcrypt.hash(password, 10);
        console.log('user created now saving :', hashpassword);

        const user = new user({
            name: name,
            email: email,
            password: hashpassword
        });
        const result = await user.save();
        console.log('user saved !', result);

        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.status(500).send('server error !');
    }
}

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

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email: email,
        password: password
    })
        .then(user => {
            if (!user) {
                console.log('user authentication failed !', user);
                return res.ststus(401).redirect('/login');
            }


            // const sessionId = uuidv4();
            // setUser(sessionId, user);
            // res.cookie('uid', sessionId);
            const token = setUser(user);
            res.cookie('token', token);

            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        // console.log('user authentication failed !', user);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            console.log('user authentication sussessfull !', user);
            return res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })

}
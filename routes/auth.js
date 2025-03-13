const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/Login', authController.postLogin);

router.post('/Signup', authController.postSignup);

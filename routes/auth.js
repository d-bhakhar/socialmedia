const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/Login', authController.postLogin);

router.post('/Signup', authController.postSignup);

module.exports = router;
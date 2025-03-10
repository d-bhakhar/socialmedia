const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/', postController.addPost);

router.post('/:id/like', postController.likePost);

router.post('/:id/comment', postController.commentPost);

module.exports = router;
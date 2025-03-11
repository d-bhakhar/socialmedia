const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/', postController.addPost);

router.post('/:id/like', postController.likePost);

router.post('/:id/comment', postController.commentPost);

router.post('/delete' ,postController.deletePost);

router.post('/editPost', postController.editPosts);

module.exports = router;
const express = require('express');
const Post = require('../models/post');
const post = require('../models/post');

exports.addPost = async (req, res, next) => {
    const imgUrl = req.body.imgUrl;
    const likes = req.body.likes;
    const dislikes = req.body.dislikes;
    const comments = req.body.comments;

    const post = new Post({
        imgUrl: imgUrl,
        likes: likes,
        dislikes: dislikes,
        comments: comments
    });
    await post.save()
        .then(result => {
            console.log('created post');
            console.log(post);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.likePost = async (req, res, next) => {
    Post.findById
}

exports.commentPost = (req, res, next) => {

}
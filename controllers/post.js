const express = require('express');
const Post = require('../models/post');
const post = require('../models/post');

exports.addPost = async (req, res, next) => {
    // const imgUrl = req.body.imgUrl;
    // const likes = req.body.likes;
    // const dislikes = req.body.dislikes;
    // const comments = req.body.comments;
    const likes = req.body.likes !== undefined ? req.body.likes : 0;
    const dislikes = req.body.dislikes !== undefined ? req.body.dislikes : 0;
    const comments = req.body.comments !== undefined ? req.body.comments : [];

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
    const postId = req.params.postId;
    const userId = req.user.userId;
    const action = req.body.action;

    console.log(`like-dislike request", ${postId},${userId}`);

    Post.findById(postId)
        .then(post => {
            if (!post) {
                console.log('post not found');
                return res.status(404).redirect('/error');
            }

            let liked = post.likes.includes(userId);
            let disliked = post.dislikes.includes(userId);

            // handle the like action
            if (action === 'like') {
                if (!liked) {
                    post.likes.push(userId); // Add user to likes
                    post.likeCount += 1;
                    console.log('Post Liked');
                } else {
                    console.log('Post already liked');
                }
                if (disliked) {
                    post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
                    post.dislikeCount -= 1;
                    console.log('removed from dislike');
                }
            }

            //handle dislike action
            if (action === 'dislike') {
                if (!disliked) {
                    post.dislikes.push(userId); // Add user to dislikes
                    post.dislikeCount += 1;
                    console.log('post desliked');
                } else {
                    console.log('post already disliked');
                }
                if (liked) {
                    post.likes = post.likes.filter(id => id.toString() !== userId);
                    post.likeCount -= 1;
                    console.log('removed from liked');
                }
            }

            //save changes
            if (action === 'like' || action === 'dislike') {
                post.save();
                console.log('updated post', post);
                return res.redirect('/posts/' + postId); // Redirect to the post page
            } else {
                console.log('no action');
                return res.redirect('/error');
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.commentPost = (req, res, next) => {
}
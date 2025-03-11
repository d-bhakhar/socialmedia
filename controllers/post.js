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
            console.log('created post', post);
            // console.log(post);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    Post.findByIdAndRemove(postId)
        .then(result => {
            if (!result) {
                console.log('Post not found');
                return res.status(404).redirect('/error');
            } else {
                console.log('post deleted', result);
                return res.status(200).redirect('/posts');
            }
        })
        .catch(err => {
            console.log(err);
        })
}

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

            // like action
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

            // dislike action
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
                return res.redirect('/posts/' + postId); // exaple = '/posts/abc123'
            } else {
                console.log('no action');
                return res.redirect('/error');
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.commentPost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    const comment = req.body.comments;

    console.log(`coments: ${postId},${userId},${comment}`);

    // const post = Post.findById(postId);
    Post.findById(postId)
        .then(post => {
            if (!post) {
                console.log('post not found');
                return res.redirect('/error');
            }

            //create comment object
            const commentObj = {
                userId: userId,
                comment: comment,
                postId: postId,
            };

            //push this comments to post's array
            post.comments.push(commentObj);
            post.save();
            console.log('comment added:', commentObj);
            console.log('updated post:', post);

            return res.redirect('/posts/' + postId);
        })
        .catch(err => {
            console.log(err);
        })
}
exports.editPosts = (req, res, next) => {
    const postId = req.body.postId;
    const updatedImgUrl = req.body.imgUrl;
    const updatedLikes = req.body.likes;
    const updatedDislikes = req.body.dislikes;
    const updatedComments = req.body.comments;

    console.log('edit request for postId:', postId);
    console.log('updated posts data:', req.body);

    Post.findById(postId)
        .then(post => {
            if (!post) {
                console.log('post not found');
                return res.redirect('/error');
            }
            // update post field
            post.imgUrl = updatedImgUrl;
            post.likes = updatedLikes !== undefined ? updatedLikes : 0;
            post.dislikes = updatedDislikes;
            post.comments = updatedComments;

            return post.save();
        })
        .then(result => {
            console.log('post updated:', result);
            res.redirect('/posts');
        })
        .catch(err => {
            console.log(err);
        })
}
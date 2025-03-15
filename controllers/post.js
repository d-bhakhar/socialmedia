const express = require('express');
const Post = require('../models/post');
const post = require('../models/post');

exports.addPost = async (req, res, next) => {
    const imgUrl = req.body.imgUrl;
    // const likes = req.body.likes;
    // const dislikes = req.body.dislikes;
    // const comments = req.body.comments;
    if (!imgUrl) {
        return res.status(400).json({ message: 'ImgUrl is required' });
    }
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

exports.deletePost = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const result = await Post.findByIdAndDelete(postId);
        if (!result) {
            console.log('Post not found');
            return res.status(404).json({ message: 'Post not found' });
        } else {
            console.log('Post deleted', result);
            return res.status(200).json({ message: 'Post deleted' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

exports.likePost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    const action = req.body.action;

    console.log(`like-dislike request", ${postId},${userId}`);
    try {
        const post = await Post.fondbyId(postId);
        if (!post) {
            console.log('post not found');
            return res.status(404).json({ message: 'Post not found' });
        }

        let liked = post.likes.includes(userId); // check if user already liked
        let disliked = post.dislikes.includes(userId); // includes() - checks if a specific value is present in an array.

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
            await post.save();
            console.log('updated post', post);
            return res.redirect('/posts/' + postId); // exaple = '/posts/abc123'
        } else {
            console.log('no action');
            return res.redirect('/error');
        }
    } catch (err) {
        console.log(err);
    }
}


exports.commentPost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    const comment = req.body.comments;

    console.log(`coments: ${postId},${userId},${comment}`);

    try {
        const post = await Post.fingById(postId);
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
        await post.save();
        console.log('comment added:', commentObj);
        console.log('updated post:', post);

        return res.redirect('/posts/' + postId);
    } catch (err) {
        console.log(err);
    }
}
exports.editPosts = async (req, res, next) => {
    const postId = req.body.postId;
    const updatedImgUrl = req.body.imgUrl;
    const updatedLikes = req.body.likes;
    const updatedDislikes = req.body.dislikes;
    const updatedComments = req.body.comments;

    console.log('edit request for postId:', postId);
    console.log('updated posts data:', req.body);

    try {
        const post = await Post.findById(postId);
        if (!post) {
            console.log('post not found');
            return res.redirect('/error');
        }
        // update post field
        post.imgUrl = updatedImgUrl;
        post.likes = updatedLikes !== undefined ? updatedLikes : post.likes;
        post.dislikes = updatedDislikes;
        post.comments = updatedComments;

        const result = await post.save();
        console.log('post updated:', result);
        res.redirect('/posts');

    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    imgUrl: {
        type: String,
        required: true
    },
    likes: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    },
    dislikes: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    },
    comments: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: {
                type: String
            },
        }
    ],
    likeCount: {
        type: Number,
        default: 0
    },  // Numerical count
    dislikeCount: {
        type: Number,
        default: 0
    } // Numerical count
});

module.exports = mongoose.model('Post', postSchema);
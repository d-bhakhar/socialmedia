const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    imgUrl: {
        type: String,
        required: true
    },
    likes: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dislikes: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
    ]
});

module.exports = mongoose.model('Post', postSchema);
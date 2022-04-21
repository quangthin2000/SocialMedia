const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            
        },
        postId: {
            type: String,
            ref: "post",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('comment', CommentSchema)
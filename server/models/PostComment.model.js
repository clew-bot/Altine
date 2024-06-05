import mongoose from "mongoose";
import UserModel from "./User.model";
import UserPost from "./UserPost.model";
const PostCommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    },
    postRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: UserPost,
    },
    content: {
        type: String,
        required: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    }, 
    replies: {
        type: Array,
        default: [],

    },
    photos: {
        type: Array,
        default: [],
    }
    },
    { timestamps: true }
    );

const PostComment = mongoose.model("PostComment", PostCommentSchema);
export default PostComment
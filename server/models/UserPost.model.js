import mongoose from "mongoose";
// import Reactions from "./Reactions.model";
import UserModel from "./User.model";

const UserPostSchema = new mongoose.Schema({
    author: {
 type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: UserModel,
    },
    content: {
        type: String,
    },
    likeCount: {
        type: Number,
        default: 0,
    }, 
    comments: {
        type: Array,
        default: [],
        ref: "PostComment",
    },
    photos: {
        type: Array,
        default: [],
    },
    videos: {
        type: Array,
        default: [],
    },
    media: {
        type: Array,
        default: [],
    },
    reactions: {
        type: Array,
        default: [],
        ref: "ReactionModel",
    },
    poll: {
        type: Object,
        default: {},
        ref: "PollModels",
    },
    views: {
        type: Number,
        default: 0,
    },
  
    },
    { timestamps: true }
    );

    // delete reactions when post is deleted
    UserPostSchema.pre('remove', function(next) {
        // 'this' is the client being removed. Provide callbacks here if you want
        // to be notified of the calls' result.
        ReactionModel.remove({postReactedTo: this._id}).exec();
        // ReactionsModel.remove({client_id: this._id}).exec();
        next();
    });
const UserPost = mongoose.model("UserPost", UserPostSchema);
export default UserPost
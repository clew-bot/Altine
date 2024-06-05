import mongoose from "mongoose";
import UserPost from "./UserPost.model";
import UserModel from "./User.model";

const ReactionSchema = new mongoose.Schema({
    reactionType: {
        type: String,
        required: true,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    postReactedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserPost,
        required: true,
    },
    },
    { timestamps: true }
    );

const Reactions = mongoose.model("ReactionModel", ReactionSchema);
export default Reactions;
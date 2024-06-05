import mongoose from "mongoose";
import UserModel from "./User.model";
const MessageModelSchema = new mongoose.Schema({
    // users: {
    //     type: Array,
    //     required: true,
    // },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    images: {
        type: Array,
        default: [],
    },
    video: {
        type: String,
        default: "",
    },
    },
    { timestamps: true }
    );

const MessageModel = mongoose.model("MessageModel", MessageModelSchema);
export default MessageModel
import mongoose from "mongoose";
import UserModel from "./User.model";
const ConversationModelSchema = new mongoose.Schema({
    users: {
        type: Array,
        required: true,
    },
    latestMessage: {
        type: String,
        default: "",
    },
    read: {
        type: Boolean,
        default: false,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    }},
    {
        timestamps: true
    }
    );

const ConversationModel = mongoose.model("ConversationModel", ConversationModelSchema);
export default ConversationModel
import mongoose from "mongoose";
import UserModel from "./User.model";
const NotificationModelSchema = new mongoose.Schema({
    title: {
        type: String,
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
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
    },
    type: {
        type: String,
        default: "",
        required: true,
    },
    },
    { timestamps: true }
    );

const NotificationModel = mongoose.model("NotificationModels", NotificationModelSchema);
export default NotificationModel
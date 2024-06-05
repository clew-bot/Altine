import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";

const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const id:any = await useStorage().getItem("user");
    const clearNotifs = await UserModel.updateOne({ _id: new toId(id) }, { $set: { notificationCount: 0 } });
    return "Cleared"
})
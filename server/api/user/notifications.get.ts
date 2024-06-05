import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const id:any = await useStorage().getItem("user");
    const myPic = await UserModel.findOne({
        _id: new toId(id)}, ['notificationCount']);

    return { notificationCount: myPic?.notificationCount }
})
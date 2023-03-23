import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";

const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const id:any = await useStorage().getItem("user");
     const findNotifications = 
     await UserModel.findOne({ _id: new toId(id) })
    .populate({ 
        path: "notifications", 
        populate: { path: "from", 
            select: ["username", "coverPicture", "profilePicture", "handleName"] }, 
        options: { sort: { createdAt: -1 },} })
        .select("username")
    if(findNotifications) {
        return findNotifications.notifications
    } else {
        return []
    }
});

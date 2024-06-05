import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const id:any = await useStorage().getItem("user");
    const myPic = await UserModel.findOne({
        _id: new toId(id)} , ['profilePicture', 'friends', 'friendRequestsSent', 'notificationCount', 'friendRequests', 'pinnedPost', 'bookmarks'])

    return { id, profilePicture: myPic?.profilePicture, friends: myPic?.friends, friendRequestsSent: myPic?.friendRequestsSent, notificationCount: myPic?.notificationCount, friendRequests: myPic?.friendRequests, pinnedPost: myPic?.friendRequestsSent, bookmarks: myPic?.bookmarks }
})
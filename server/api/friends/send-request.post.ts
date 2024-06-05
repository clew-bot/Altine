import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
import NotificationModel from "~~/server/models/Notif.model";

const toId = mongoose.Types.ObjectId;
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const myId:any = await useStorage().getItem("user");
    const body = await readBody(event);
    const userId = new toId(body.id)
    const id = new toId(myId);
    // add user to friend request list
    const addFriend = await UserModel.updateOne(
        { _id: userId },
        { $push: { friendRequests: id, }, $inc: { notificationCount: 1 } },
    ).exec();

    // add me to friend request sent list
    const addMe = await UserModel.updateOne(
        { _id: id },
        { $push: { friendRequestsSent: userId },
        $inc: { notificationCount: 1 } },

    ).exec();


    const newNotificationForMe = await new NotificationModel({
        title: "Sent Request 🙂",
        content: "Sent a friend request to " + body.username,
        type: "friendRequestSent",
        from: userId,
        to: id,
    }).save();

    const newNotificationForUser = await new NotificationModel({
        title: "New Request!",
        content: "You have a new friend request from ",
        type: "friendRequestReceived",
        from: id, // me
        to: userId, // user
    }).save();

    // add notification to user
    const addNotif = await UserModel.updateOne({ _id: userId }, { $push: { notifications: newNotificationForUser._id } });

    // add notification to me
    const addNotifMe = await UserModel.updateOne({
         _id: id }, 
         { $push: 
            { notifications: newNotificationForMe._id }, });
    return "hi"
});

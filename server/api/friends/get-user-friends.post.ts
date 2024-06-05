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
        { $push: { friendRequests: id, } },
    );
    const newNotificationForUser = await new NotificationModel({
        title: "Friend Request",
        content: "You have a new friend request",
        type: "friendRequestReceived",
        from: id,
    }).save();

    const newNotificationForMe = await new NotificationModel({
        title: "Friend Request",
        content: "You have sent a friend request to " + body.username,
        type: "friendRequestSent",
        from: userId,
    }).save();

    // add notification to user
    const addNotif = await UserModel.updateOne({ _id: userId }, { $push: { notifications: newNotificationForUser._id } });

    // add notification to me
    const addNotifMe = await UserModel.updateOne({ _id: id }, { $push: { notifications: newNotificationForMe._id } });

        
    // console.log(addFriend)
    return "hi"
});

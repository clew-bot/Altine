import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
import NotificationModel from "~~/server/models/Notif.model";

const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const id:any = await useStorage().getItem("user");
    const body = await readBody(event);
    const myId = new toId(id);
    const userId = new toId(body)
    const theUser = await UserModel.findOneAndUpdate({
        _id: userId
    }, {
        $push: {
            friends: myId
        },
        $inc: { notificationCount: 1 } ,
        $pullAll: { friendRequestsSent: [myId] }
    }, {
        new: true
    })



    const updateMe = await UserModel.findOneAndUpdate({
        _id: myId
    }, {
        $push: {
            friends: userId
        },
        $inc: { notificationCount: 1 },
        $pullAll: { friendRequests: [userId] } 
    }, {
        new: true
    })

    // update 
    const newNotificationForMe = await new NotificationModel({
        title: "New Friend! 😊",
        content: "Now friends with " + theUser?.username + "🥳",
        type: "friendRequestAccepted",
        from: userId,
    }).save();

    const newNotif = await NotificationModel.findOne({
        'from': userId,
        'type': 'friendRequestAccepted',
    }).select("title content type from") .populate('from')


    // add notification to me
    const addNotifMe = await UserModel.updateOne({ _id: myId }, { $push: { notifications: newNotificationForMe._id } });

    // update the other user
    const newNotificationForUser = await new NotificationModel({
        title: "New Friend! 😊",
        content: "Now friends with " + updateMe?.username + "🥳",
        type: "friendRequestAccepted",
        from: myId,
    }).save();

    // add notification to user
    const addNotif = await UserModel.updateOne({ _id: userId }, { $push: { notifications: new toId(newNotificationForUser._id) } });

    const updateMyNotif = await NotificationModel.deleteOne({
        'from': userId,
        'type': 'friendRequestReceived',
        'to': myId,
    })

    const allNotifications = await UserModel.findOne({ _id: myId })
    .populate({ 
        path: "notifications", 
        model: NotificationModel,
        populate: {
            path: "from",
            model: UserModel
        },
        options: { sort: { createdAt: -1 },} })



    return newNotif
});

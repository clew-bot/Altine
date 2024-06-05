import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
import NotificationModel from "~~/server/models/Notif.model";

const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
  const id: any = await useStorage().getItem("user");
  const body = await readBody(event);
  const myId = new toId(id);
  const userId = new toId(body.fromId);
  const notifId = new toId(body.notifId);
  const theUser = await UserModel.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $pullAll: { friendRequestsSent: [myId] },
    },
    {
      new: true,
    }
  );

  const updateMe = await UserModel.findOneAndUpdate(
    {
      _id: myId,
    },
    {
      $pullAll: { friendRequests: [userId] },
    },
    {
      new: true,
    }
  );

  const newNotificationForMe = await new NotificationModel({
    title: "Maybe Next Time 😔",
    content: "Denied friendship with " + theUser?.username,
    type: "friendRequestDenied",
    from: userId,
  }).save();

  const addNotifMe = await UserModel.updateOne(
    { _id: myId },
    { $push: { notifications: new toId(newNotificationForMe._id) } }
  );

  const deleteNotif = await NotificationModel.deleteOne({
      'from': userId,
      'type': 'friendRequestReceived',
      'to': myId,
   })


  const allNotifications = await UserModel.findOne({ _id: myId }).populate({
    path: "notifications",
    model: NotificationModel,
    populate: {
      path: "from",
      model: UserModel,
    },
    options: { sort: { createdAt: -1 } },
  });
  return newNotificationForMe;
});

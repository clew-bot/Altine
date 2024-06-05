import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
import NotificationModel from "~~/server/models/Notif.model";
import MessageContentModel from "~~/server/models/MessageContent.model";
import UserPost from "~~/server/models/UserPost.model";
import PollModel from "~~/server/models/PollModel.model";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
  const id: any = await useStorage().getItem("user");

  const findBookmarks = await UserModel.find({
    _id: new toId(id),
  }).populate({
    path: "bookmarks",
    model: UserPost,
    populate: [{ path: "author" }, { path: "poll", model: PollModel }],
  });

  return findBookmarks;
});

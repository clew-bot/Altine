import mongoose from "mongoose";
import UserPost from "~~/server/models/UserPost.model";
import UserModel from "~~/server/models/User.model";
import PollModel from "~~/server/models/PollModel.model";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id: any = await useStorage().getItem("user");


  // Add post ID to book marks array in user model
  const bookmarkPost = await UserModel.findOne({
    _id: new toId(id),
    bookmarks: body,
    });
  
  if (!bookmarkPost) {
  await UserModel.findOneAndUpdate(
    { _id: new toId(id) },
    { $push: { bookmarks: new toId(body) } }
  );
  }
  return null;
});


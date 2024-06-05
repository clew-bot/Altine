import mongoose from "mongoose";
import UserPost from "~~/server/models/UserPost.model";
import UserModel from "~~/server/models/User.model";
import PollModel from "~~/server/models/PollModel.model";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id: any = await useStorage().getItem("user");

    // Increment view count by 1

    await UserPost.findOneAndUpdate(
        { _id: body },
        { $inc: { views: 1 } }
        );
        

  return "Hi";
    });

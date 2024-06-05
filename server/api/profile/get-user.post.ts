import mongoose from "mongoose";
import UserSchema from "~~/server/models/User.model";
import UserPost from "~~/server/models/UserPost.model";
import PollModel from "~~/server/models/PollModel.model";

const toId = mongoose.Types.ObjectId;
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id: any = await useStorage().getItem("user");

  const user2 = await UserSchema.findOne({ handleName: body })
  .populate({
    path: "posts",
    model: UserPost,
    populate: [
      { path: "author", model: UserSchema },
      { path: "poll", model: PollModel },
    ],
    options: { sort: { createdAt: -1 } }
  }).populate({
    path: "friends",
    model: UserSchema,
    select: "profilePicture friends username handleName",
  });
    if( user2?.pinnedPost === null || user2?.pinnedPost === undefined) {
        return user2
    }
    else {

     const user3 = await UserSchema.findOne({ handleName: body })
      .populate({
        path: "posts pinnedPost",
        model: UserPost,
        populate: [
          { path: "author", model: UserSchema },
          { path: "poll", model: PollModel } // Add this line to populate the polls property inside posts
        ],
        options: { sort: { createdAt: -1 } }
        })
        .populate({
          path: "friends",
          model: UserSchema,
          select: "profilePicture friends username handleName",
        });

        console.log("user3: ", user3)
      return user3
    }
});

import mongoose from "mongoose";
const toId = mongoose.Types.ObjectId;
import jwt from 'jsonwebtoken';
import UserModel from "~~/server/models/User.model";
import PostComment from "~~/server/models/PostComment.model";
import UserPost from "~~/server/models/UserPost.model";


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id:any = await useStorage().getItem("user");
    const myId = new toId(id);

    // get user and set the pinned post
    const user = await UserModel.findOneAndUpdate({_id: myId
    }, {
        pinnedPost: body
    }, {new: true});


    return "hi"
})
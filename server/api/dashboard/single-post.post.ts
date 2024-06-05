import mongoose from "mongoose";
import PostComment from "~~/server/models/PostComment.model";
import UserPost from "~~/server/models/UserPost.model";
import User from "~~/server/models/User.model";
import PollModel from "~~/server/models/PollModel.model";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {

    try {
        const body = await readBody(event);
        console.log(body)
   const findPost = await UserPost.findById({
         _id: body,
        })
        // .populate('author', ['username', 'handleName', 'profilePicture'])
        .populate({ path: 'author', model: User, select: ['username', 'handleName', 'profilePicture'] })
        // .populate('comments')
        .populate({ path: 'comments', model: PostComment, populate: { path: 'author', model: User, select: ['username', 'handleName', 'profilePicture'] } })
        // .populate('poll')
        .populate({ path: 'poll', model: PollModel })
        // .populate('comments.author', ['username', 'handleName', 'profilePicture']).sort({createdAt: -1}).exec();
        .populate({ path: 'comments.author', model: User, select: ['username', 'handleName', 'profilePicture'] }).sort({createdAt: -1}).exec();




    return findPost;
    } catch (error) {
        console.log(error)
    }
})
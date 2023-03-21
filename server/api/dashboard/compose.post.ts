import UserPost from "~~/server/models/UserPost.model";
import UserModel from "~~/server/models/User.model";
import PollModel from "~~/server/models/PollModel.model";
import mongoose from "mongoose";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let pollRef;
    const id:any = await useStorage().getItem("user");


    if (Object.keys(body.poll).length !== 0) {
        const createPoll = await PollModel.create({
            title: body.post,
            options: body.poll,
    })
    pollRef = createPoll._id
    }  



    const postStatus = await UserPost.create({
        author: new toId(id),
        content: body.post,
        photos: body?.postImages ?? [],
        videos: body?.postVideos ?? [],
        media: body?.postMedia ?? [],
        poll: pollRef ?? null,
    });

    // Populate Author and Poll
    // const populatedPost = await postStatus.populate('author', ['username', 'handleName', 'profilePicture'])

    const populatedPoll = await postStatus.populate('author', ['username', 'handleName', 'profilePicture'])

    const populatedPost = await populatedPoll.populate('poll', ['title', 'options', 'votedBy'])

 


    const addPost = await UserModel.updateOne(
        { _id: new toId(id) },
        { $push: { posts: postStatus._id } }
    );
    return { error: false, message: "Post Created", populatedPost, populatedPoll };
})
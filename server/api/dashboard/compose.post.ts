import UserPost from "~~/server/models/UserPost.model";
import UserModel from "~~/server/models/User.model";
import mongoose from "mongoose";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id:any = await useStorage().getItem("user");
    const postStatus = await UserPost.create({
        author: new toId(id),
        content: body.post,
        photos: body?.postImages ?? [],
        videos: body?.postVideos ?? [],
        media: body?.postMedia ?? [],
    });
    const populatedPost = await postStatus.populate('author', ['username', 'handleName', 'profilePicture'])
    const addPost = await UserModel.updateOne(
        { _id: new toId(id) },
        { $push: { posts: postStatus._id } }
    );

    console.log('populatedPost', populatedPost)
    return { error: false, message: "Post Created", populatedPost };
})
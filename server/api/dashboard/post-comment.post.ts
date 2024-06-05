import mongoose from "mongoose";
import PostComment from "~~/server/models/PostComment.model";
import UserPost from "~~/server/models/UserPost.model";

const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id:any = await useStorage().getItem("user");
    const { postRefId, comment } = body;
    const newComment = await PostComment.create({
        postRef: new toId(postRefId),
        content: comment,
        author: new toId(id),
    });
    const post = await UserPost.findById({
        _id: new toId(postRefId),

    })
    post?.comments.push(newComment._id);
    await post?.save();

    return { error: false, message: "Comment Created", createdComment: newComment };
})
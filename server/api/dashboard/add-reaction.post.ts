import mongoose from "mongoose";
import UserPost from "~~/server/models/UserPost.model";
import UserModel from "~~/server/models/User.model";
import ReactionModel from "~~/server/models/Reactions.model";

const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const theReaction = body.theReaction;
    const postIden = body.statusId;
    const postId = new toId(postIden);
    const id:any = await useStorage().getItem("user");
    const myId = new toId(id);

    // check if user has already reacted to post
    const checkReaction = await ReactionModel.findOne({
        postReactedTo: postIden,
        from: id
    })

    if (checkReaction) {
        console.log('reaction already exists, deleting reaction')
        const deleteReaction = await ReactionModel.findOneAndDelete({
            _id: checkReaction._id
        })
    }

    
    const newReaction = await new ReactionModel({
    reactionType: theReaction,
    postReactedTo: postId,
    userId: body.userId,
    from: myId
    }).save();

    const updatePost = await UserPost.findOneAndUpdate({
        _id: postId
    }, {
        $push: {
            reactions: newReaction._id
        }
    }, {
        new: true
    })

    const updateMe = await UserModel.findOneAndUpdate({
        _id: body.userId
    }, {
        $push: {
            reactions: newReaction._id
        }
    }, {
        new: true
    })

  return newReaction;
});

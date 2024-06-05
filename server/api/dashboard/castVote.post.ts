import mongoose from "mongoose";
import UserPost from "~~/server/models/UserPost.model";
import UserModel from "~~/server/models/User.model";
import PollModel from "~~/server/models/PollModel.model";

const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id:any = await useStorage().getItem("user");

    // Find Poll and update the votes and the voters

    const poll = await PollModel.findOneAndUpdate(
        {
            _id: new toId(body.pollId),
            "options._id": new toId(body._id)
        },
        {
            $inc: {
                "options.$.votes": 1
            },
            $push: {
                votedBy: new toId(id)
            }
        },
        {
            new: true
        }
    )


    return poll
})
import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const id:any = await useStorage().getItem("user");

    // Get suggested people but not the current user and not already friends

    const suggestedPeople = await UserModel.aggregate([
// Match where the id is not equal to the current user id and not already friends in friends property
        {
            $match: {
                _id: {
                    $ne: new toId(id)
                },
                friends: {
                    $nin: [new toId(id)]
                }
            }
        },
        {
            $limit: 3
        },
        {
            $project: {
                username: 1,
                profilePicture: 1,
                name: 1,
                handleName: 1
            }
        }
    ])



    return suggestedPeople;
})
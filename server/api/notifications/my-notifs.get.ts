import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
import NotificationModel from "~~/server/models/Notif.model";


const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
    const id:any = await useStorage().getItem("user");
     const findNotifications = 
     await UserModel.findOne({ _id: new toId(id) })
    .populate({ 
        path: "notifications", 
        model: NotificationModel,
        populate: { path: "from", 
            model: UserModel,
            select: ["username", "coverPicture", "profilePicture", "handleName"] }, 
        options: { sort: { createdAt: -1 },} })
        .select("username")
    // const findNotifications = 
    // await UserModel.aggregate([
    //     {
    //       $match: { _id: new toId(id) }
    //     },
    //     {
    //       $lookup: {
    //         from: "notificationmodels", // replace with the actual collection name
    //         localField: "notifications",
    //         foreignField: "_id",
    //         as: "notifications"
    //       }
    //     },
    //     // Populate the 'from' field and sort the notifications by createdAt
    //     // {
    //     //     $unwind: "$notifications"
    //     // },
    //     // },
    //     // {
    //     //   $unwind: "$notifications"
    //     // },
    //     // {
    //     //   $lookup: {
    //     //     from: "users", // replace with the actual collection name
    //     //     localField: "notifications.from",
    //     //     foreignField: "_id",
    //     //     as: "notifications.from"
    //     //   }
    //     // },
    //     // {
    //     //   $sort: { "notifications.createdAt": -1 }
    //     // },
    //     // {
    //     //   $project: {
    //     //     username: 1,
    //     //     notifications: {
    //     //       _id: 1,
    //     //       createdAt: 1,
    //     //       type: 1,
    //     //       from: {
    //     //         $arrayElemAt: ["$notifications.from", 0]
    //     //       }
    //     //     }
    //     //   }
    //     // }
    //   ]);
      


    if(findNotifications) {
        return findNotifications.notifications
    } else {
        return []
    }
});

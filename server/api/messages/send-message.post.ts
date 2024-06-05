import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
import NotificationModel from "~~/server/models/Notif.model";
import MessageContentModel from "~~/server/models/MessageContent.model";
import ConversationModel from "~~/server/models/Conversation.model";


const toId = mongoose.Types.ObjectId;


export default defineEventHandler(async (event) => {
    const id:any = await useStorage().getItem("user");
    const myId = new toId(id);
    const body = await readBody(event);
    let toUserId;
    const {message, to} = body;
    if(body.to.length <= 20) {
        const userId = await UserModel.findOne({ handleName: body.to})
        toUserId = new toId(userId?._id);
    } else {
    toUserId = new toId(to);
    }
     const messageContentToUser = await new MessageContentModel({
        content: message,
        owner: myId,
        recipient: toUserId
    }).save();

    // see if conversation exists
    const conversation = await ConversationModel.findOne({
        users: { $all: [myId, toUserId] }
    });


    if (conversation) {
        // set latestMessage
        const updateConversation = await ConversationModel.findOneAndUpdate(
            { _id: conversation._id },
            { latestMessage: message,
              from: myId, },
            { new: true }
        );
    } else {
        // create new conversation
        const newConversation = await new ConversationModel({
            users: [myId, toUserId],
            latestMessage: message,
            from: myId,
        }).save();
        // update both users with new conversation
        await UserModel.findOneAndUpdate(
            { _id: myId },
            { $push: { conversations: new toId(newConversation._id) } }
        );
        const updateUser = await UserModel.findOneAndUpdate(
            { _id: toUserId },
            { $push: { conversations: new toId(newConversation._id) } }
        );
    }
    const newNotificationForUser = await new NotificationModel({
        title: "New message!",
        content: "Check your messages",
        type: "newMessageRecieved",
        from: myId,
    }).save();

    const addNotif = await UserModel.updateOne({ _id: toUserId }, { $push: { notifications: new toId(newNotificationForUser._id) },
    $inc: { notificationCount: 1 } });


    const options = {
        myId,
        toUserId,
    }

    return null;
        });

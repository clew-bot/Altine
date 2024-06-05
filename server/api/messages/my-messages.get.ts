import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
import MessageContentModel from "~~/server/models/MessageContent.model";
import ConversationModel from "~~/server/models/Conversation.model";
const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
  const id: any = await useStorage().getItem("user");
  const myId = new toId(id);

  const checkIfConversationExists = await MessageContentModel.findOne({
    users: { $all: [myId, toId] },
  });

  if (checkIfConversationExists) {
    const getMyConversations = await UserModel.findOne({ _id: myId })
      .populate({
        path: "conversations",
        model: ConversationModel,
        populate: {
          path: "users from",
          model: UserModel,
        },
      })
      .select("conversations")
      .sort({ createdAt: -1 });

    // splice out the element with my id in the users array
    getMyConversations?.conversations.forEach((conversation) => {
      conversation.users.splice(
        conversation.users.findIndex(
          (user: any) => user._id.toString() === myId.toString()
        ),
        1
      );
    });

    // sort the conversations by the last message sent

    return { getMyConversations };
  } else {
    return "Hi";
  }
});

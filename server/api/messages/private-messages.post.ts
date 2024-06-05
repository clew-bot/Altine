import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
import MessageContentModel from "~~/server/models/MessageContent.model";

const toId = mongoose.Types.ObjectId;

export default defineEventHandler(async (event) => {
  const id: any = await useStorage().getItem("user");
  const myId = new toId(id);
  const body = await readBody(event);

  // find id of user 
  const theUser = await UserModel.findOne({ handleName: body }).select('_id');

// find messages from me to user
const messagesToUser = await MessageContentModel.aggregate([
  { $match: { owner: myId, recipient: theUser?._id } },
  { $sort: { createdAt: -1 } },
  { $limit: 4 },
  { $lookup: { from: 'users', localField: 'owner', foreignField: '_id', as: 'owner' } },
  { $lookup: { from: 'users', localField: 'recipient', foreignField: '_id', as: 'recipient' } },
  { $unwind: '$owner' },
  { $unwind: '$recipient' },
]);

// find messages from user to me
const messagesFromUser = await MessageContentModel.aggregate([
  { $match: { owner: theUser?._id, recipient: myId } },
  { $sort: { createdAt: -1 } },
  { $limit: 4 },
  { $lookup: { from: 'users', localField: 'owner', foreignField: '_id', as: 'owner' } },
  { $lookup: { from: 'users', localField: 'recipient', foreignField: '_id', as: 'recipient' } },
  { $unwind: '$owner' },
  { $unwind: '$recipient' },
]);

// combine messages
const allMessages = [...messagesToUser, ...messagesFromUser];

// add userID property 

// sort messages by date
allMessages.sort((a: any, b: any) => {
  return a.createdAt - b.createdAt;
});



return allMessages;

  
});

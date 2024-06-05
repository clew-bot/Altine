import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";
import UserPost from "~~/server/models/UserPost.model";
import PollModel from "~~/server/models/PollModel.model";
const toId = mongoose.Types.ObjectId;
import jwt from 'jsonwebtoken';


export default defineEventHandler(async (event) => {
    
    // const body = await readBody(event);
    // console.log('thebody', body)
    // let perPage = 10; 
    // let page = Math.max(0, body);
    // const id:any = await useStorage().getItem("user");
    // console.log(id)
    // const getPosts = await UserPost.find({}).populate('author', ['username', 'handleName', 'profilePicture']).sort({createdAt: -1}).limit(perPage).skip(perPage * page).exec();
    // return getPosts;
    const body = await readBody(event);
    let perPage = 10;
    let page = Math.max(0, body);
    const id:any = await useStorage().getItem("user");

    // return user;
    const user = await UserModel.findOne({ _id: new toId(id) })
    .populate({
      path: "posts",
      model: UserPost,
      populate: [
        { path: "author", model: UserModel },
        { path: "poll", model: PollModel } // Add this line to populate the polls property inside posts
      ],
      options: { sort: { createdAt: -1 } }
    });
  
  if (user?.pinnedPost) {
    await user?.populate({
      path: 'pinnedPost',
      model: UserPost,
      populate: [
        { path: 'author', model: UserModel },
        { path: 'poll', model: PollModel } // Add this line to populate the polls property inside pinnedPost
      ]
    });
  }

  return user;
  
   
})
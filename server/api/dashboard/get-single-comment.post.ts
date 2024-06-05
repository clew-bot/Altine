import mongoose from "mongoose";
import UserPost from "~~/server/models/UserPost.model";

const toId = mongoose.Types.ObjectId;
import jwt from 'jsonwebtoken';


export default defineEventHandler(async (event) => {
    const getPosts = await UserPost.find({}).populate('author', ['username', 'handleName']).sort({createdAt: -1}).exec();
    return getPosts;
})
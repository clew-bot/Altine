import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";

const toId = mongoose.Types.ObjectId;
import jwt from 'jsonwebtoken';


export default defineEventHandler(async (event) => {
    return "Hello World";
})
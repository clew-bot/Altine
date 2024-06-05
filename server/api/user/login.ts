import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";

import bcrypt from "bcrypt";
const toId = mongoose.Types.ObjectId;
import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const userExist: any = await UserModel.findOne({
        $or: [{ username: body.username }, { email: body.username }],
    });

    if(userExist === null) {
        return { error: true, message: "User does not exist"};
    } else {
        const passwordMatch = await bcrypt.compare(body.password, userExist?.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: userExist._id }, config.JWT_SECRET, {
                expiresIn: 43200, // 24 hours
            });
            setCookie(event, "altine", token);
            useStorage().setItem("user", userExist._id);
            useStorage().setItem("profilePic", userExist.profilePicture);


            return { error: false, message: "Nice", name: userExist.handleName, email: userExist.email };
            } else {
                console.log("Wrong Password! 🤬");
                return { error: true, message: "Wrong Password" };
            }
    }
})
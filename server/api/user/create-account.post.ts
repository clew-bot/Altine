import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";

const toId = mongoose.Types.ObjectId;
import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();
interface CreateAccountPostBody {
    username: string;
    email: string;
    password: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const userExist = await UserModel.findOne({
        $or: [{ username: body.username }, { email: body.email }],
    });
    let r = (Math.random() + 1).toString(36).substring(7);

    if (userExist === null) {
        const newUser = await UserModel.create({
                username: body.username,
                email: body.email,
                password: body.password,
                handleName: 'user' + r.toString(),
                location: 'Earth',
                birthday: body.birthday
            });
        const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, {
            expiresIn: 43200, // 12 hours
        });
        setCookie(event, "altine", token);
        useStorage().setItem("user", newUser._id);

        return token
    } else {
        return { error: true, message: `User Already Exists`, };
    }
})
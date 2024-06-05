import mongoose from "mongoose";

const toId = mongoose.Types.ObjectId;


export default defineEventHandler(async (event) => {
    const id:any = await useStorage().getItem("user");
    const myId = new toId(id);
    const body = await readBody(event);
    const {message, to} = body;
    const toUserId = new toId(to);

    return "hi"

    
});

import mongoose from "mongoose";
import UserModel from "~~/server/models/User.model";

import { builtinModules } from "module";
import { type } from "os";

export default defineEventHandler(async (event) => {
    const imageReader = await readBody(event);

    const response = await $fetch('https://thumbsnap.com/api/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },

});
    // console.log(response.media)
});
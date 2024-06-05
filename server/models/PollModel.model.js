import mongoose from "mongoose";
import UserModel from "./User.model";
const PollModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // poll: {
    //     type: Object,
    //     required: true,
    // },
    options: [
      {
        label: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
    votes: {
      type: Array,
      default: [],
      ref: UserModel,
    },
    votedBy: {
      type: Array,
      default: [],
      ref: UserModel,
    },
  },
  { timestamps: true }
);

const PollModel = mongoose.model("PollModels", PollModelSchema);
export default PollModel;

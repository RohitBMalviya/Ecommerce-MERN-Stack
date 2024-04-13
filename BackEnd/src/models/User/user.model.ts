import mongoose from "mongoose";
import { UserID } from "../../interface/interface.js";

const userSchema: mongoose.Schema<UserID> = new mongoose.Schema<UserID>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 2,
      maxlength: 10,
    },
    confirm_password: {
      type: String,
      required: [true, "Confirm Password is required"],
      minlength: 2,
      maxlength: 10,
    },
  },
  { timestamps: true }
);

export const User: mongoose.Model<UserID> = mongoose.model("User", userSchema);

import mongoose from "mongoose";
import { UserID } from "../../interface/interface.js";
import Validator from "validator";

const userSchema: mongoose.Schema<UserID> = new mongoose.Schema<UserID>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: [4, "Username required atleast 4 character"],
      maxlength: [30, "Username Should not exceed more than 30"],
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate: [Validator.isEmail, "Enter a valid Email ID"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password should have 8 min characters"],
      maxlength: [16, "Password should not be greater than 16 characters"],
      select: false,
    },
    confirm_password: {
      type: String,
      required: [true, "Confirm Password is required"],
      minlength: [8, "Password should have 8 min characters"],
      maxlength: [16, "Password should not be greater than 16  characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    refreshTokenExpiry: Date,
  },
  { timestamps: true }
);

export const User: mongoose.Model<UserID> = mongoose.model("User", userSchema);

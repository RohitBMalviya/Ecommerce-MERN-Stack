import mongoose from "mongoose";
import { UserID } from "../../interface/interface.js";
import Validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
      select: true,
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
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 8);
  this.confirm_password = await bcrypt.hash(this.confirm_password!, 8);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESSTOKENKEY!,
    {
      expiresIn: process.env.ACCESSTOKENEXPIRY!,
    }
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESHTOKENKEY!,
    {
      expiresIn: process.env.REFRESHTOKENEXPIRY!,
    }
  );
};

userSchema.methods.generateResetPassword = function (): string {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
export const User: mongoose.Model<UserID> = mongoose.model("User", userSchema);

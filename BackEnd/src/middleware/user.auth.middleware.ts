import { Request, Response, NextFunction } from "express";
import ApiError from "../util/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User/user.model.js";
import { ExtendJwtPayload } from "../interface/interface.js";
import PromiseHandler from "../util/PromiseHandler.js";

export const verifyToken = PromiseHandler(async (request, _response, next) => {
  try {
    // ***** Get token and check token exist ***** //
    const token =
      (await request.cookies?.accessToken) ||
      request.header("Authorization")?.replace("Bearer", "");
    if (token === "0") {
      return next(new ApiError(401, "UnAuthorized Request"));
    }

    // ***** Decode the Token ***** //
    const decodeToken = jwt.verify(
      token,
      process.env.ACCESSTOKENKEY!
    ) as ExtendJwtPayload;

    // ***** Find the User ***** //
    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return next(new ApiError(401, "User not Found"));
    }

    // ***** Add the user in Request next for middleware ***** //
    request.user = user;
    next();
  } catch (error: any) {
    return next(new ApiError(401, error?.message || "Invalide Access Token"));
  }
});

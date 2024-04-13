import ApiResponse from "../util/ApiResponse.js";
import { UserID } from "../interface/interface.js";
import { User } from "../models/user.model.js";
import PromiseHandler from "../util/PromiseHandler.js";

export const userRegister = PromiseHandler(async (request, response) => {
  response.send({ message: "UserRegister Controller" });
});

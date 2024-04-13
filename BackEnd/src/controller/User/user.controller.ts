import ApiResponse from "../../util/ApiResponse.js";
import { UserID } from "../../interface/interface.js";
import { User } from "../../models/User/user.model.js";
import PromiseHandler from "../../util/PromiseHandler.js";

export const userRegister = PromiseHandler(async (request, response) => {
  const { username, email, password, confirm_password } = request.body;
  response.send({ message: "UserRegister Controller" });
});

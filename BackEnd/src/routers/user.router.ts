import { Router } from "express";
import { userRegister } from "../controller/user.controller.js";

const userRouter: Router = Router();

userRouter.route("/register").post(userRegister);

export default userRouter;

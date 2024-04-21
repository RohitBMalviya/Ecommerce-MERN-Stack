import { Router } from "express";
import {
  userLogin,
  userRegister,
} from "../../controller/User/user.controller.js";
import { upload } from "../../middleware/multer.middleware.js";

const userRouter: Router = Router();

userRouter.route("/register").post(upload.single("avatar"), userRegister);
userRouter.route("/login").post(userLogin);

export default userRouter;

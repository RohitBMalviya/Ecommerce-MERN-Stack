import { Router } from "express";
import {
  getCurrentUser,
  refreshAccessToken,
  updatePassword,
  updateUserInfo,
  userLogin,
  userLogout,
  userRegister,
} from "../../controller/User/user.controller.js";
import { upload } from "../../middleware/multer.middleware.js";
import { verifyToken } from "../../middleware/user.auth.middleware.js";

const userRouter: Router = Router();

userRouter.route("/register").post(upload.single("avatar"), userRegister);
userRouter.route("/login").post(userLogin);
userRouter.route("/logout").post(verifyToken, userLogout);
userRouter.route("/updatepassword").post(verifyToken, updatePassword);
userRouter.route("/updateuserinfo").patch(verifyToken, updateUserInfo);
userRouter.route("/getcurrentuser").get(verifyToken, getCurrentUser);
userRouter.route("/refreshaccesstoken").post(refreshAccessToken);

export default userRouter;

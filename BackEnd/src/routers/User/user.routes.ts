import { Router } from "express";
import {
  deleteUserInfo,
  getAllUser,
  getCurrentUser,
  getSingleUser,
  refreshAccessToken,
  updatePassword,
  updateUserInfo,
  updateUserRole,
  userForgotPassword,
  userLogin,
  userLogout,
  userRegister,
  userResetPassword,
} from "../../controller/User/user.controller.js";
import { upload } from "../../middleware/multer.middleware.js";
import { verifyToken } from "../../middleware/user.auth.middleware.js";
import { authorizedRole } from "../../middleware/admin.auth.middleware.js";

const userRouter: Router = Router();

userRouter.route("/register").post(upload.single("avatar"), userRegister);
userRouter.route("/login").post(userLogin);
userRouter.route("/forgotpassword").post(userForgotPassword);
userRouter.route("/resetpassword/:token").patch(userResetPassword);
userRouter.route("/logout").post(verifyToken, userLogout);
userRouter.route("/updatepassword").post(verifyToken, updatePassword);
userRouter.route("/updateuserinfo").patch(verifyToken, updateUserInfo);
userRouter.route("/getcurrentuser").get(verifyToken, getCurrentUser);
userRouter.route("/refreshaccesstoken").post(refreshAccessToken);

// Admin Access
userRouter
  .route("/admin/getalluser")
  .get(verifyToken, authorizedRole("admin"), getAllUser);
userRouter
  .route("/admin/getsingleuser/:id")
  .get(verifyToken, authorizedRole("admin"), getSingleUser);
userRouter
  .route("/admin/updateuserrole/:id")
  .patch(verifyToken, authorizedRole("admin"), updateUserRole);
userRouter
  .route("/admin/deleteuserinfo/:id")
  .delete(verifyToken, authorizedRole("admin"), deleteUserInfo);
export default userRouter;

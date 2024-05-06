import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  readAllOrder,
  updateOrder,
  readUserSingleOrder,
  readUserAllOrder,
  readSingleOrder,
  updateOrderStatus,
} from "../../controller/Order/order.controller.js";
import { verifyToken } from "../../middleware/user.auth.middleware.js";
import { authorizedRole } from "../../middleware/admin.auth.middleware.js";

const orderRouter: Router = Router();

orderRouter.route("/createorder").post(verifyToken, createOrder);
orderRouter.route("/readallorder").get(verifyToken, readAllOrder);
orderRouter.route("/readsingleorder/:id").get(verifyToken, readSingleOrder);
orderRouter.route("/updateorder").patch(verifyToken, updateOrder);

// Admin Access
orderRouter
  .route("/admin/readusersingleorder/:id")
  .get(verifyToken, authorizedRole("admin"), readUserSingleOrder);
orderRouter
  .route("/admin/readuserallorder")
  .get(verifyToken, authorizedRole("admin"), readUserAllOrder);
orderRouter
  .route("/admin/updateorderstatus/:id")
  .patch(verifyToken, authorizedRole("admin"), updateOrderStatus);

orderRouter
  .route("/admin/deleteorder/:id")
  .delete(verifyToken, authorizedRole("admin"), deleteOrder);

export default orderRouter;

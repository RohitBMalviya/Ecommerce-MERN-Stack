import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  readSingleOrder,
  readallOrder,
  updateOrder,
} from "../../controller/Order/order.controller.js";
import { verifyToken } from "../../middleware/user.auth.middleware.js";

const orderRouter: Router = Router();

orderRouter.route("/createorder").post(verifyToken, createOrder);
orderRouter.route("/readallorder").get(verifyToken, readallOrder);
orderRouter.route("/readsingleorder").get(verifyToken, readSingleOrder);
orderRouter.route("/updateorder").patch(verifyToken, updateOrder);
orderRouter.route("/deleteorder").delete(verifyToken, deleteOrder);

export default orderRouter
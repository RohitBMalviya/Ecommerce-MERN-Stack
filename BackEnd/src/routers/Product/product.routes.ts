import { Router } from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  deleteReview,
  readallProduct,
  readsingleProduct,
  singleProductAllReview,
  updateProduct,
} from "../../controller/Product/product.controller.js";
import { verifyToken } from "../../middleware/user.auth.middleware.js";
import { authorizedRole } from "../../middleware/admin.auth.middleware.js";

const productRouter = Router();

productRouter.route("/readallproduct").get(readallProduct);
productRouter.route("/readsingleproduct/:id").get(readsingleProduct);
productRouter.route("/readsingleproductreview").get(singleProductAllReview);
productRouter.route("/createreview").patch(verifyToken, createReview);
productRouter.route("/deletereview").delete(verifyToken, deleteReview);

// Admin Access
productRouter
  .route("/admin/createproduct")
  .post(verifyToken, authorizedRole("admin"), createProduct);
productRouter
  .route("/admin/updateproduct/:id")
  .patch(verifyToken, authorizedRole("admin"), updateProduct);
productRouter
  .route("/admin/deleteproduct/:id")
  .delete(verifyToken, authorizedRole("admin"), deleteProduct);

export default productRouter;

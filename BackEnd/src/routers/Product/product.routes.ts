import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  readallProduct,
  readsingleProduct,
  updateProduct,
} from "../../controller/Product/product.controller.js";
import { verifyToken } from "../../middleware/user.auth.middleware.js";
import { authorizedRole } from "../../middleware/admin.auth.middleware.js";

const productRouter = Router();

productRouter.route("/readallproduct").get(readallProduct);
productRouter.route("/readsingleproduct/:id").get(readsingleProduct);
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

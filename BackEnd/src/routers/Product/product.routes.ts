import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  readallProduct,
  readsingleProduct,
  updateProduct,
} from "../../controller/Product/product.controller.js";
import { Error } from "../../middleware/error.middleware.js";

const productRouter = Router();

productRouter.route("/createproduct").post(createProduct);
productRouter.route("/readallproduct").get(readallProduct);
productRouter.route("/readsingleproduct/:id").get(readsingleProduct);
productRouter.route("/updateproduct/:id").patch(updateProduct);
productRouter.route("/deleteproduct/:id").delete(deleteProduct);

export default productRouter;

import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  readProduct,
  updateProduct,
} from "../../controller/Product/product.controller.js";

const productRouter = Router();

productRouter.route("/createproduct").post(createProduct);
productRouter.route("/readproduct").get(readProduct);
productRouter.route("/updateproduct/:id").patch(updateProduct);
productRouter.route("/deleteproduct/:id").delete(deleteProduct);

export default productRouter;

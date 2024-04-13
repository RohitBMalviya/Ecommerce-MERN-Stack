import ApiResponse from "../../util/ApiResponse.js";
import ApiError from "../../util/ApiError.js";
import PromiseHandler from "../../util/PromiseHandler.js";
import { Product } from "../..//models/Product/product.model.js";
import { log } from "console";

// For the Admin Only
export const createProduct = PromiseHandler(async (request, response) => {
  const productDetail = request.body;

  const productCreated = await Product.create(productDetail);

  return response
    .status(201)
    .json(new ApiResponse(201, productCreated, "Product Created Successfully"));
});

export const readProduct = PromiseHandler(async (_request, response) => {
  const ProductGet = await Product.find();

  if (!ProductGet?.length) {
    throw new ApiError(400, "No Product Empty");
  }

  return response
    .status(201)
    .json(new ApiResponse(201, ProductGet, "Product Fetch Successfully"));
});

// For the Admin Only
export const updateProduct = PromiseHandler(async (request, response) => {
  const productToUpdate = request.body;
  const productId = request.params.id;

  const checkProduct = await Product.findById(productId);

  if (!checkProduct) {
    throw new ApiError(500, "Product not Found");
  }

  const productUpdate = await Product.findByIdAndUpdate(
    productId,
    {
      $set: productToUpdate,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return response
    .status(200)
    .json(new ApiResponse(200, productUpdate, "Product Update Successfully"));
});

// For the Admin Only

export const deleteProduct = PromiseHandler(async (request, response) => {
  const productId = request.params.id;

  if (!productId) {
    throw new ApiError(500, "Product Does not Exists");
  }

  await Product.findByIdAndDelete(productId);

  return response
    .status(200)
    .json(new ApiResponse(200, {}, "Product Deleted Successfully"));
});

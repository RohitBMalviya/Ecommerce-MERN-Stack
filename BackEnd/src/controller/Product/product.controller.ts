import ApiResponse from "../../util/ApiResponse.js";
import ApiError from "../../util/ApiError.js";
import PromiseHandler from "../../util/PromiseHandler.js";
import { Product } from "../..//models/Product/product.model.js";
import ApiFeatures from "../../util/ApiFeatures.js";

// For the Admin Only * Create or Insert Product *
export const createProduct = PromiseHandler(async (request, response, next) => {
  const productDetail = request.body;

  const productCreated = await Product.create(productDetail);

  if (!productCreated) {
    return next(
      new ApiError(
        500,
        "Something Went Wrong While Inserting Detail of Product"
      )
    );
    // return response
    //   .status(400)
    //   .json(
    //     new ApiError(
    //       400,
    //       "Something Went Wrong While Inserting Detail of Product"
    //     )
    //   );
    // throw new ApiError(
    //   400,
    //   "Something Went Wrong While Inserting Detail of Product"
    // );
  }

  return response
    .status(201)
    .json(new ApiResponse(201, productCreated, "Product Created Successfully"));
});

// Read All Product
export const readallProduct = PromiseHandler(
  async (request, response, next) => {
    const apiFeature = new ApiFeatures(Product.find(), request.query)
      .Search()
      .filter();
    const ProductGet = await apiFeature.query;

    if (!(ProductGet?.length && ProductGet)) {
      return next(
        new ApiError(404, "Empty Product or Product does not Exists")
      );
      // return response
      //   .status(404)
      //   .json(new ApiError(404, "Empty Product or Product does not Exists"));
      // throw new ApiError(404, "Empty Product or Product does not Exists");
    }

    return response
      .status(201)
      .json(new ApiResponse(201, ProductGet, "All Product Fetch Successfully"));
  }
);

// Read Single Product
export const readsingleProduct = PromiseHandler(
  async (request, response, next) => {
    const productId = request.params.id;

    const productDeatail = await Product.findById(productId);

    if (!productDeatail) {
      return next(new ApiError(404, "Product does not Exist"));
      // return response
      //   .status(404)
      //   .json(new ApiError(404, "Product does not Exist"));
      // throw new ApiError(404, "Product does not Exist");
    }
    return response
      .status(200)
      .json(new ApiResponse(200, productDeatail, "Product Fetch Successfully"));
  }
);

// For the Admin Only * Update Product *
export const updateProduct = PromiseHandler(async (request, response, next) => {
  const productToUpdate = request.body;
  const productId = request.params.id;

  const checkProduct = await Product.findById(productId);

  if (!checkProduct) {
    return next(new ApiError(404, "Product not Found"));
    // return response.status(404).json(new ApiError(404, "Product not Found"));
    // throw new ApiError(404, "Product not Found");
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

// For the Admin Only * Delete Product *
export const deleteProduct = PromiseHandler(async (request, response, next) => {
  const productId = request.params.id;

  const checkProduct = await Product.findById(productId);

  if (!checkProduct) {
    return next(new ApiError(404, "Product Already Deleted"));
    // return response
    //   .status(404)
    //   .json(new ApiError(404, "Product Already Deleted"));
    // throw new ApiError(404, "Product Already Deleted");
  }

  await Product.findByIdAndDelete(productId);

  return response
    .status(200)
    .json(new ApiResponse(200, {}, "Product Deleted Successfully"));
});

// 1) return next(new ApiError(404, "Product does not Exist"));-----------------> Middleware Error
// 2) return response.status(404).json(new ApiError(404, "Product does not Exist"));-----------------> Response Error
// 3) throw new ApiError(404, "Product does not Exist");----------------------------> Error Throw

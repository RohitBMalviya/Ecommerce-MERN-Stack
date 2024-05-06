import ApiResponse from "../../util/ApiResponse.js";
import ApiError from "../../util/ApiError.js";
import PromiseHandler from "../../util/PromiseHandler.js";
import { Product } from "../..//models/Product/product.model.js";
import ApiFeatures from "../../util/ApiFeatures.js";
import { ProductID, Reviews } from "../../interface/interface.js";

// For the Admin Only * Create or Insert Product *
export const createProduct = PromiseHandler(async (request, response, next) => {
  request.body.user = request.user._id;

  const productDetail = request.body;

  // ***** First Create And check the Product Created ***** //
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
    // ***** Fetch All Product by Serach,Filter and Also add the Pagination ***** //
    const resultPerPage: number = 5;
    const productCount: number = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), request.query)
      .Search()
      .filter()
      .pagination(resultPerPage);

    // ***** Check the Product Exists or Not? ***** //
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
      .json(
        new ApiResponse(
          201,
          { Product: ProductGet, ProductCount: productCount },
          "All Product Fetch Successfully"
        )
      );
  }
);

// Read Single Product
export const readsingleProduct = PromiseHandler(
  async (request, response, next) => {
    const productId = request.params.id;

    // ***** Fetch the Product Single ***** //
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

  // ***** To check the Product Exist if Exist the Update the Product ***** //
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

  // ***** To check the Product Exist if Exist then Delete the Product ***** //
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

// Create or Update the Reviews
export const createReview = PromiseHandler(async (request, response, next) => {
  const { rating, comment, productId }: Reviews = request.body;
  const reviews: Reviews = {
    user: request.user._id,
    name: request.user.username,
    rating: rating,
    comment: comment,
    productId: productId,
  };

  // ***** To check the Product Exist if Exist the Update the Review ***** //
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ApiError(404, "Product Not Found"));
  }
  const isReviewed = product.reviews.find((review): boolean => {
    return review.user.toString() === request.user._id.toString();
  });
  if (isReviewed) {
    product.reviews?.forEach((review) => {
      if (review.user.toString() === request.user._id.toString()) {
        (review.rating = rating), (review.comment = comment);
      }
    });
  } else {
    product.reviews?.push(reviews);
    product.noOfreview = product.reviews.length;
  }

  // ***** To update the average Ratings of particular Product ***** //
  let Average = 0;
  product.reviews.forEach((review): void => {
    Average += review.rating;
  });
  product.ratings = Average / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  return response
    .status(200)
    .json(
      new ApiResponse(
        200,
        product,
        "Product Review is Created Or Updated Successfully !!!"
      )
    );
});

// Read Single Reviews
export const singleProductAllReview = PromiseHandler(
  async (request, response, next) => {
    // ***** To check the Product Exist ***** //
    const productId = await Product.findById(request.query.productId);
    if (!productId) {
      return next(new ApiError(404, "Product Not Found"));
    }

    return response
      .status(200)
      .json(
        new ApiResponse(
          200,
          productId.reviews,
          "Single Product Review Fetch Successfully !!!"
        )
      );
  }
);

// Delete Single Reviews
export const deleteReview = PromiseHandler(async (request, response, next) => {
  // ***** To check the Product Exist if Exist then Delete the Review ***** //
  const product = await Product.findById(request.query.productId);
  if (!product) {
    return next(new ApiError(404, "Product Already Deleted"));
  }
  const reviews: Reviews[] = await product.reviews.filter(
    (review) => review._id!.toString() !== request.query.reviewId?.toString()
  );

  // ***** To update the average Ratings of particular Product ***** //
  let Average = 0;
  reviews.forEach((review): void => {
    Average += review.rating;
  });
  let ratings;
  if (reviews.length < 1) {
    ratings = 0;
  } else {
    ratings = Average / reviews.length;
  }

  const noOfreview = reviews.length;

  await Product.findByIdAndUpdate(
    request.query.productId,
    {
      $set: {
        ratings: ratings,
        reviews: reviews,
        noOfreview: noOfreview,
      },
    },
    { new: true }
  );

  return response
    .status(200)
    .json(
      new ApiResponse(200, {}, "Single Product Review Deleted Successfully !!!")
    );
});
// 1) return next(new ApiError(404, "Product does not Exist"));-----------------> Middleware Error
// 2) return response.status(404).json(new ApiError(404, "Product does not Exist"));-----------------> Response Error
// 3) throw new ApiError(404, "Product does not Exist");----------------------------> Error Throw

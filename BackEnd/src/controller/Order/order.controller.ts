import { Order } from "../../models/Order/order.model.js";
import PromiseHandler from "../../util/PromiseHandler.js";
import ApiError from "../../util/ApiError.js";
import ApiResponse from "../../util/ApiResponse.js";
import { OrderID } from "../../interface/interface.js";
import { Product } from "../../models/Product/product.model.js";

async function updatestock(productId: Object, quantity: number) {
  // ***** To check the Product exist or update the stock with quantity ***** //
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product Not Found");
  }
  product.stock -= quantity;
  await product.save();
}

export const createOrder = PromiseHandler(async (request, response, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  }: OrderID = request.body;

  // ***** First Create And check the Order Created ***** //
  const userOrder = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    paidAt: Date.now(),
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: request.user._id,
  });
  const order = await Order.findById(userOrder._id);
  if (!order) {
    next(new ApiError(500, "Something went wrong while Creating the Order"));
  }
  response
    .status(201)
    .json(new ApiResponse(201, order, "Order Place Successfully !!!"));
});

export const readAllOrder = PromiseHandler(async (request, response, next) => {
  // ***** To check the order Exist or not? ***** //
  const orders = await Order.find({ user: request.user._id });
  if (!orders) {
    return next(new ApiError(404, "Order Not Found"));
  }
  response
    .status(200)
    .json(new ApiResponse(200, orders, "All Order Fetch Successfully !!!"));
});

export const readSingleOrder = PromiseHandler(
  async (request, response, next) => {
    const orderId = request.params.id;

    // ***** To check order Fetch or not ? ***** //
    const order = await Order.findById(orderId).populate(
      "user",
      "username email -password"
    );
    if (!order) {
      return next(new ApiError(404, "Order of this Id is Not Found"));
    }
    response
      .status(200)
      .json(new ApiResponse(200, order, "Order Fetch Successfully !!!"));
  }
);

// For Admin to See All User Order
export const readUserAllOrder = PromiseHandler(
  async (_request, response, next) => {
    // ***** To check the order Exist or not? ***** //
    const orders = await Order.find();
    if (!orders) {
      return next(new ApiError(404, "Order Not Found"));
    }
    // ***** Show Total Amount of All Order Product ***** //
    let totalAmount: number = 0;
    orders.forEach((orders: OrderID) => {
      totalAmount += Number(orders.totalPrice);
    });
    response
      .status(200)
      .json(
        new ApiResponse(
          200,
          { orders, TotalAmount: totalAmount },
          "All Order Fetch Successfully !!!"
        )
      );
  }
);

// For Admin to See Single User Order
export const readUserSingleOrder = PromiseHandler(
  async (request, response, next) => {
    const userId = request.params.id;

    // ***** To check order Fetch or not ? and Populate means to refers the other database to check for example the user with email  "user": "userId", without Populate & "user": {"_id": "userId","email": "userEmail"} with Populate in response you can see,***** //
    const order = await Order.find({ user: userId }).populate(
      "user",
      "username email -password"
    );
    if (!order) {
      return next(new ApiError(404, "Order of this Id is Not Found"));
    }
    response
      .status(200)
      .json(new ApiResponse(200, order, "Order Fetch Successfully !!!"));
  }
);

export const updateOrder = PromiseHandler(
  async (_request, _response, _next) => {}
);

// For Admin to update Shipping Status
export const updateOrderStatus = PromiseHandler(
  async (request, response, next) => {
    const { status } = request.body;
    const orderId = request.params.id;

    // ***** To check order Fetch or not? and check if shipping status is Delivered or not? ***** //
    const order = await Order.findById(orderId);
    if (!order) {
      return next(new ApiError(404, "Order of this Id is Not Found"));
    }
    if (order.shippingStatus === "Delivered") {
      return next(new ApiError(400, "The Order is Delivered Already"));
    }

    // ***** Update the stock in product Section and Shipping status ***** //
    order.orderItems.forEach(async (order) => {
      await updatestock(order.product, order.quantity);
    });
    const orderStatus = await Order.findByIdAndUpdate(
      order._id,
      {
        $set: { shippingStatus: status },
      },
      { new: true }
    );
    if (status === "Delivered") {
      order.deliverdAt = Date.now();
    }
    response
      .status(200)
      .json(
        new ApiResponse(
          200,
          orderStatus,
          "Order Status Updated Successfully !!!"
        )
      );
  }
);

export const deleteOrder = PromiseHandler(async (request, response, next) => {
  // ***** To check the order deleted or not? ***** //
  const order = await Order.findById(request.params.id);
  if (!order) {
    return next(new ApiError(400, "Order Already Deleted"));
  }

  // ***** Delete the Order ***** //
  await Order.findByIdAndDelete(order._id);
  response
    .status(200)
    .json(new ApiResponse(200, {}, "Order Deleted Successfully !!!"));
});

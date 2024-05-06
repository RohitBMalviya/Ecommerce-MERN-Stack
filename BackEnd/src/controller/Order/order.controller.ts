import { Order } from "../../models/Order/order.model.js";
import PromiseHandler from "../../util/PromiseHandler.js";
import ApiError from "../../util/ApiError.js";
import ApiResponse from "../../util/ApiResponse.js";
import { OrderID } from "../../interface/interface.js";

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

export const readallOrder = PromiseHandler(
  async (_request, _response, _next) => {}
);

export const readSingleOrder = PromiseHandler(
  async (_request, _response, _next) => {}
);

export const updateOrder = PromiseHandler(
  async (_request, _response, _next) => {}
);

export const deleteOrder = PromiseHandler(
  async (_request, _response, _next) => {}
);

import { timeStamp } from "console";
import mongoose from "mongoose";
import { OrderID } from "../../interface/interface.js";

const orderSchema = new mongoose.Schema<OrderID>(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      phoneNo: {
        type: Number,
        required: true,
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
    createdAt: {
      type: Date,
      requried: true,
      default: Date.now,
    },
    deliverdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Order: mongoose.Model<OrderID> = mongoose.model<OrderID>(
  "Order",
  orderSchema
);

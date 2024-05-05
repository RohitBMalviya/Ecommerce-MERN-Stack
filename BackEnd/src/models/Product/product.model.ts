import mongoose from "mongoose";
import { ProductID } from "../../interface/interface.js";

const productSchmea: mongoose.Schema<ProductID> =
  new mongoose.Schema<ProductID>(
    {
      name: {
        type: String,
        required: [true, "Please Enter the Product Name"],
        trim: true,
        index: true,
      },
      description: {
        type: String,
        required: [true, "Please Enter the Description "],
      },
      price: {
        type: Number,
        required: [true, "Please Enter the Price "],
        maxlength: [8, "Price Should not be more than 8 value"],
      },
      ratings: {
        type: Number,
        maxlength: [5, "Rating Should not be more than 5 stars"],
        default: 0,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      image: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      category: {
        type: String,
        required: [true, "Please Enter the Category"],
      },
      stock: {
        type: Number,
        required: [true, "Please Enter the Stock "],
        maxlength: [4, "stock can be more than 4 values"],
        default: 1,
      },
      noOfreview: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            maxlength: [5, "Rating Should not be more than 5 stars"],
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
    },
    { timestamps: true }
  );

export const Product: mongoose.Model<ProductID> = mongoose.model<ProductID>(
  "Product",
  productSchmea
);

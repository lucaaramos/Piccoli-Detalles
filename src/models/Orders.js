import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "cancelled"],
      default: "pending",
    },

    paidAt: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      default: "mock",
    },
  },
  { timestamps: true }
);


const Order = mongoose.model("Order", orderSchema);
export default Order;
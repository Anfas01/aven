import mongoose, { Schema, Document, models, } from "mongoose";

export interface CartDocument
  extends Document {
  userId: mongoose.Types.ObjectId;

  items: {
    productId: string;
    name: string;
    image: string;
    price: number;
    priceId: string;
    quantity: number;
  }[];
}

const CartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        priceId: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = models.Cart || mongoose.model<CartDocument>("Cart", CartSchema);

export default Cart;
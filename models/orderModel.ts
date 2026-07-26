import mongoose, { Schema, Document, models } from "mongoose";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderDocument extends Document {
  userId: string;

  orderNumber: string;

  items: OrderItem[];

  subtotal: number;

  paymentStatus:
  | "paid"
  | "pending"
  | "failed"
  | "refunded";

  orderStatus:
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

  stripeSessionId: string;

  stripePaymentIntentId: string;

  shippingName: string;

  shippingEmail?: string;

  shippingPhone?: string;

  shippingAddress: {
    line1: string;
    line2?: string;

    city: string;

    state: string;

    postalCode: string;

    country: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>(
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
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

const ShippingAddressSchema = new Schema(
  {
    line1: {
      type: String,
      required: true,
    },

    line2: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    postalCode: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const OrderSchema = new Schema<OrderDocument>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    items: {
      type: [OrderItemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "paid",
        "pending",
        "failed",
        "refunded",
      ],
      default: "paid",
    },

    orderStatus: {
      type: String,
      enum: [
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "processing",
    },

    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },

    stripePaymentIntentId: {
      type: String,
      required: true,
    },

    shippingName: {
      type: String,
      required: true,
    },

    shippingEmail: {
      type: String,
      default: "",
    },

    shippingPhone: {
      type: String,
      default: "",
    },

    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Order ||
  mongoose.model<OrderDocument>(
    "Order",
    OrderSchema
  );
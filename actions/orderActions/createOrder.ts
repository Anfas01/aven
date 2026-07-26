"use server";

import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";

import Cart from "@/models/cartModel";
import Order from "@/models/orderModel";

type CreateOrderInput = {
  stripeSessionId: string;
  paymentIntentId: string;
  paymentStatus: string;
  totalAmount: number;
  currency: string;
};

export default async function createOrder({
  stripeSessionId,
  paymentIntentId,
  paymentStatus,
  totalAmount,
  currency,
}: CreateOrderInput) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyToken(token);

  const existingOrder = await Order.findOne({
    stripeSessionId,
  });

  if (existingOrder) {
    return {
      success: true,
      message: "Order already exists.",
    };
  }

  const cart = await Cart.findOne({
    userId: payload.userId,
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  await Order.create({
    userId: payload.userId,

    stripeSessionId,

    paymentIntentId,

    paymentStatus,

    totalAmount,

    currency,

    status: "processing",

    items: cart.items,

  });

  await Cart.findOneAndDelete({
    userId: payload.userId,
  });

  return {
    success: true,
  };
}
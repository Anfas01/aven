"use server";

import { cookies } from "next/headers";

import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Order from "@/models/orderModel";
import {
  OrderData,
  OrderItemData,
} from "@/types/order";

export default async function getOrders(): Promise<OrderData[]> {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return [];
  }

  const payload = await verifyToken(token);

  const orders = await Order.find({
    userId: payload.userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  return orders.map(
    (order): OrderData => ({
      _id: order._id.toString(),

      userId: order.userId,

      orderNumber: order.orderNumber,

      subtotal: order.subtotal,

      paymentStatus: order.paymentStatus,

      orderStatus: order.orderStatus,

      stripeSessionId: order.stripeSessionId,

      stripePaymentIntentId:
        order.stripePaymentIntentId,

      createdAt: new Date(
        order.createdAt
      ).toISOString(),

      updatedAt: new Date(
        order.updatedAt
      ).toISOString(),

      items: (order.items as OrderItemData[]).map(
        (item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })
      ),
    })
  );
}
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

      shippingName: order.shippingName,

      shippingEmail: order.shippingEmail,

      shippingPhone: order.shippingPhone,

      shippingAddress: {
        line1: order.shippingAddress.line1,
        line2: order.shippingAddress.line2,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        postalCode: order.shippingAddress.postalCode,
        country: order.shippingAddress.country,
      },

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
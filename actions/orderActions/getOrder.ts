"use server";

import { cookies } from "next/headers";

import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Order, { type OrderItem } from "@/models/orderModel";

export default async function getOrder(id: string) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);

  const order = await Order.findOne({
    _id: id,
    userId: payload.userId,
  }).lean();

  if (!order) {
    return null;
  }

  return {
    _id: order._id.toString(),

    orderNumber: order.orderNumber,

    subtotal: order.subtotal,

    paymentStatus: order.paymentStatus,

    orderStatus: order.orderStatus,

    stripeSessionId: order.stripeSessionId,

    stripePaymentIntentId: order.stripePaymentIntentId,

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

    createdAt: new Date(order.createdAt).toISOString(),

    updatedAt: new Date(order.updatedAt).toISOString(),

    items: (order.items as OrderItem[]).map((item) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    })),
  };
}
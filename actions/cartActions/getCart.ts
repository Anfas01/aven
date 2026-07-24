"use server";

import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Cart from "@/models/cartModel";
import { CartItem } from "@/types/cart";

export default async function getCart(): Promise<CartItem[]> {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return [];
  }

  try {
    const payload = await verifyToken(token);

    const cart = await Cart.findOne({
      userId: payload.userId,
    }).lean();

    if (!cart) {
      return [];
    }

    return cart.items.map((item: CartItem) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      priceId: item.priceId,
      quantity: item.quantity,
    }));
  } catch {
    return [];
  }
}
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Cart from "@/models/cartModel";
import { CartItem } from "@/types/cart";

export default async function removeFromCart(
  productId: string
) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyToken(token);

  const cart = await Cart.findOne({
    userId: payload.userId,
  });

  if (!cart) return;

  cart.items = cart.items.filter(
    (item: CartItem) => item.productId !== productId
  );

  await cart.save();

  revalidatePath("/cart");
}
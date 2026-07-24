"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Cart from "@/models/cartModel";
import { CartItem } from "@/types/cart";

export default async function decreaseQuantity(
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

  const item = cart.items.find(
    (item: CartItem) => item.productId === productId
  );

  if (!item) return;

  if (item.quantity === 1) {
    cart.items = cart.items.filter(
      (item: CartItem) => item.productId !== productId
    );
  } else {
    item.quantity -= 1;
  }

  await cart.save();

  revalidatePath("/cart");
}
"use server";

import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Cart from "@/models/cartModel";

export default async function clearCart() {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) return;

  const payload = await verifyToken(token);

  await Cart.findOneAndUpdate(
    { userId: payload.userId },
    { $set: { items: [] } }
  );
}
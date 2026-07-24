"use server";

import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import Cart from "@/models/cartModel";
import { CartItem } from "@/types/cart";

type AddToCartInput = {
  productId: string;
  name: string;
  image: string;
  price: number;
  priceId: string;
  quantity: number;
};

export default async function addToCart_db({
  productId,
  name,
  image,
  price,
  priceId,
  quantity,
}: AddToCartInput) {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyToken(token);

  let cart = await Cart.findOne({
    userId: payload.userId,
  });

  if (!cart) {
    cart = await Cart.create({
      userId: payload.userId,
      items: [
        {
          productId,
          name,
          image,
          price,
          priceId,
          quantity,
        },
      ],
    });

    return {
      success: true,
    };
  }

  const existingItem = cart.items.find(
    (item: CartItem) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity = Math.min(
      existingItem.quantity + quantity,
      3
    );
  } else {
    cart.items.push({
      productId,
      name,
      image,
      price,
      priceId,
      quantity,
    });
  }

  await cart.save();

  return {
    success: true,
  };
}
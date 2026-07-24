"use server";

import { redirect } from "next/navigation";
import stripe from "@/lib/stripe";

type CheckoutItem = {
  priceId: string;
  quantity: number;
};

export async function checkout(items: CheckoutItem[]) {
  if (items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    })),

    billing_address_collection: "required",

    shipping_address_collection: {
      allowed_countries: [
        "IN",
        "US",
        "GB",
      ],
    },

    phone_number_collection: {
      enabled: true,
    },

    success_url: `${process.env.NEXT_PUBLIC_URL}/success?source=cart`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
  });

  redirect(session.url!);
}
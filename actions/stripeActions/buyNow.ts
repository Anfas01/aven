"use server";

import { redirect } from "next/navigation";
import stripe from "@/lib/stripe";

export default async function buyNow(
  priceId: string,
  quantity: number
) {
  // Validate quantity
  if (quantity < 1 || quantity > 3) {
    throw new Error("Invalid quantity");
  }

  const session =
    await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],

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

      success_url: `${process.env.NEXT_PUBLIC_URL}/success?source=buy-now`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
    });

  redirect(session.url!);
}
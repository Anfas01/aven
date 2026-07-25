"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import stripe from "@/lib/stripe";
import { verifyToken } from "@/lib/jwt";

export default async function buyNow(
  priceId: string,
  quantity: number
): Promise<never> {
  if (quantity < 1 || quantity > 3) {
    throw new Error("Invalid quantity.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized.");
  }

  const payload = await verifyToken(token);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: [
      {
        price: priceId,
        quantity,
      },
    ],

    billing_address_collection: "required",

    shipping_address_collection: {
      allowed_countries: ["IN", "US", "GB"],
    },

    phone_number_collection: {
      enabled: true,
    },

    client_reference_id: payload.userId,

    metadata: {
      userId: payload.userId,
    },

    success_url: `${process.env.NEXT_PUBLIC_URL}/success?source=buy-now`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
  });

  if (!session.url) {
    throw new Error("Failed to create Stripe Checkout session.");
  }

  redirect(session.url);
}
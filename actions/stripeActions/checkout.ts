"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import stripe from "@/lib/stripe";
import { verifyToken } from "@/lib/jwt";

type CheckoutItem = {
  priceId: string;
  quantity: number;
};

export async function checkout(
  items: CheckoutItem[]
): Promise<never> {
  if (items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized.");
  }

  const payload = await verifyToken(token);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    })),

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

    success_url: `${process.env.NEXT_PUBLIC_URL}/success?source=cart`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
  });

  if (!session.url) {
    throw new Error("Failed to create Stripe Checkout session.");
  }

  redirect(session.url);
}
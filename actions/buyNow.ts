"use server";

import { redirect } from "next/navigation";
import stripe from "@/lib/stripe";

export default async function buyNow(priceId: string) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?source=buy-now`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
  });

  redirect(session.url!);
}
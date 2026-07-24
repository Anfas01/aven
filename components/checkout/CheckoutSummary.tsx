"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  ArrowRight,
} from "lucide-react";
import { checkout } from "@/actions/stripeActions/checkout";

type CheckoutItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  priceId: string;
  quantity: number;
};

type CheckoutSummaryProps = {
  items: CheckoutItem[];
  subtotal: number;
};

export default function CheckoutSummary({
  items,
  subtotal,
}: CheckoutSummaryProps) {
  const [isLoading, setIsLoading] =
    useState(false);

  const currency = new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  );

  async function handleCheckout() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await checkout(
        items.map((item) => ({
          priceId: item.priceId,
          quantity: item.quantity,
        }))
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm lg:sticky lg:top-28">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Order Summary
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Review your payment details before
          continuing to Stripe Checkout.
        </p>
      </div>

      {/* Totals */}
      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Items
          </span>

          <span className="font-medium">
            {items.length}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Subtotal
          </span>

          <span className="font-medium">
            {currency.format(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Shipping
          </span>

          <span className="font-medium text-green-600">
            Free
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Taxes
          </span>

          <span className="font-medium">
            Included
          </span>
        </div>
      </div>

      <div className="my-8 border-t border-zinc-200" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">
          Total
        </span>

        <span className="text-2xl font-bold">
          {currency.format(subtotal)}
        </span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            <Lock size={16} />
            Continue to Secure Payment
            <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="mt-8 space-y-4 border-t border-zinc-200 pt-8">
        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <ShieldCheck
            size={18}
            className="text-green-600"
          />

          <span>
            Secure payments powered by Stripe
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <Truck
            size={18}
            className="text-zinc-700"
          />

          <span>
            Free shipping on all orders
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <RotateCcw
            size={18}
            className="text-zinc-700"
          />

          <span>
            30-day hassle-free returns
          </span>
        </div>
      </div>
    </aside>
  );
}
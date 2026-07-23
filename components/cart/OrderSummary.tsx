"use client";

import Link from "next/link";

type OrderSummaryProps = {
  subtotal: number;
};

export default function OrderSummary({
  subtotal,
}: OrderSummaryProps) {
  return (
    <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm lg:sticky lg:top-28">
      <h2 className="text-2xl font-semibold">
        Order Summary
      </h2>

      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Subtotal
          </span>

          <span className="font-medium">
            &#8377;{subtotal.toFixed(2)}
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
            Tax
          </span>

          <span className="font-medium">
            Included
          </span>
        </div>

        <div className="border-t border-zinc-200 pt-5">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>

            <span>&#8377;{subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link href="/checkout">
        <button className="mt-8 w-full rounded-full bg-zinc-900 py-4 text-sm font-medium text-white transition hover:bg-black cursor-pointer">
          Proceed to Checkout
        </button>
      </Link>

      <Link
        href="/products"
        className="mt-4 block text-center text-sm text-zinc-500 transition hover:text-zinc-900"
      >
        Continue Shopping
      </Link>
    </aside>
  );
}
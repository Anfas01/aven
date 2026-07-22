"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function EmptyCheckout() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-zinc-100 p-6">
          <ShoppingBag className="h-10 w-10 text-zinc-500" />
        </div>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
          Your cart is empty
        </h1>

        <p className="mt-4 max-w-md leading-7 text-zinc-500">
          Add some products to your cart before proceeding to checkout.
        </p>

        <Link
          href="/products"
          className="mt-10 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-black"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
      <section className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Secure Checkout
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Complete Your Order
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-500">
          Review your order and enter your shipping details before
          continuing to secure payment.
        </p>
      </section>
  );
}
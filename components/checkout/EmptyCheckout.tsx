"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function EmptyCheckout() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 shadow-sm">
        <ShoppingBag className="h-10 w-10 text-zinc-500" />
      </div>

      {/* Heading */}
      <h1 className="mt-10 text-4xl font-semibold tracking-tight text-zinc-900">
        Your cart is empty
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-lg text-base leading-8 text-zinc-500">
        You haven&apos;t added any products to your cart yet.
        Browse our collection and discover something you&apos;ll
        love.
      </p>

      {/* CTA */}
      <Link
        href="/products"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
      >
        Browse Products
        <ArrowRight size={18} />
      </Link>
    </section>
  );
}
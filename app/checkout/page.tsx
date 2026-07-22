"use client";

import { useCartStore } from "@/store/cart-store";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutSummary from "@/components/CheckoutSummary";
import EmptyCheckout from "@/components/EmptyCheckout";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <EmptyCheckout />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
        Checkout
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";


export default function CartPage() {

  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-center px-6">
        <div className="rounded-full bg-zinc-100 p-6">
          <ShoppingBag className="h-10 w-10 text-zinc-500" />
        </div>

        <h1 className="mt-8 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Your cart is empty
        </h1>

        <p className="mt-4 max-w-md text-center leading-7 text-zinc-500">
          Looks like you haven&apos;t added any products yet.
        </p>

        <Link
          href="/products"
          className="mt-10 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-black"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
        Shopping Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Cart Items */}
        <div className="space-y-6">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {/* Order Summary */}
        <OrderSummary subtotal={subtotal} />
      </div>
    </main>
  );
}
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useSearchParams } from "next/navigation";


export default function SuccessPage() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  useEffect(() => {
    if (source === "cart") {
      clearCart();
    }
  }, [source, clearCart]);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-zinc-50 px-6 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-white">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-zinc-900">
          Payment Successful
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-zinc-500">
          Thank you for your purchase. Your order has been confirmed and is
          being prepared. A confirmation email will be sent shortly.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-medium text-zinc-900">
            Order Status
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Payment received successfully. We&apos;ll notify you once your order has
            been shipped.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-50"
          >
            <ShoppingBag className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
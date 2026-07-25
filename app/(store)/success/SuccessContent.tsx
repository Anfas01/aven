"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Package,
  ShoppingBag,
} from "lucide-react";

import clearCart from "@/actions/cartActions/clearCart";

export default function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) return;

    async function handleSuccess() {
      if (source !== "cart") return;

      hasCleared.current = true;

      try {
        await clearCart();

        router.refresh();
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    }

    handleSuccess();
  }, [router, source]);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16 sm:px-6">
      <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        {/* Header */}
        <div className="mt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Payment Successful
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Thank You for Your Order
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-zinc-500">
            Your payment has been received successfully. We&apos;re preparing your
            order now, and you&apos;ll receive an email confirmation with your order
            details shortly.
          </p>
        </div>

        {/* Status */}
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              <Package className="h-5 w-5 text-zinc-700" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-zinc-900">
                Order Confirmed
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Your order has been placed successfully and is currently being
                processed. We&apos;ll notify you once it has been shipped.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/products"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-4 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-900 hover:bg-zinc-50"
          >
            <ShoppingBag className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
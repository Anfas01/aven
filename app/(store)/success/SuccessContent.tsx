"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import clearCart from "@/actions/cartActions/clearCart";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  useEffect(() => {
    async function handleSuccess() {
      if (source === "cart") {
        await clearCart();
      }
    }

    handleSuccess();
  }, [source]);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            Payment Successful
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900">
            Thank You for Your Order
          </h1>

          <p className="mx-auto mt-5 max-w-lg leading-7 text-zinc-500">
            Your payment has been processed successfully. We&apos;re now preparing
            your order for shipment. You&apos;ll receive a confirmation email with
            your order details shortly.
          </p>
        </div>

        {/* Status Card */}
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <Package className="h-5 w-5 text-zinc-700" />
            </div>

            <div>
              <h2 className="font-semibold text-zinc-900">
                Order Confirmed
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Your order has been placed successfully and is waiting to be
                processed. We&apos;ll notify you as soon as it&apos;s shipped.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/products"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-black"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-50"
          >
            <ShoppingBag className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
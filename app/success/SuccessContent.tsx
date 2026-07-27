"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import clearCart from "@/actions/cartActions/clearCart";

import SuccessHero from "@/components/success/SuccessHero";
import SuccessStatus from "@/components/success/SuccessStatus";
import SuccessProgress from "@/components/success/SuccessProgress";
import SuccessActions from "@/components/success/SuccessActions";

export default function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const source = searchParams.get("source");

  const hasCleared = useRef(false);

  const [countdown, setCountdown] = useState(10);

  // Clear cart once
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

  // Countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((value) => value - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Redirect
  useEffect(() => {
    if (countdown !== 0) return;

    router.replace("/orders");
  }, [countdown, router]);

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-zinc-50 to-zinc-100">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="space-y-8">
          <SuccessHero />

          <SuccessStatus />

          <SuccessProgress countdown={countdown} />

          <SuccessActions />
        </div>
      </div>
    </main>
  );
}
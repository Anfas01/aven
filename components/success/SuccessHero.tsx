import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function SuccessHero() {
  return (
    <section className="relative overflow-hidden rounded-2rem border border-zinc-200 bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      {/* Background Decorations */}
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-zinc-200/40 blur-3xl" />

      {/* Top Action */}
      <div className="relative z-10 flex justify-center sm:justify-end">
        <Link
          href="/orders"
          className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md"
        >
          View My Orders

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mt-8 flex flex-col items-center text-center sm:mt-10">
        {/* Success Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-100 shadow-lg transition-transform duration-300 hover:scale-105 sm:h-24 sm:w-24">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 sm:h-12 sm:w-12" />
        </div>

        {/* Badge */}
        <span className="mt-8 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-600 sm:text-xs">
          Payment Successful
        </span>

        {/* Heading */}
        <h1 className="mt-6 max-w-4xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl xl:text-6xl">
          Thank You for Your Order
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-500 sm:max-w-2xl sm:text-base sm:leading-8 lg:text-lg">
          Your payment has been received successfully. We&apos;re preparing your
          order now, and you&apos;ll receive an email confirmation with your order
          details shortly.
        </p>
      </div>
    </section>
  );
}
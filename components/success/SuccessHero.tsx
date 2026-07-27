import { CheckCircle2 } from "lucide-react";

export default function SuccessHero() {
  return (
    <section className="relative overflow-hidden rounded-2rem border border-zinc-200 bg-white px-6 py-12 shadow-sm sm:px-10 sm:py-16">
      {/* Background Decorations */}
      <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-zinc-200/40 blur-3xl" />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-100 shadow-lg transition-transform duration-300 hover:scale-105">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        </div>

        {/* Badge */}
        <span className="mt-8 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-600">
          Payment Successful
        </span>

        {/* Title */}
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          Thank You for Your Order
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-500 sm:text-lg">
          Your payment has been received successfully. We&apos;re preparing your
          order now, and you&apos;ll receive an email confirmation with your order
          details shortly.
        </p>
      </div>
    </section>
  );
}
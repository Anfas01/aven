import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-zinc-50 via-white to-white" />

      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-5 text-center sm:px-6 lg:min-h-[92vh] lg:px-8">
        {/* Badge */}
        <span className="rounded-full border border-zinc-200 bg-white px-5 py-2 text-xs font-medium uppercase tracking-[0.35em] text-zinc-600 shadow-sm">
          Premium Collection
        </span>

        {/* Heading */}
        <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
          Designed for
          <br />
          Everyday Living.
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600">
          Discover thoughtfully crafted products that combine timeless
          design, exceptional quality, and effortless functionality for
          modern living.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
          >
            Shop Collection
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-8 py-4 text-sm font-medium text-zinc-900 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-50"
          >
            Explore Products
          </Link>
        </div>

        {/* Bottom Text */}
        <div className="mt-24 flex flex-wrap items-center justify-center gap-10 text-sm text-zinc-500">
          <span>Premium Quality</span>

          <span className="hidden h-1 w-1 rounded-full bg-zinc-300 sm:block" />

          <span>Secure Stripe Checkout</span>

          <span className="hidden h-1 w-1 rounded-full bg-zinc-300 sm:block" />

          <span>Worldwide Shipping</span>
        </div>
      </div>
    </section>
  );
}
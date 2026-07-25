import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-4xl border border-zinc-200 bg-zinc-900 px-8 py-16 text-center text-white shadow-xl sm:px-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-400">
            Discover Aven
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Elevate Your Everyday Essentials.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Browse thoughtfully curated products designed with timeless
            aesthetics, premium materials, and exceptional craftsmanship.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Shop Collection
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-zinc-900"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400">
            <span>Secure Payments</span>

            <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:block" />

            <span>Worldwide Shipping</span>

            <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:block" />

            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
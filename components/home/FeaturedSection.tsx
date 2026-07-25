import FeaturedProducts from "./FeaturedProducts";
import Stripe from "stripe";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  products: Stripe.Product[];
};

export default function FeaturedSection({
  products,
}: Props) {
  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Featured Collection
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Best Sellers
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Explore our most loved products, carefully selected for
              their exceptional craftsmanship, timeless design, and
              everyday functionality.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Products */}
        <div className="mt-16">
          <FeaturedProducts products={products} />
        </div>
      </div>
    </section>
  );
}
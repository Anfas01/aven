import stripe from "@/lib/stripe";
import FeaturedProducts from "@/components/FeaturedProducts";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

export default async function Home() {
  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-5 text-center sm:px-6 lg:min-h-[85vh] lg:px-8">
        <span className="rounded-full border border-zinc-200 px-4 py-2 text-xs text-zinc-600 sm:px-5 sm:text-sm">
          Premium Collection
        </span>

        <h1 className="mt-8 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Modern essentials
          <br />
          made beautifully.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
          Carefully curated products crafted with premium materials,
          timeless aesthetics, and exceptional attention to detail.
        </p>

        <Link
          href="/products"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm text-white transition hover:bg-black sm:px-8 sm:py-4 sm:text-base"
        >
          Shop Collection
          <ArrowRight size={18} />
        </Link>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <FeaturedProducts products={products.data} />
      </section>

      {/* Why Choose Us */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 lg:px-8 lg:py-24">
          <div>
            <div className="mb-5 inline-flex rounded-2xl bg-white p-3 shadow-sm">
              <Truck className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-semibold">
              Fast Shipping
            </h3>

            <p className="mt-4 leading-7 text-zinc-600">
              Worldwide delivery with premium packaging and reliable
              logistics.
            </p>
          </div>

          <div>
            <div className="mb-5 inline-flex rounded-2xl bg-white p-3 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-semibold">
              Secure Checkout
            </h3>

            <p className="mt-4 leading-7 text-zinc-600">
              Every payment is encrypted and securely processed through Stripe.
            </p>
          </div>

          <div>
            <div className="mb-5 inline-flex rounded-2xl bg-white p-3 shadow-sm">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-semibold">
              Premium Quality
            </h3>

            <p className="mt-4 leading-7 text-zinc-600">
              Designed with simplicity and crafted to last.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Find your next favorite.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
          Explore our curated collection of timeless products built
          for everyday living.
        </p>

        <Link
          href="/products"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm text-white transition hover:bg-black sm:px-8 sm:py-4 sm:text-base"
        >
          Browse Products
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
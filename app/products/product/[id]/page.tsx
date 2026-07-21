import BackButton from "@/components/BackButton";
import stripe from "@/lib/stripe";
import Image from "next/image";
import Stripe from "stripe";
import {
  CreditCard,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price | null;

  const formattedPrice = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency.toUpperCase(),
      }).format((price.unit_amount ?? 0) / 100)
    : "Unavailable";

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <BackButton />

      <div className="grid gap-20 lg:grid-cols-2">
        {/* Left Side */}
        <div className="self-start lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-32px border border-zinc-200 bg-zinc-50 shadow-sm transition-shadow duration-500 hover:shadow-xl">
            {product.images.length > 0 ? (
              <div className="group relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center text-zinc-400">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
            Premium Collection
          </span>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-zinc-900">
            {product.name}
          </h1>

          <p className="mt-6 text-3xl font-medium text-zinc-900">
            {formattedPrice}
          </p>

          {product.description && (
            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-600">
              {product.description}
            </p>
          )}

          {/* Quantity */}
          <section className="mt-14">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Quantity
            </p>

            <div className="inline-flex overflow-hidden rounded-full border border-zinc-200 bg-white">
              <button className="flex h-12 w-12 cursor-pointer items-center justify-center transition hover:bg-zinc-100">
                <Minus size={18} />
              </button>

              <span className="flex w-14 items-center justify-center text-lg font-medium">
                1
              </span>

              <button className="flex h-12 w-12 cursor-pointer items-center justify-center transition hover:bg-zinc-100">
                <Plus size={18} />
              </button>
            </div>
          </section>

          {/* Actions */}
          <section className="mt-12 flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <button className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-8 py-4 text-sm font-medium text-zinc-900 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white hover:shadow-lg">
              <CreditCard size={18} />
              Buy Now
            </button>
          </section>

          {/* Divider */}
          <div className="my-14 h-px bg-zinc-200" />

          {/* Features */}
          <section className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="rounded-2xl bg-zinc-100 p-3">
                <ShieldCheck className="h-5 w-5 text-zinc-900" />
              </div>

              <div>
                <h3 className="font-medium text-zinc-900">
                  Secure Payment
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-500">
                  Every payment is securely processed through Stripe using
                  industry-standard encryption.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="rounded-2xl bg-zinc-100 p-3">
                <Truck className="h-5 w-5 text-zinc-900" />
              </div>

              <div>
                <h3 className="font-medium text-zinc-900">
                  Worldwide Shipping
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-500">
                  Carefully packaged and delivered worldwide with trusted
                  shipping partners.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="rounded-2xl bg-zinc-100 p-3">
                <RotateCcw className="h-5 w-5 text-zinc-900" />
              </div>

              <div>
                <h3 className="font-medium text-zinc-900">
                  Easy Returns
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-500">
                  Return your order within 30 days if it isn't exactly what you
                  expected.
                </p>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="mt-20 space-y-12 border-t border-zinc-200 pt-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Product Details
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-zinc-600">
                Crafted with premium materials and exceptional attention to
                detail, this product is designed to elevate your everyday
                experience while maintaining timeless aesthetics and lasting
                durability.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Shipping & Returns
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-zinc-600">
                Orders are processed within 1–2 business days. We offer fast
                worldwide shipping and hassle-free returns within 30 days of
                delivery.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Secure Checkout
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-zinc-600">
                Every order is securely processed through Stripe. Your payment
                details are encrypted and never stored on our servers.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
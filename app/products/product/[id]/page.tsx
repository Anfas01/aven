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
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <BackButton />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Product Image */}
        <div className="self-start lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm transition-shadow duration-500 hover:shadow-xl lg:rounded-[32px]">
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

        {/* Product Information */}
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
            Premium Collection
          </span>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:mt-4 lg:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-medium text-zinc-900 sm:text-3xl">
            {formattedPrice}
          </p>

          {product.description && (
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              {product.description}
            </p>
          )}

          {/* Quantity */}
          <section className="mt-10 lg:mt-14">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Quantity
            </p>

            <div className="inline-flex overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm">
              <button className="flex h-10 w-10 items-center justify-center transition hover:bg-zinc-100 sm:h-12 sm:w-12">
                <Minus size={18} />
              </button>

              <span className="flex w-12 items-center justify-center text-base font-medium sm:w-14 sm:text-lg">
                1
              </span>

              <button className="flex h-10 w-10 items-center justify-center transition hover:bg-zinc-100 sm:h-12 sm:w-12">
                <Plus size={18} />
              </button>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row">
            <button className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto">
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <button className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-8 py-4 text-sm font-medium text-zinc-900 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white hover:shadow-lg sm:w-auto">
              <CreditCard size={18} />
              Buy Now
            </button>
          </section>

          {/* Divider */}
          <div className="my-10 h-px bg-zinc-200 lg:my-14" />

          {/* Features */}
          <section className="space-y-6 sm:space-y-8">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="rounded-xl bg-zinc-100 p-2.5 sm:rounded-2xl sm:p-3">
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

            <div className="flex items-start gap-4 sm:gap-5">
              <div className="rounded-xl bg-zinc-100 p-2.5 sm:rounded-2xl sm:p-3">
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
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="rounded-xl bg-zinc-100 p-2.5 sm:rounded-2xl sm:p-3">
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
          <section className="mt-14 space-y-10 border-t border-zinc-200 pt-12 lg:mt-20 lg:space-y-12 lg:pt-16">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                Product Details
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:mt-5 sm:leading-8">
                Crafted with premium materials and exceptional attention to
                detail, this product is designed to elevate your everyday
                experience while maintaining timeless aesthetics and lasting
                durability. Every piece is thoughtfully created to blend
                elegance, function, and longevity.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                Shipping & Returns
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:mt-5 sm:leading-8">
                Orders are processed within 1–2 business days and shipped using
                trusted global carriers. If you're not completely satisfied,
                enjoy hassle-free returns within 30 days of delivery.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                Secure Checkout
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:mt-5 sm:leading-8">
                Every transaction is securely processed by Stripe using
                industry-leading encryption. Your payment information is never
                stored on our servers, ensuring a safe and reliable checkout
                experience.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
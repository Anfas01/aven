import BackButton from "@/components/ui/BackButton";
import ProductActions from "@/components/product/ProductActions";
import stripe from "@/lib/stripe";
import Image from "next/image";
import Stripe from "stripe";
import {
  RotateCcw,
  ShieldCheck,
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
        {/* Left */}
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

        {/* Right */}
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
            Premium Collection
          </span>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
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

          <ProductActions
            product={{
              id: product.id,
              name: product.name,
              image: product.images[0] ?? "",
              price: (price?.unit_amount ?? 0) / 100,
              priceId: price?.id ?? "",
            }}
          />

          <div className="my-10 h-px bg-zinc-200 lg:my-14" />

          <section className="space-y-6 sm:space-y-8">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="rounded-xl bg-zinc-100 p-3">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-medium">
                  Secure Payment
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-500">
                  Every payment is securely processed through Stripe using
                  industry-standard encryption.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-5">
              <div className="rounded-xl bg-zinc-100 p-3">
                <Truck className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-medium">
                  Worldwide Shipping
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-500">
                  Carefully packaged and delivered worldwide with trusted
                  shipping partners.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-5">
              <div className="rounded-xl bg-zinc-100 p-3">
                <RotateCcw className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-medium">
                  Easy Returns
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-500">
                  Return your order within 30 days if it isn&apos;t exactly what you
                  expected.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-14 space-y-10 border-t border-zinc-200 pt-12 lg:mt-20">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Product Details
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-zinc-600">
                Crafted with premium materials and exceptional attention to
                detail, this product is designed to elevate your everyday
                experience while maintaining timeless aesthetics and lasting
                durability.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Shipping & Returns
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-zinc-600">
                Orders are processed within 1–2 business days. We offer fast
                worldwide shipping and hassle-free returns within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Secure Checkout
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-zinc-600">
                Every order is processed securely by Stripe using
                industry-leading encryption.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
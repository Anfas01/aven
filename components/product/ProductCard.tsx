"use client";

import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

type ProductCardProps = {
  product: Stripe.Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  if (
    typeof product.default_price !== "object" ||
    !product.default_price
  ) {
    return null;
  }

  const price = product.default_price as Stripe.Price;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency.toUpperCase(),
  }).format((price.unit_amount ?? 0) / 100);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0] ?? "",
      price: (price.unit_amount ?? 0) / 100,
      quantity: 1,
      priceId: price.id,
    });
  }

  return (
    <article className="group">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-200/50">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-4/5 overflow-hidden bg-zinc-100">
            {product.images.length > 0 && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
          </div>
        </Link>

        <div className="space-y-5 p-6">
          <div className="space-y-1">
            <h3 className="text-lg font-medium tracking-tight text-zinc-900">
              {product.name}
            </h3>

            <p className="text-sm font-medium text-zinc-500">
              {formattedPrice}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full rounded-full border border-zinc-300 bg-white py-3 text-sm font-medium text-zinc-900 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white active:scale-[0.98]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
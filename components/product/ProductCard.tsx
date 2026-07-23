"use client";

import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import buyNow from "@/actions/buyNow";
import { ShoppingBag } from "lucide-react";

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

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: price.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format((price.unit_amount ?? 0) / 100);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  function handleAddToCart(
    e: React.MouseEvent
  ) {
    e.preventDefault();

    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0] ?? "",
      price: (price.unit_amount ?? 0) / 100,
      quantity: 1,
      priceId: price.id,
    });
  }

  function handleBuyNow(
    e: React.MouseEvent
  ) {
    e.preventDefault();
    buyNow(price.id);
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-300 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/5">
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-4/5 w-full overflow-hidden bg-zinc-100"
      >
        {product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
            No image available
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <Link
            href={`/products/${product.id}`}
          >
            <h3 className="line-clamp-1 text-base font-semibold text-zinc-900 transition-colors hover:text-zinc-600">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-sm font-medium text-zinc-500">
            {formattedPrice}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2">
          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="flex flex-1 items-center justify-center rounded-xl bg-zinc-900 px-3 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.97]"
          >
            Buy Now
          </button>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            title="Add to Cart"
            className="group/cart flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-all duration-300 hover:w-36 hover:border-zinc-300 hover:bg-zinc-100 active:scale-[0.97]"
          >
            <ShoppingBag
              size={16}
              className="shrink-0"
            />

            <span className="ml-0 w-0 overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-300 group-hover/cart:ml-2 group-hover/cart:w-20 group-hover/cart:opacity-100">
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
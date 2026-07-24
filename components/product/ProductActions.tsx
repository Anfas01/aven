"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

import addToCart_db from "@/actions/cartActions/addToCart";
import buyNow from "@/actions/stripeActions/buyNow";

type Props = {
  product: {
    productId: string;
    name: string;
    image: string;
    price: number;
    priceId: string;
  };
};

export default function ProductActions({
  product,
}: Props) {
  const router = useRouter();

  const [quantity, setQuantity] =
    useState(1);

  const [isAdding, setIsAdding] =
    useState(false);

  const [isBuying, setIsBuying] =
    useState(false);

  function increase() {
    setQuantity((prev) =>
      Math.min(prev + 1, 3)
    );
  }

  function decrease() {
    setQuantity((prev) =>
      Math.max(prev - 1, 1)
    );
  }

  async function handleAddToCart() {
    if (isAdding) return;

    setIsAdding(true);

    try {
      await addToCart_db({
        productId: product.productId,
        name: product.name,
        image: product.image,
        price: product.price,
        priceId: product.priceId,
        quantity,
      });

      router.refresh();
    } finally {
      setIsAdding(false);
    }
  }

  async function handleBuyNow() {
    if (isBuying) return;

    setIsBuying(true);

    try {
      await buyNow(product.priceId, quantity);
    } finally {
      setIsBuying(false);
    }
  }

  return (
    <>
      {/* Quantity */}
      <section className="mt-10 lg:mt-14">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500">
          Quantity
        </p>

        <div className="inline-flex overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm">
          <button
            onClick={decrease}
            disabled={isAdding || isBuying}
            className="flex h-10 w-10 items-center justify-center transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12"
          >
            <Minus size={18} />
          </button>

          <span className="flex w-12 items-center justify-center text-base font-medium sm:w-14 sm:text-lg">
            {quantity}
          </span>

          <button
            onClick={increase}
            disabled={isAdding || isBuying}
            className="flex h-10 w-10 items-center justify-center transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12"
          >
            <Plus size={18} />
          </button>
        </div>
      </section>

      {/* Buttons */}
      <section className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row">
        <button
          onClick={handleAddToCart}
          disabled={isAdding || isBuying}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isAdding ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <ShoppingBag size={18} />
              Add to Cart
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isAdding || isBuying}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-8 py-4 text-sm font-medium text-zinc-900 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isBuying ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
          ) : (
            <>
              <CreditCard size={18} />
              Buy Now
            </>
          )}
        </button>
      </section>
    </>
  );
}
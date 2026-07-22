"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, CreditCard } from "lucide-react";
import { useCartStore } from "@/store/cart-store";


type Props = {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    priceId: string;
  };
};

export default function ProductActions({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  function increase() {
    if (quantity < 3) {
      setQuantity(quantity + 1);
    }
  }

  function decrease() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        quantity: 1,
        priceId: product.id,
      });
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
            className="flex h-10 w-10 items-center justify-center transition hover:bg-zinc-100 sm:h-12 sm:w-12"
          >
            <Minus size={18} />
          </button>

          <span className="flex w-12 items-center justify-center text-base font-medium sm:w-14 sm:text-lg">
            {quantity}
          </span>

          <button
            onClick={increase}
            className="flex h-10 w-10 items-center justify-center transition hover:bg-zinc-100 sm:h-12 sm:w-12"
          >
            <Plus size={18} />
          </button>
        </div>
      </section>

      {/* Buttons */}
      <section className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row">
        <button
          onClick={handleAddToCart}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>

        <button className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-8 py-4 text-sm font-medium text-zinc-900 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white hover:shadow-lg sm:w-auto">
          <CreditCard size={18} />
          Buy Now
        </button>
      </section>
    </>
  );
}
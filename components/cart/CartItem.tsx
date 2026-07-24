"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

type CartItemProps = {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
};

export default function CartItem({
  item,
}: CartItemProps) {
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(item.price);

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-5">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="relative h-24 w-24 flex-none overflow-hidden rounded-2xl bg-zinc-100 sm:h-28 sm:w-28">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div>
            <h2 className="line-clamp-2 text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
              {item.name}
            </h2>

            <p className="mt-2 text-sm font-medium text-zinc-500 sm:text-base">
              {formattedPrice}
            </p>
          </div>

          {/* Mobile Actions */}
          <div className="mt-5 flex items-center justify-between sm:hidden">
            <div className="inline-flex overflow-hidden rounded-full border border-zinc-200">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="flex h-9 w-9 items-center justify-center transition hover:bg-zinc-100"
              >
                <Minus size={15} />
              </button>

              <span className="flex w-9 items-center justify-center text-sm font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.id)}
                className="flex h-9 w-9 items-center justify-center transition hover:bg-zinc-100"
              >
                <Plus size={15} />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="inline-flex items-center gap-1 text-sm font-medium text-red-500 transition hover:text-red-600"
            >
              <Trash2 size={15} />
              Remove
            </button>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden flex-col items-end justify-between self-stretch sm:flex">
          <div className="inline-flex overflow-hidden rounded-full border border-zinc-200">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="flex h-10 w-10 items-center justify-center transition hover:bg-zinc-100"
            >
              <Minus size={16} />
            </button>

            <span className="flex w-10 items-center justify-center font-medium">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="flex h-10 w-10 items-center justify-center transition hover:bg-zinc-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-600"
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
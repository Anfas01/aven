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

export default function CartItem({ item }: CartItemProps) {
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
    <article className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg sm:flex-row sm:items-center">
      {/* Product Image */}
      <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-zinc-100 sm:h-28 sm:w-28">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-zinc-900">
          {item.name}
        </h2>

        <p className="mt-2 text-lg font-medium text-zinc-600">
          {formattedPrice}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:items-end">
        {/* Quantity */}
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

        {/* Remove */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="inline-flex items-center gap-2 text-sm text-red-500 transition hover:text-red-600"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </article>
  );
}
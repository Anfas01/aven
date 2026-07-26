"use client";

import Image from "next/image";
import { CreditCard, Package } from "lucide-react";

type OrderItem = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

interface Props {
  item: OrderItem;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function OrderDetailsProductCard({
  item,
}: Props) {
  return (
    <article className="group overflow-hidden rounded-2rem border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl sm:p-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Product Image */}

        <div className="relative aspect-square w-full overflow-hidden rounded-1.5rem bg-zinc-100 sm:h-32 sm:w-32 sm:shrink-0">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, 128px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-10 w-10 text-zinc-400" />
            </div>
          )}
        </div>

        {/* Product Details */}

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Product
            </span>

            <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              {item.name}
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
              Premium product included in your order. Carefully packaged and
              prepared for secure delivery.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Info */}

            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
                <Package className="h-4 w-4" />
                Quantity: {item.quantity}
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
                <CreditCard className="h-4 w-4" />
                {formatCurrency(item.price)}
              </div>
            </div>

            {/* Total */}

            <div className="rounded-2xl bg-zinc-50 px-5 py-4 text-left lg:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Total
              </p>

              <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
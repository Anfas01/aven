import { Package } from "lucide-react";

import OrderDetailsProductCard from "./OrderDetailsProductCard";

type OrderItem = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

interface Props {
  items: OrderItem[];
}

export default function OrderItemsSection({
  items,
}: Props) {
  return (
    <section className="overflow-hidden rounded-2rem border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-linear-to-r from-zinc-50 via-white to-zinc-50 px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-sm">
              <Package className="h-6 w-6" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Products
              </span>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Order Items
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Everything included in this order.
              </p>
            </div>
          </div>

          <div className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white px-5 py-2.5 shadow-sm">
            <span className="text-sm font-medium text-zinc-700">
              {items.length} Product{items.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="space-y-5 p-5 sm:p-6 lg:p-8">
        {items.map((item) => (
          <OrderDetailsProductCard
            key={item.productId}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}
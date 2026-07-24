import Link from "next/link";
import { CartItem } from "@/types/cart";

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
};

export default function OrderSummary({
  items,
  subtotal,
}: OrderSummaryProps) {
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm lg:sticky lg:top-28">
      <h2 className="text-2xl font-semibold">
        Order Summary
      </h2>

      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Items ({totalItems})
          </span>

          <span className="font-medium">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Shipping
          </span>

          <span className="font-medium text-green-600">
            Free
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Tax
          </span>

          <span className="font-medium">
            Included
          </span>
        </div>

        <div className="border-t border-zinc-200 pt-5">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>

            <span>
              ₹{subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white transition hover:bg-black"
      >
        Proceed to Checkout
      </Link>

      <Link
        href="/products"
        className="mt-4 block text-center text-sm text-zinc-500 transition hover:text-zinc-900"
      >
        Continue Shopping
      </Link>
    </aside>
  );
}
"use client";

import { checkout } from "@/actions/checkout";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  async function handleCheckout() {
    await checkout(
      items.map((item) => ({
        priceId: item.priceId,
        quantity: item.quantity,
      }))
    );
  }

  return (
    <aside className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm lg:sticky lg:top-28">
      <h2 className="text-2xl font-semibold tracking-tight">
        Order Summary
      </h2>

      {/* Products */}
      <div className="mt-8 space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-zinc-900">
                {item.name}
              </p>

              <p className="text-sm text-zinc-500">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-zinc-200" />

      {/* Totals */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-zinc-500">
            Subtotal
          </span>

          <span className="font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">
            Shipping
          </span>

          <span className="font-medium text-green-600">
            Free
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">
            Tax
          </span>

          <span className="font-medium">
            Included
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-zinc-200" />

      {/* Total */}
      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Total</span>

        <span>${subtotal.toFixed(2)}</span>
      </div>

      {/* Button */}
      <button
        onClick={handleCheckout}
        className="mt-8 w-full rounded-full bg-zinc-900 py-4 text-sm font-medium text-white transition hover:bg-black"
      >
        Continue to Payment
      </button>
    </aside>
  );
}
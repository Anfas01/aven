import Link from "next/link";
import {
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

type Props = {
  order: {
    subtotal: number;
    paymentStatus: string;
    orderStatus: string;
    items: unknown[];
  };
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function OrderSummary({ order }: Props) {
  return (
    <aside className="space-y-6 xl:sticky xl:top-28">
      {/* Summary */}
      <section className="rounded-2rem border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Overview
        </span>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
          Order Summary
        </h2>

        <div className="mt-8 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Products</span>

            <span className="font-semibold text-zinc-900">
              {order.items.length}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Payment</span>

            <span className="capitalize font-semibold text-zinc-900">
              {order.paymentStatus}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Order Status</span>

            <span className="capitalize font-semibold text-zinc-900">
              {order.orderStatus}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Delivery</span>

            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-zinc-500" />
              <span className="font-semibold text-zinc-900">
                Standard
              </span>
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-zinc-200" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">
              Total Amount
            </p>

            <h3 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
              {formatCurrency(order.subtotal)}
            </h3>
          </div>

          <div className="rounded-2xl bg-zinc-100 p-3">
            <CreditCard className="h-6 w-6 text-zinc-700" />
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-zinc-500">
          Inclusive of all applicable taxes. Your payment has been securely
          processed and your order is being prepared.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
        >
          <ShoppingBag className="h-5 w-5" />
          Continue Shopping
        </Link>
      </section>

      {/* Trust Card */}
      <section className="rounded-2rem border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-zinc-100 p-3">
            <ShieldCheck className="h-6 w-6 text-zinc-700" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900">
              Secure Purchase
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Every order is protected with secure payment, reliable shipping,
              and dedicated customer support.
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}
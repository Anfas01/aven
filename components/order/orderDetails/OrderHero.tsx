import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Package,
} from "lucide-react";

type Props = {
  order: {
    orderNumber: string;
    createdAt: string;
    paymentStatus: string;
    orderStatus: string;
    items: unknown[];
  };
};

const orderStatusColors: Record<string, string> = {
  processing:
    "bg-amber-50 text-amber-700 ring-1 ring-amber-200",

  shipped:
    "bg-sky-50 text-sky-700 ring-1 ring-sky-200",

  delivered:
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",

  cancelled:
    "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const paymentStatusColors: Record<string, string> = {
  paid:
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",

  pending:
    "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",

  failed:
    "bg-red-50 text-red-700 ring-1 ring-red-200",

  refunded:
    "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200",
};

export default function OrderHero({
  order,
}: Props) {
  const orderedDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="overflow-hidden rounded-2rem border border-zinc-200 bg-white shadow-sm">
      <div className="relative p-6 sm:p-8 lg:p-10">

        <div className="absolute inset-0 bg-linear-to-br from-zinc-100/40 via-transparent to-zinc-200/20" />

        <div className="relative">

          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <span className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-600">
                Order Details
              </span>

              <h1 className="mt-5 break-all text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                {order.orderNumber}
              </h1>

              <p className="mt-4 max-w-xl text-zinc-600">
                Review your purchased items, shipping information,
                payment status, and order summary.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
                  <CalendarDays className="h-4 w-4" />
                  {orderedDate}
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
                  <Package className="h-4 w-4" />
                  {order.items.length} Item
                  {order.items.length > 1 ? "s" : ""}
                </div>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <span
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
                  paymentStatusColors[
                    order.paymentStatus
                  ] ?? "bg-zinc-100 text-zinc-700"
                }`}
              >
                {order.paymentStatus}
              </span>

              <span
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
                  orderStatusColors[
                    order.orderStatus
                  ] ?? "bg-zinc-100 text-zinc-700"
                }`}
              >
                {order.orderStatus}
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  Package,
} from "lucide-react";

type OrderItem = {
  name: string;
  image: string;
  quantity: number;
};

type Order = {
  _id: string;
  orderNumber: string;
  subtotal: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  items: OrderItem[];
};

interface Props {
  order: Order;
}

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

export default function OrderCard({ order }: Props) {
  const date = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(order.createdAt));

  const total = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(order.subtotal);

  return (
    <article className="group overflow-hidden rounded-2rem border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* Images */}
            <div className="flex shrink-0 -space-x-4">
              {order.items.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="relative h-24 w-24 overflow-hidden rounded-3xl border-4 border-white bg-zinc-100 shadow-sm"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-8 w-8 text-zinc-400" />
                    </div>
                  )}
                </div>
              ))}

              {order.items.length > 3 && (
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-zinc-900 text-lg font-semibold text-white shadow-sm">
                  +{order.items.length - 3}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
                Order #{order.orderNumber}
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
                {order.items[0]?.name}
              </h2>

              {order.items.length > 1 && (
                <p className="mt-2 text-zinc-500">
                  + {order.items.length - 1} more item
                  {order.items.length > 2 ? "s" : ""}
                </p>
              )}

              {/* Info */}
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
                  <CalendarDays className="h-4 w-4" />
                  {date}
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
                  <Package className="h-4 w-4" />
                  {order.items.length} item
                  {order.items.length > 1 ? "s" : ""}
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
                  <CreditCard className="h-4 w-4" />
                  {total}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5 lg:min-w-220px lg:items-end">
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
                  orderStatusColors[order.orderStatus] ??
                  "bg-zinc-100 text-zinc-700"
                }`}
              >
                {order.orderStatus}
              </span>

              <span
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
                  paymentStatusColors[order.paymentStatus] ??
                  "bg-zinc-100 text-zinc-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>

            <Link
              href={`/orders/${order._id}`}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-black hover:shadow-lg"
            >
              View Order

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/70 px-6 py-4 text-sm sm:px-8">
        <span className="text-zinc-500">
          Ordered on{" "}
          <span className="font-medium text-zinc-700">
            {date}
          </span>
        </span>

        <span className="font-semibold text-zinc-900">
          {total}
        </span>
      </div>
    </article>
  );
}
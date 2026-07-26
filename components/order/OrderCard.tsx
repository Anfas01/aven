import Link from "next/link";
import { ArrowRight } from "lucide-react";

type OrderItem = {
  name: string;
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

export default function OrderCard({ order }: Props) {
  const date = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(order.createdAt));

  const price = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(order.subtotal);

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
              Order
            </p>

            <h2 className="mt-1 text-xl font-semibold text-zinc-900">
              {order.orderNumber}
            </h2>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <p className="text-zinc-500">Date</p>
              <p className="mt-1 font-medium text-zinc-900">{date}</p>
            </div>

            <div>
              <p className="text-zinc-500">Items</p>
              <p className="mt-1 font-medium text-zinc-900">
                {order.items.length}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">Total</p>
              <p className="mt-1 font-semibold text-zinc-900">
                {price}
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            {order.orderStatus}
          </span>

          <Link
            href={`/orders/${order._id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition hover:gap-3"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
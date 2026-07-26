import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import getOrder from "@/actions/orderActions/getOrder";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function OrderDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/orders"
            className="text-sm text-zinc-500 hover:text-black"
          >
            ← Back to Orders
          </Link>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            {order.orderNumber}
          </h1>

          <p className="mt-2 text-zinc-500">
            Ordered on{" "}
            {new Date(order.createdAt).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
        </div>

        <div className="flex gap-3">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 capitalize">
            {order.paymentStatus}
          </span>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 capitalize">
            {order.orderStatus}
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">
              Items
            </h2>

            <div className="space-y-6">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-5 border-b border-zinc-100 pb-6 last:border-none last:pb-0"
                >
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-zinc-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-lg font-semibold">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">
              Shipping Information
            </h2>

            <div className="space-y-2 text-zinc-700">
              <p className="font-medium">
                {order.shippingName}
              </p>

              <p>{order.shippingEmail}</p>

              <p>{order.shippingPhone}</p>

              <div className="pt-4">
                <p>{order.shippingAddress.line1}</p>

                {order.shippingAddress.line2 && (
                  <p>{order.shippingAddress.line2}</p>
                )}

                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}
                </p>

                <p>
                  {order.shippingAddress.postalCode}
                </p>

                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-2xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-8 space-y-5">
            <div className="flex justify-between">
              <span className="text-zinc-500">
                Items
              </span>

              <span>{order.items.length}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Payment
              </span>

              <span className="capitalize">
                {order.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Status
              </span>

              <span className="capitalize">
                {order.orderStatus}
              </span>
            </div>

            <div className="border-t pt-5">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span>
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/products"
            className="mt-8 flex justify-center rounded-full bg-black px-6 py-3 text-white transition hover:bg-zinc-800"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
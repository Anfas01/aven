import Link from "next/link";
import {
  CalendarDays,
  Package,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";

import getOrders from "@/actions/orderActions/getOrders";
import OrderCard from "@/components/order/OrderCard";

export default async function OrdersPage() {
  const orders = await getOrders();

  const latestPurchase =
    orders.length > 0
      ? new Date(orders[0].createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-zinc-50 to-zinc-100">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero */}
        <section className="mb-12 rounded-2rem border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
          <span className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-600">
            Account
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            My Orders
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            View your purchases, monitor deliveries, and access your complete
            order history in one place.
          </p>
        </section>

        {orders.length === 0 ? (
          /* Empty State */
          <section className="overflow-hidden rounded-2rem border border-zinc-200 bg-white shadow-sm">
            <div className="relative px-6 py-24 sm:px-12">
              <div className="absolute inset-0 bg-linear-to-br from-zinc-100/40 via-transparent to-zinc-200/20" />

              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 ring-8 ring-zinc-50">
                  <PackageSearch className="h-11 w-11 text-zinc-500" />
                </div>

                <h2 className="mt-8 text-4xl font-bold tracking-tight text-zinc-900">
                  No Orders Yet
                </h2>

                <p className="mt-4 max-w-lg text-lg leading-8 text-zinc-500">
                  You haven&apos;t placed any orders yet. Start exploring our
                  collection and your purchases will appear here after your
                  first purchase.
                </p>

                <Link
                  href="/products"
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-xl"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Browse Products
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Stats */}
            <section className="mb-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-2rem border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
                  <Package className="h-6 w-6 text-zinc-700" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  Total Orders
                </p>

                <div className="mt-4 flex items-end gap-3">
                  <h2 className="text-5xl font-bold tracking-tight text-zinc-900">
                    {orders.length}
                  </h2>

                  <span className="pb-2 text-sm text-zinc-500">
                    Orders placed
                  </span>
                </div>
              </div>

              <div className="rounded-2rem border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
                  <CalendarDays className="h-6 w-6 text-zinc-700" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  Latest Purchase
                </p>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900">
                  {latestPurchase}
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Most recent completed order
                </p>
              </div>
            </section>

            {/* Header */}
            <section className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  History
                </span>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                  Order History
                </h2>

                <p className="mt-2 text-zinc-500">
                  Showing {orders.length} order
                  {orders.length > 1 ? "s" : ""} placed on your account.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
              >
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Link>
            </section>

            {/* Orders */}
            <section className="space-y-8">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
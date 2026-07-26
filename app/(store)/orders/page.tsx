import Link from "next/link";
import getOrders from "@/actions/orderActions/getOrders";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          My Orders
        </h1>

        <p className="mt-2 text-zinc-500">
          View your order history and track purchases.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-zinc-200 bg-white p-12 text-center">
          <h2 className="text-2xl font-semibold">
            No orders yet
          </h2>

          <p className="mt-3 text-zinc-500">
            When you purchase something, your
            orders will appear here.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-white transition hover:bg-zinc-800"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    {order.orderNumber}
                  </h2>

                  <p className="text-sm text-zinc-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {order.items.length} item
                    {order.items.length > 1
                      ? "s"
                      : ""}
                  </p>
                </div>

                <div className="space-y-3 text-left lg:text-right">
                  <p className="text-2xl font-bold">
                    ₹{order.subtotal.toLocaleString()}
                  </p>

                  <div className="flex gap-3 lg:justify-end">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 capitalize">
                      {order.paymentStatus}
                    </span>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 capitalize">
                      {order.orderStatus}
                    </span>
                  </div>

                  <Link
                    href={`/orders/${order._id}`}
                    className="inline-flex font-medium text-black hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
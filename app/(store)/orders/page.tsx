import getOrders from "@/actions/orderActions/getOrders";
import OrderCard from "@/components/order/OrderCard";
import { OrderData } from "@/types/order";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
          Account
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
          My Orders
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-500">
          View your purchase history and track every
          order you&apos;ve placed.
        </p>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center">
          <h2 className="text-xl font-semibold text-zinc-900">
            No orders yet
          </h2>

          <p className="mt-3 text-zinc-500">
            Your completed purchases will appear
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: OrderData) => (
            <OrderCard
              key={order._id}
              order={order}
            />
          ))}
        </div>
      )}
    </main>
  );
}
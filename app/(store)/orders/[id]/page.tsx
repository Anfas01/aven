import { notFound } from "next/navigation";

import getOrder from "@/actions/orderActions/getOrder";
import OrderHero from "@/components/order/orderDetails/OrderHero";
import OrderItemsSection from "@/components/order/orderDetails/OrderItemsSection";
import OrderSummary from "@/components/order/orderDetails/OrderSummary";
import ShippingInformation from "@/components/order/orderDetails/ShippingInformation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-zinc-50 to-zinc-100">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        {/* Hero */}
        <OrderHero order={order} />

        {/* Content */}
        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* Left Column */}
          <div className="space-y-8">
            <OrderItemsSection items={order.items} />

            <ShippingInformation order={order} />
          </div>

          {/* Right Sidebar */}
          <OrderSummary order={order} />
        </div>
      </div>
    </main>
  );
}
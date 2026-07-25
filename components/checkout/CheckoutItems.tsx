import Image from "next/image";

type CheckoutItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  priceId: string;
  quantity: number;
};

type CheckoutItemsProps = {
  items: CheckoutItem[];
};

export default function CheckoutItems({
  items,
}: CheckoutItemsProps) {
  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  return (
    <section>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Your Order
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Review your selected products before proceeding to
            secure checkout.
          </p>
        </div>

        <div className="self-start rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-600">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </div>
      </div>

      {/* Products */}
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.productId}
            className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300"
          >
            {/* Top */}
            <div className="flex gap-4">
              {/* Image */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Product */}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900">
                  {item.name}
                </h3>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
                  <p>
                    Qty{" "}
                    <span className="font-medium text-zinc-900">
                      × {item.quantity}
                    </span>
                  </p>

                  <p>
                    Price{" "}
                    <span className="font-medium text-zinc-900">
                      {currency.format(item.price)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-zinc-200" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">
                Total
              </span>

              <span className="text-xl font-semibold text-zinc-900">
                {currency.format(item.price * item.quantity)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Your Order
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Review the items in your cart before proceeding to
            secure payment.
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <article
            key={item.productId}
            className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md"
          >
            <div className="flex items-center gap-5">
              {/* Product Image */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                  Quantity{" "}
                  <span className="font-medium text-zinc-700">
                    × {item.quantity}
                  </span>
                </p>

                <p className="mt-3 text-sm text-zinc-500">
                  Unit Price{" "}
                  <span className="font-medium text-zinc-800">
                    {currency.format(item.price)}
                  </span>
                </p>
              </div>

              {/* Total */}
              <div className="text-right">
                <p className="text-sm text-zinc-500">
                  Total
                </p>

                <p className="mt-2 text-xl font-semibold text-zinc-900">
                  {currency.format(
                    item.price * item.quantity
                  )}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
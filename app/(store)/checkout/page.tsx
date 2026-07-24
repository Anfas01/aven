import getCart from "@/actions/cartActions/getCart";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import EmptyCheckout from "@/components/checkout/EmptyCheckout";
import CheckoutItems from "@/components/checkout/CheckoutItems";

export default async function CheckoutPage() {
  const items = await getCart();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <EmptyCheckout />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <CheckoutHeader />

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <CheckoutItems items={items} />

        <CheckoutSummary
          items={items}
          subtotal={subtotal}
        />
      </div>
    </main>
  );
}
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import CartHeader from "@/components/cart/CartHeader";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import getCart from "@/actions/cartActions/getCart";

export default async function CartPage() {
  const items = await getCart();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-center px-6">
        <div className="rounded-full bg-zinc-100 p-6">
          <ShoppingBag className="h-10 w-10 text-zinc-500" />
        </div>

        <h1 className="mt-8 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Your cart is empty
        </h1>

        <p className="mt-4 max-w-md text-center leading-7 text-zinc-500">
          Looks like you haven&apos;t added any products yet.
        </p>

        <Link
          href="/products"
          className="mt-10 rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-black"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <CartHeader />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        {/* Cart Items */}
        <section className="space-y-6">
          {items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
            />
          ))}
        </section>

        {/* Order Summary */}
        <OrderSummary
          items={items}
          subtotal={subtotal}
        />
      </div>
    </main>
  );
}
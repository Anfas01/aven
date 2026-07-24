import {
  ShoppingCart,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

export default function CartHeader() {
  return (
    <section className="mb-14">
      {/* Progress */}
      <div className="mb-10 flex items-center justify-center lg:justify-start">
        <div className="flex items-center">
          {/* Cart */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900">
              <ShoppingCart
                size={18}
                className="text-white"
              />
            </div>

            <span className="hidden text-sm font-semibold text-zinc-900 sm:block">
              Cart
            </span>
          </div>

          <div className="mx-5 h-px w-12 bg-zinc-300 sm:w-20" />

          {/* Checkout */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white">
              <CreditCard
                size={18}
                className="text-zinc-400"
              />
            </div>

            <span className="hidden text-sm font-medium text-zinc-400 sm:block">
              Checkout
            </span>
          </div>

          <div className="mx-5 h-px w-12 bg-zinc-300 sm:w-20" />

          {/* Success */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white">
              <CheckCircle2
                size={18}
                className="text-zinc-400"
              />
            </div>

            <span className="hidden text-sm font-medium text-zinc-400 sm:block">
              Complete
            </span>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          Shopping Cart
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          Review Your Cart
        </h1>

        <p className="mt-5 text-lg leading-8 text-zinc-600">
          Review your selected items, update quantities if
          needed, and continue when you&apos;re ready to complete
          your purchase securely.
        </p>
      </div>
    </section>
  );
}
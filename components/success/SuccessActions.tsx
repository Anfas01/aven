import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

export default function SuccessActions() {
  return (
    <section className="rounded-2rem border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Primary Button */}
        <Link
          href="/orders"
          className="
            group
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-full
            bg-zinc-900
            px-6
            py-4
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-black
            hover:shadow-xl
          "
        >
          View My Orders

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        {/* Secondary Button */}
        <Link
          href="/products"
          className="
            group
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-zinc-300
            bg-white
            px-6
            py-4
            text-sm
            font-semibold
            text-zinc-900
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-zinc-900
            hover:bg-zinc-50
          "
        >
          <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />

          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
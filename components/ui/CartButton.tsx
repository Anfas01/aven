"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CartButton() {
  const pathname = usePathname();

  const items = [];

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isActive = pathname === "/cart";

  return (
    <>
      {/* Desktop Cart */}
      <Link
        href="/cart"
        className={`hidden rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 sm:flex sm:items-center sm:gap-2 ${
          isActive
            ? "border-zinc-900 bg-zinc-900 text-white"
            : "border-zinc-200 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
        }`}
      >
        <ShoppingBag size={16} />

        <span>Cart</span>

        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            isActive
              ? "bg-white/20 text-white"
              : "bg-zinc-100 text-zinc-600"
          }`}
        >
          ({totalItems})
        </span>
      </Link>

      {/* Mobile Cart */}
      <Link
        href="/cart"
        className={`relative rounded-full border p-2 transition-all duration-300 sm:hidden ${
          isActive
            ? "border-zinc-900 bg-zinc-900 text-white"
            : "border-zinc-200 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
        }`}
      >
        <ShoppingBag size={18} />

        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {totalItems}
          </span>
        )}
      </Link>
    </>
  );
}
"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import Stripe from "stripe";
import ProductCard from "./ProductCard";

type Props = {
  products: Stripe.Product[];
};

export default function ProductsList({ products }: Props) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Header */}
      <div className="mb-10 flex flex-col items-center text-center sm:mb-14">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 sm:text-sm">
          Collection
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Discover Products
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base sm:leading-8">
          Thoughtfully curated essentials designed with simplicity,
          quality, and timeless aesthetics.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mb-12 w-full max-w-xl sm:mb-16">
        <div className="flex items-center rounded-full border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-zinc-900 focus-within:shadow-lg focus-within:shadow-zinc-200/50 sm:px-5 sm:py-3.5">
          <Search
            size={18}
            className="mr-3 shrink-0 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="mt-20 flex flex-col items-center text-center sm:mt-24">
          <div className="rounded-full bg-zinc-100 p-4">
            <Search className="h-6 w-6 text-zinc-500" />
          </div>

          <h2 className="mt-6 text-xl font-semibold text-zinc-900">
            No products found
          </h2>

          <p className="mt-2 max-w-md text-sm leading-7 text-zinc-500">
            We couldn't find any products matching your search.
            Try a different keyword.
          </p>
        </div>
      )}
    </section>
  );
}
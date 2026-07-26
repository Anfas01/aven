"use client";

import { useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Stripe from "stripe";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "../product/ProductCard";

interface Props {
  products: Stripe.Product[];
}

export default function FeaturedProducts({
  products,
}: Props) {
  // Only show products that have everything needed for ProductCard
  const visibleProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.active &&
          product.name &&
          product.images.length > 0 &&
          product.default_price
      ),
    [products]
  );

  const [autoplay] = useState(() =>
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: visibleProducts.length > 1,
      align: "start",
      containScroll: "trimSnaps",
      skipSnaps: false,
    },
    [autoplay]
  );

  // Don't render the carousel if there are no valid products
  if (visibleProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      {/* Carousel */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="-ml-4 flex sm:-ml-6">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="
                min-w-0
                flex-[0_0_100%]
                pl-4
                sm:flex-[0_0_50%]
                sm:pl-6
                lg:flex-[0_0_33.333%]
                xl:flex-[0_0_25%]
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {visibleProducts.length > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous products"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-zinc-900 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="mx-1 h-5 w-px bg-zinc-200" />

            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next products"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-zinc-900 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
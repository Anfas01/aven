"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Stripe from "stripe";
import ProductCard from "../product/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  products: Stripe.Product[];
}

export default function FeaturedProducts({ products }: Props) {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [autoplay]
  );

  return (
    <section className="relative">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 sm:text-sm">
            Featured
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Latest Collection
          </h2>
        </div>

        {/* Controls */}
        <div className="flex gap-3 self-start sm:self-auto">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!emblaApi}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!emblaApi}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={emblaRef}
        className="overflow-hidden touch-pan-y"
      >
        <div className="-ml-4 flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                min-w-0
                flex-[0_0_100%]
                pl-4
                sm:flex-[0_0_50%]
                lg:flex-[0_0_33.333%]
                xl:flex-[0_0_25%]
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
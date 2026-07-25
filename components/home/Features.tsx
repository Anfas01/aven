import {
  Truck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Worldwide Shipping",
    description:
      "Every order is carefully packaged and delivered through trusted shipping partners with real-time tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Powered by Stripe, every transaction is protected using industry-leading encryption and security standards.",
  },
  {
    icon: Sparkles,
    title: "Premium Craftsmanship",
    description:
      "Every product is selected with an emphasis on quality, timeless design, and long-lasting durability.",
  },
];

export default function Features() {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Why Choose Aven
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Built Around Quality
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-600">
            We focus on delivering products that combine exceptional
            quality, modern aesthetics, and a seamless shopping
            experience from start to finish.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-zinc-100 p-4 transition group-hover:bg-zinc-900">
                  <Icon className="h-6 w-6 text-zinc-900 transition group-hover:text-white" />
                </div>

                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-zinc-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-zinc-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
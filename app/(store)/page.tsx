import stripe from "@/lib/stripe";

import Hero from "@/components/home/Hero";
import FeaturedSection from "@/components/home/FeaturedSection";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

export default async function Home() {
  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  return (
    <main>
      <Hero />

      <FeaturedSection
        products={products.data}
      />

      <Features />

      <CTA />

      <Footer />
    </main>
  );
}
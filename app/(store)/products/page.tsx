import stripe from "@/lib/stripe";
import ProductsList from "@/components/product/ProductsList";

export default async function Page() {
  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <ProductsList products={products.data} />
    </main>
  );
}
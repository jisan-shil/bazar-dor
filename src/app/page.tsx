import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import { getProducts } from "@/lib/api";
import { topFallers, topRisers } from "@/lib/products";
import { toBn } from "@/lib/bn";

export default async function Home() {
  const products = await getProducts();

  if (!products.length) {
    return (
      <EmptyState
        title="তথ্য লোড করা যায়নি"
        message="একটু পরে আবার চেষ্টা করুন।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <span className="text-lg text-error">▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={topRisers(products)} />
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <span className="text-lg text-success">▼</span> আজ দাম কমেছে
        </h2>
        <ProductGrid products={topFallers(products)} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mb-4 text-sm text-base-content/60">
          মোট {toBn(products.length)}টি পণ্যের আজকের দাম
        </p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
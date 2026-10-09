import { notFound } from "next/navigation";
import CategoryList from "@/components/CategoryList";
import EmptyState from "@/components/EmptyState";
import { getCategory, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, products] = await Promise.all([getCategory(slug), getProducts(slug)]);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5 sm:p-6">
        <span className="grid size-14 place-items-center rounded-xl bg-base-200 text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{category.nameBn}</h1>
          <p className="text-sm text-base-content/60">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {products.length ? (
        <CategoryList products={products} />
      ) : (
        <EmptyState title="কোনো পণ্য নেই" message="এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ হয়নি।" />
      )}
    </div>
  );
}
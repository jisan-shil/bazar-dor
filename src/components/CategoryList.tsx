"use client";
import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import { sortProducts, type SortKey } from "@/lib/products";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function CategoryList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const list = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-3 rounded-box border border-base-300 bg-base-100 p-4">
        <label htmlFor="sort" className="text-sm text-base-content/70">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="select select-sm w-auto sm:select-md"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <p className="mb-4 text-sm text-base-content/60">
        মোট {toBn(list.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <ProductGrid products={list} />
    </>
  );
}
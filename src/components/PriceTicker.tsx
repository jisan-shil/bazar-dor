import { fmtNum, unitShort } from "@/lib/bn";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

function Items({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-2 whitespace-nowrap border-r border-base-300 px-5 py-2 text-sm"
        >
          <span>{p.image}</span>
          <span className="font-medium">{p.nameBn}</span>
          <span className="text-base-content/70">
            {fmtNum(p.today)} টাকা/{unitShort(p.unit)}
          </span>
          <ChangeBadge change={p.change} />
        </div>
      ))}
    </>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <div className="overflow-hidden border-y border-base-300 bg-base-100">
      <div className="marquee-track">
        <Items products={products} />
        <div aria-hidden="true" className="flex">
          <Items products={products} />
        </div>
      </div>
    </div>
  );
}
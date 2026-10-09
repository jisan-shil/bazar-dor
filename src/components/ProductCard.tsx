import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { fmtNum, unitLabel } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-box border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl">
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{p.nameBn}</h3>
          <p className="text-xs text-base-content/60">{unitLabel(p.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-xl font-bold">
            {fmtNum(p.today)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
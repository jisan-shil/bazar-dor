import { fmtPct } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const map = {
    up: { cls: "text-error bg-error/10", icon: "▲" },
    down: { cls: "text-success bg-success/10", icon: "▼" },
    flat: { cls: "text-base-content/60 bg-base-200", icon: "—" },
  } as const;
  const { cls, icon } = map[change.dir];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>
      {icon} {fmtPct(change.pct)}
    </span>
  );
}
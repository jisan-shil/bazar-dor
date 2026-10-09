import type { Product } from "./types";

export type SortKey = "default" | "asc" | "desc";

// Sorts by the numeric `today` value, not by the Bengali string
export function sortProducts(list: Product[], key: SortKey): Product[] {
  if (key === "default") return list;
  return [...list].sort((a, b) =>
    key === "asc" ? a.today - b.today : b.today - a.today
  );
}

export const topRisers = (list: Product[], n = 6) =>
  list
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);

export const topFallers = (list: Product[], n = 6) =>
  list
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, n);

export function priceSummary(p: Product) {
  return {
    min: Math.min(...p.markets.map((m) => m.min)),
    max: Math.max(...p.markets.map((m) => m.max)),
    avg: p.today,
  };
}

export const marketAvg = (m: { min: number; max: number }) => (m.min + m.max) / 2;
import type { Category, Product } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_BASE!;

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  return (await get<Category[]>("/categories")) ?? [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  return (await get<Product[]>(`/products${q}`)) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const filtered = await get<Product[]>(`/products?slug=${encodeURIComponent(slug)}`);
  const hit = filtered?.find((p) => p.slug === slug);
  if (hit) return hit;
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
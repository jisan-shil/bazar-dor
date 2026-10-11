export const dynamic = "force-dynamic";

export async function GET() {
  const url = `${
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://openapi.programming-hero.com/api/bazardor"
  }/products`;
  const start = Date.now();
  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      headers: { Accept: "application/json" },
    });
    const text = await res.text();
    return Response.json({
      url,
      status: res.status,
      ms: Date.now() - start,
      contentType: res.headers.get("content-type"),
      snippet: text.slice(0, 200),
    });
  } catch (e) {
    return Response.json({
      url,
      error: String(e),
      cause: String((e as { cause?: unknown }).cause ?? ""),
      ms: Date.now() - start,
    });
  }
}
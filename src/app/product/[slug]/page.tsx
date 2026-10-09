import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug } from "@/lib/api";
import { fmtNum, unitLabel, unitShort } from "@/lib/bn";
import { marketAvg, priceSummary } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const { min, max, avg } = priceSummary(p);
  const diff = Math.abs(p.today - p.yesterday);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-base-content/60">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span>›</span>
        <Link href={`/category/${p.category}`} className="hover:text-primary">
          {p.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-base-content">{p.nameBn}</span>
      </nav>

      <section className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-base-200 text-4xl">
            {p.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{p.nameBn}</h1>
            <div className="mt-1 flex flex-wrap gap-2 text-xs">
              <span className="badge badge-outline">{p.categoryIcon} {p.categoryNameBn}</span>
              <span className="badge badge-outline">{unitLabel(p.unit)}</span>
            </div>
            <p className="mt-2 text-sm text-base-content/70">
              {p.change.dir === "flat" ? (
                "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম{" "}
                  <b>{p.change.dir === "up" ? "বেড়েছে" : "কমেছে"}</b> · {fmtNum(diff)} টাকা
                </>
              )}
            </p>
          </div>
        </div>
        <div className="rounded-box bg-base-200 p-4 text-center sm:min-w-36">
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-3xl font-bold">{fmtNum(p.today)}</p>
          <p className="mb-1 text-xs text-base-content/60">টাকা / {unitShort(p.unit)}</p>
          <ChangeBadge change={p.change} />
        </div>
      </section>

      <section className="rounded-box border border-base-300 bg-base-100 p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন দাম", v: min, cls: "text-success", note: "সবচেয়ে কম দামের বাজার" },
            { label: "সর্বাধিক দাম", v: max, cls: "text-error", note: "সবচেয়ে বেশি দামের বাজার" },
            { label: "গড় দাম", v: avg, cls: "text-success", note: `${unitLabel(p.unit)}-এর হিসাবে` },
          ].map((s) => (
            <div key={s.label} className="rounded-box border border-base-300 p-4">
              <p className="text-xs text-base-content/60">{s.label}</p>
              <p className={`text-2xl font-bold ${s.cls}`}>
                {fmtNum(s.v)} <span className="text-sm font-normal">টাকা</span>
              </p>
              <p className="text-xs text-base-content/60">{s.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-8 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বাধিক</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {p.markets.map((m) => (
                <tr key={m.market + m.division}>
                  <td>{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-right">{fmtNum(m.min)} টাকা</td>
                  <td className="text-right">{fmtNum(m.max)} টাকা</td>
                  <td className="text-right font-bold">{fmtNum(marketAvg(m))} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
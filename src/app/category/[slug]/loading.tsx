import GridSkeleton from "@/components/GridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      <div className="skeleton h-24 w-full rounded-box" />
      <div className="skeleton h-16 w-full rounded-box" />
      <GridSkeleton count={6} />
    </div>
  );
}
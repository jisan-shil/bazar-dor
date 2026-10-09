import GridSkeleton from "@/components/GridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6">
      <div className="skeleton h-56 w-full rounded-box" />
      <div className="skeleton h-8 w-48" />
      <GridSkeleton />
    </div>
  );
}
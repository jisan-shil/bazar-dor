export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6">
      <div className="skeleton h-4 w-48" />
      <div className="skeleton h-40 w-full rounded-box" />
      <div className="skeleton h-96 w-full rounded-box" />
    </div>
  );
}
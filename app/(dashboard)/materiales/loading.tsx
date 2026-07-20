export default function Loading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-36 animate-pulse rounded-2xl bg-slate-900"
        />
      ))}
    </div>
  );
}
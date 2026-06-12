import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-[3/4] rounded-xl animate-shimmer" />
          <Skeleton className="h-4 w-3/4 animate-shimmer" />
          <Skeleton className="h-3 w-1/2 animate-shimmer" />
        </div>
      ))}
    </div>
  );
}

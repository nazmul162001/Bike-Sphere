import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6 px-4 py-16 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-16 w-full max-w-xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-72" />
        ))}
      </div>
    </div>
  );
}

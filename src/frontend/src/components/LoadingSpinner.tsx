import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={cn(
        "rounded-full border-muted border-t-accent animate-spin",
        sizeClasses[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

interface VehicleGridSkeletonProps {
  count?: number;
}

export function VehicleGridSkeleton({ count = 6 }: VehicleGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      data-ocid="vehicles.loading_state"
    >
      {Array.from({ length: count }, (_, i) => `skeleton-${i}`).map((key) => (
        <div
          key={key}
          className="rounded-lg border border-border overflow-hidden bg-card shadow-card"
        >
          <Skeleton className="aspect-[16/9] w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading…" }: PageLoadingProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[40vh] gap-4"
      data-ocid="page.loading_state"
    >
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground text-sm animate-pulse">{message}</p>
    </div>
  );
}

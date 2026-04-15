import { cn } from "@/lib/utils";

type BadgeVariant =
  | "available"
  | "unavailable"
  | "confirmed"
  | "cancelled"
  | "car"
  | "suv"
  | "van"
  | "truck"
  | "motorcycle"
  | "default"
  | "admin";

interface StatusBadgeProps {
  variant: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  available: "bg-accent/10 text-accent border border-accent/25 font-semibold",
  unavailable:
    "bg-destructive/10 text-destructive border border-destructive/25 font-semibold",
  confirmed: "bg-accent/10 text-accent border border-accent/25 font-semibold",
  cancelled:
    "bg-destructive/10 text-destructive border border-destructive/25 font-semibold",
  car: "bg-primary/10 text-primary border border-primary/20",
  suv: "bg-accent/10 text-accent border border-accent/20",
  van: "bg-secondary text-secondary-foreground border border-border",
  truck: "bg-muted text-muted-foreground border border-border",
  motorcycle: "bg-destructive/10 text-destructive border border-destructive/20",
  admin: "bg-primary/15 text-primary border border-primary/30 font-semibold",
  default: "bg-muted text-muted-foreground border border-border",
};

const DEFAULT_LABELS: Partial<Record<BadgeVariant, string>> = {
  available: "Available",
  unavailable: "Unavailable",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  admin: "Admin",
};

export function StatusBadge({
  variant,
  children,
  className,
}: StatusBadgeProps) {
  const label = children ?? DEFAULT_LABELS[variant] ?? variant;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {(variant === "available" || variant === "confirmed") && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}
      {(variant === "unavailable" || variant === "cancelled") && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}
      {label}
    </span>
  );
}

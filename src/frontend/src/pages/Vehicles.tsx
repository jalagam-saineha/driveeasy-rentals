import { VehicleGridSkeleton } from "@/components/LoadingSpinner";
import { VehicleCard } from "@/components/VehicleCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useVehicles } from "@/hooks/use-vehicles";
import { VEHICLE_CATEGORY_LABELS, VehicleCategory } from "@/types";
import { ArrowDownUp, Calendar, Car, Filter, RotateCcw, X } from "lucide-react";
import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortKey = "price-asc" | "price-desc" | "name-asc";

interface CategoryOption {
  value: string;
  label: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name A–Z" },
];

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: "all", label: "All" },
  ...Object.values(VehicleCategory).map((cat) => ({
    value: cat,
    label: VEHICLE_CATEGORY_LABELS[cat] ?? cat,
  })),
];

// Reads a URL query param from window.location (non-router read)
function getQueryParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export function VehiclesPage() {
  const { data: vehicles, isLoading } = useVehicles();

  // URL date params (from search form on homepage)
  const pickupParam = getQueryParam("pickup");
  const dropoffParam = getQueryParam("dropoff");

  // Filter state
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Derived: max price in data for display hint
  const maxDataPrice = useMemo(() => {
    if (!vehicles?.length) return 0;
    return Math.max(...vehicles.map((v) => Number(v.pricePerDay)));
  }, [vehicles]);

  const filtered = useMemo(() => {
    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;

    return (vehicles ?? [])
      .filter((v) => {
        const matchCategory = category === "all" || v.category === category;
        const matchAvail = !availableOnly || v.available;
        const price = Number(v.pricePerDay);
        const matchMin = min === null || price >= min;
        const matchMax = max === null || price <= max;
        return matchCategory && matchAvail && matchMin && matchMax;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return Number(a.pricePerDay - b.pricePerDay);
        if (sort === "price-desc") return Number(b.pricePerDay - a.pricePerDay);
        return a.name.localeCompare(b.name);
      });
  }, [vehicles, category, availableOnly, sort, minPrice, maxPrice]);

  const hasActiveFilters =
    category !== "all" || availableOnly || minPrice !== "" || maxPrice !== "";

  function clearFilters() {
    setCategory("all");
    setAvailableOnly(false);
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <div data-ocid="vehicles.page">
      {/* ── Page Header ────────────────────────────────────── */}
      <section className="bg-card border-b border-border py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground mb-1">
                Our Fleet
              </h1>
              <p className="text-muted-foreground text-sm">
                {isLoading
                  ? "Loading vehicles…"
                  : `${vehicles?.length ?? 0} vehicles in our collection`}
              </p>
            </div>

            {/* Date context banner (if URL params present) */}
            {(pickupParam || dropoffParam) && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-sm"
                data-ocid="vehicles.date_filter.panel"
              >
                <Calendar className="w-4 h-4 text-accent shrink-0" />
                <span className="text-foreground">
                  {pickupParam && (
                    <span>
                      <span className="text-muted-foreground">Pick-up: </span>
                      <span className="font-medium text-accent">
                        {formatDate(pickupParam)}
                      </span>
                    </span>
                  )}
                  {pickupParam && dropoffParam && (
                    <span className="text-muted-foreground mx-2">→</span>
                  )}
                  {dropoffParam && (
                    <span>
                      <span className="text-muted-foreground">Drop-off: </span>
                      <span className="font-medium text-accent">
                        {formatDate(dropoffParam)}
                      </span>
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Filter Bar ─────────────────────────────────────── */}
      <section className="bg-card border-b border-border sticky top-16 z-30 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-3">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Category
            </span>
            {CATEGORY_OPTIONS.map((opt) => {
              const isActive = category === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCategory(opt.value)}
                  data-ocid={`vehicles.category.${opt.value}`}
                  className={[
                    "px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
                    isActive
                      ? "bg-accent text-accent-foreground border-accent shadow-sm"
                      : "bg-background text-foreground border-border hover:border-accent/50 hover:text-accent",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <Separator className="mb-3" />

          {/* Second row: price + availability + sort + clear */}
          <div className="flex flex-wrap items-end gap-3">
            {/* Price range */}
            <div className="flex items-end gap-2">
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="min-price"
                  className="text-xs text-muted-foreground"
                >
                  Min $/day
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-24 h-8 text-sm bg-background"
                  min={0}
                  data-ocid="vehicles.min_price.input"
                />
              </div>
              <span className="text-muted-foreground mb-2">–</span>
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="max-price"
                  className="text-xs text-muted-foreground"
                >
                  Max $/day
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder={maxDataPrice ? String(maxDataPrice) : "∞"}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-24 h-8 text-sm bg-background"
                  min={0}
                  data-ocid="vehicles.max_price.input"
                />
              </div>
            </div>

            {/* Available only */}
            <Button
              type="button"
              variant={availableOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setAvailableOnly((v) => !v)}
              className={[
                "h-8 gap-1.5",
                availableOnly
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 border-accent"
                  : "",
              ].join(" ")}
              data-ocid="vehicles.available_only.toggle"
            >
              <span
                className={`w-2 h-2 rounded-full ${availableOnly ? "bg-accent-foreground" : "bg-muted-foreground"}`}
              />
              Available only
            </Button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort */}
            <div className="flex items-end gap-2">
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowDownUp className="w-3 h-3" />
                  Sort
                </Label>
                <Select
                  value={sort}
                  onValueChange={(v) => setSort(v as SortKey)}
                >
                  <SelectTrigger
                    className="w-44 h-8 bg-background text-sm"
                    data-ocid="vehicles.sort.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 gap-1.5 text-muted-foreground hover:text-destructive"
                data-ocid="vehicles.clear_filters.button"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────────── */}
      <section className="bg-background py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <VehicleGridSkeleton count={6} />
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-24 gap-5"
              data-ocid="vehicles.empty_state"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Car className="w-9 h-9 text-muted-foreground/50" />
              </div>
              <div className="text-center">
                <h3 className="font-display font-semibold text-foreground text-lg mb-1">
                  No vehicles found
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Try adjusting your filters to explore more of our fleet.
                </p>
              </div>
              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1.5"
                  data-ocid="vehicles.empty_clear_filters.button"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear all filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Result count + active filter chips */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span
                  className="text-sm text-muted-foreground"
                  data-ocid="vehicles.result_count"
                >
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {filtered.length}
                  </span>{" "}
                  vehicle{filtered.length !== 1 ? "s" : ""}
                  {vehicles && filtered.length < vehicles.length && (
                    <span className="text-muted-foreground">
                      {" "}
                      of {vehicles.length}
                    </span>
                  )}
                </span>

                {/* Active filter pills */}
                {category !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => setCategory("all")}
                    data-ocid="vehicles.active_filter.category"
                  >
                    {VEHICLE_CATEGORY_LABELS[category] ?? category}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {availableOnly && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => setAvailableOnly(false)}
                    data-ocid="vehicles.active_filter.available"
                  >
                    Available only
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {(minPrice !== "" || maxPrice !== "") && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    data-ocid="vehicles.active_filter.price"
                  >
                    ${minPrice || "0"} – ${maxPrice || "∞"}/day
                    <X className="w-3 h-3" />
                  </Badge>
                )}
              </div>

              {/* Vehicle grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                data-ocid="vehicles.list"
              >
                {filtered.map((vehicle, i) => (
                  <VehicleCard
                    key={vehicle.id.toString()}
                    vehicle={vehicle}
                    index={i}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

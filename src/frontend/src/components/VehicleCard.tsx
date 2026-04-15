import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { VehicleView } from "@/types";
import { VEHICLE_CATEGORY_LABELS } from "@/types";
import { Link } from "@tanstack/react-router";
import { Calendar, Fuel, Star } from "lucide-react";

interface VehicleCardProps {
  vehicle: VehicleView;
  index?: number;
}

const FALLBACK_IMAGE = "/assets/images/vehicle-placeholder.svg";

const CATEGORY_COLORS: Record<string, string> = {
  car: "bg-primary/10 text-primary border-primary/20",
  suv: "bg-accent/10 text-accent border-accent/20",
  van: "bg-secondary text-secondary-foreground border-border",
  truck: "bg-muted text-muted-foreground border-border",
  motorcycle: "bg-destructive/10 text-destructive border-destructive/20",
};

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const categoryLabel =
    VEHICLE_CATEGORY_LABELS[vehicle.category] ?? vehicle.category;
  const categoryClass =
    CATEGORY_COLORS[vehicle.category] ?? "bg-muted text-muted-foreground";

  return (
    <Card
      className="group overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 bg-card"
      data-ocid={`vehicle.item.${index + 1}`}
    >
      {/* Vehicle Image */}
      <div className="relative overflow-hidden aspect-[16/9] bg-muted">
        <img
          src={vehicle.imageUrl || FALLBACK_IMAGE}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${
              vehicle.available
                ? "bg-accent/90 text-accent-foreground border-accent/30"
                : "bg-destructive/80 text-destructive-foreground border-destructive/20"
            }`}
            data-ocid={`vehicle.availability.${index + 1}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${vehicle.available ? "bg-accent-foreground" : "bg-destructive-foreground"}`}
            />
            {vehicle.available ? "Available" : "Unavailable"}
          </span>
        </div>
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${categoryClass}`}
          >
            {categoryLabel}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Name & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-foreground text-base leading-tight line-clamp-1">
            {vehicle.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span className="font-medium">4.8</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {vehicle.description}
        </p>

        {/* Features */}
        {vehicle.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {vehicle.features.slice(0, 3).map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className="text-xs font-normal px-2 py-0.5"
              >
                {feature}
              </Badge>
            ))}
            {vehicle.features.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs font-normal px-2 py-0.5"
              >
                +{vehicle.features.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-xl text-accent">
              ${Number(vehicle.pricePerDay).toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">/ day</span>
          </div>
          <Link
            to="/vehicles/$vehicleId"
            params={{ vehicleId: vehicle.id.toString() }}
          >
            <Button
              size="sm"
              disabled={!vehicle.available}
              className="gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
              data-ocid={`vehicle.book_button.${index + 1}`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {vehicle.available ? "Book Now" : "Unavailable"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

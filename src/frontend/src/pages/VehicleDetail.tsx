import { StatusBadge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useVehicle } from "@/hooks/use-vehicles";
import { VEHICLE_CATEGORY_LABELS } from "@/types";
import type { BookingView } from "@/types";
import { Link } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  ClipboardCopy,
  LogIn,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FALLBACK_IMAGE = "/assets/images/vehicle-placeholder.svg";

interface ConfirmationState {
  booking: BookingView;
  totalPrice: number;
}

// ─── Loading skeleton ────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Skeleton className="h-6 w-32 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
              <Skeleton key={i} className="h-10 rounded-lg" />
            ))}
          </div>
        </div>
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    </div>
  );
}

// ─── Booking success panel ───────────────────────────────────────────────────
function BookingConfirmation({
  confirmation,
  vehicle,
  onReset,
}: {
  confirmation: ConfirmationState;
  vehicle: { name: string };
  onReset: () => void;
}) {
  const { booking } = confirmation;

  function copyRef() {
    navigator.clipboard.writeText(booking.referenceNumber);
    toast.success("Reference copied to clipboard");
  }

  return (
    <div className="space-y-5 text-center" data-ocid="booking.success_state">
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
      </div>
      <div>
        <h3 className="font-display font-bold text-lg text-foreground">
          Booking Confirmed!
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {vehicle.name} is reserved for you.
        </p>
      </div>

      {/* Reference number */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-1">Reference Number</p>
        <div className="flex items-center justify-center gap-2">
          <span className="font-mono font-bold text-accent text-lg tracking-widest">
            {booking.referenceNumber}
          </span>
          <button
            type="button"
            onClick={copyRef}
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="Copy reference number"
            data-ocid="booking.copy_ref.button"
          >
            <ClipboardCopy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Date summary */}
      <div className="text-sm space-y-1.5 text-left bg-muted/40 rounded-lg p-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Pickup</span>
          <span className="font-medium text-foreground">
            {new Date(
              Number(booking.pickupDate) / 1_000_000,
            ).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Dropoff</span>
          <span className="font-medium text-foreground">
            {new Date(
              Number(booking.dropoffDate) / 1_000_000,
            ).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex justify-between border-t border-border pt-1.5 mt-1">
          <span className="text-muted-foreground">Total paid</span>
          <span className="font-display font-bold text-accent">
            ${confirmation.totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <Link to="/dashboard">
          <Button
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            data-ocid="booking.view_bookings.button"
          >
            View My Bookings
          </Button>
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={onReset}
          data-ocid="booking.book_again.button"
        >
          Book another vehicle
        </Button>
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export function VehicleDetailPage() {
  const { vehicleId } = useParams({ from: "/vehicles/$vehicleId" });
  const vehicleIdBigInt = BigInt(vehicleId);
  const { data: vehicle, isLoading } = useVehicle(vehicleIdBigInt);
  const { mutate: createBooking, isPending } = useCreateBooking();
  const { isAuthenticated, login } = useAuth();

  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(
    null,
  );

  const today = new Date().toISOString().split("T")[0];

  const totalDays =
    pickupDate && dropoffDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const totalPrice = vehicle ? totalDays * Number(vehicle.pricePerDay) : 0;

  function handleBook() {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!pickupDate || !dropoffDate) {
      setBookingError("Please select both pickup and dropoff dates.");
      return;
    }
    if (new Date(dropoffDate) <= new Date(pickupDate)) {
      setBookingError("Dropoff date must be after pickup date.");
      return;
    }
    setBookingError(null);
    createBooking(
      {
        vehicleId: vehicleIdBigInt,
        pickupDate: BigInt(new Date(pickupDate).getTime()) * BigInt(1_000_000),
        dropoffDate:
          BigInt(new Date(dropoffDate).getTime()) * BigInt(1_000_000),
      },
      {
        onSuccess: (result) => {
          if (result.__kind__ === "ok") {
            setConfirmation({ booking: result.ok, totalPrice });
          } else {
            setBookingError(result.err);
          }
        },
        onError: (e) => {
          setBookingError(
            e.message ?? "Something went wrong. Please try again.",
          );
        },
      },
    );
  }

  if (isLoading) {
    return (
      <div data-ocid="vehicle_detail.loading_state">
        <div className="bg-card border-b border-border py-4">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <DetailSkeleton />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[50vh] gap-4"
        data-ocid="vehicle.error_state"
      >
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-2">
          <AlertCircle className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="font-display font-semibold text-xl text-foreground">
          Vehicle not found
        </h2>
        <p className="text-muted-foreground text-sm">
          This vehicle may have been removed or the link is invalid.
        </p>
        <Link to="/vehicles">
          <Button variant="outline" className="gap-2 mt-2">
            <ArrowLeft className="w-4 h-4" /> Back to Fleet
          </Button>
        </Link>
      </div>
    );
  }

  const categoryLabel =
    VEHICLE_CATEGORY_LABELS[vehicle.category] ?? vehicle.category;

  return (
    <div data-ocid="vehicle_detail.page">
      {/* Breadcrumb bar */}
      <div className="bg-card border-b border-border py-4">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            data-ocid="vehicle_detail.back.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Fleet
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {vehicle.name}
          </span>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* ── Left column: details ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-muted shadow-card relative">
              <img
                src={vehicle.imageUrl || FALLBACK_IMAGE}
                alt={vehicle.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
              {/* Availability overlay badge */}
              <div
                className="absolute top-4 left-4"
                data-ocid="vehicle_detail.availability.badge"
              >
                <StatusBadge
                  variant={vehicle.available ? "available" : "unavailable"}
                />
              </div>
            </div>

            {/* Title & price row */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <StatusBadge
                    variant={
                      vehicle.category as
                        | "car"
                        | "suv"
                        | "van"
                        | "truck"
                        | "motorcycle"
                    }
                  >
                    {categoryLabel}
                  </StatusBadge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold text-foreground">
                      4.8
                    </span>
                    <span className="text-sm text-muted-foreground">
                      (248 reviews)
                    </span>
                  </div>
                </div>
                <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground leading-tight">
                  {vehicle.name}
                </h1>
              </div>
              <div className="text-right shrink-0">
                <div className="font-display font-bold text-3xl text-accent">
                  ${Number(vehicle.pricePerDay).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">per day</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display font-semibold text-foreground mb-3">
                About This Vehicle
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            {/* Features */}
            {vehicle.features.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-foreground mb-4">
                  Features &amp; Amenities
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {vehicle.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-foreground bg-muted/40 rounded-lg px-3 py-2.5"
                    >
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Shield, label: "Fully Insured" },
                { icon: Zap, label: "Instant Confirm" },
                { icon: Check, label: "Inspected & Clean" },
                { icon: Calendar, label: "Flexible Pickup" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 text-center p-4 rounded-xl bg-card border border-border"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: booking widget ── */}
          <div className="lg:col-span-1">
            <Card
              className="sticky top-24 border border-border shadow-elevated"
              data-ocid="booking.widget"
            >
              <CardContent className="p-6">
                {confirmation ? (
                  <BookingConfirmation
                    confirmation={confirmation}
                    vehicle={vehicle}
                    onReset={() => {
                      setConfirmation(null);
                      setPickupDate("");
                      setDropoffDate("");
                    }}
                  />
                ) : (
                  <div className="space-y-5">
                    <div>
                      <h2 className="font-display font-bold text-xl text-foreground">
                        Book This Vehicle
                      </h2>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Instant confirmation · Free cancellation
                      </p>
                    </div>

                    {/* Date inputs */}
                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="booking-pickup"
                          className="text-sm font-medium text-foreground block mb-1.5"
                        >
                          Pickup Date
                        </label>
                        <input
                          id="booking-pickup"
                          type="date"
                          min={today}
                          value={pickupDate}
                          onChange={(e) => {
                            setPickupDate(e.target.value);
                            setBookingError(null);
                          }}
                          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-smooth"
                          data-ocid="booking.pickup_date.input"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="booking-dropoff"
                          className="text-sm font-medium text-foreground block mb-1.5"
                        >
                          Dropoff Date
                        </label>
                        <input
                          id="booking-dropoff"
                          type="date"
                          min={pickupDate || today}
                          value={dropoffDate}
                          onChange={(e) => {
                            setDropoffDate(e.target.value);
                            setBookingError(null);
                          }}
                          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-smooth"
                          data-ocid="booking.dropoff_date.input"
                        />
                      </div>
                    </div>

                    {/* Price summary */}
                    {totalDays > 0 && (
                      <div className="bg-muted/50 rounded-xl p-4 space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>
                            ${Number(vehicle.pricePerDay).toLocaleString()} ×{" "}
                            {totalDays} day{totalDays !== 1 ? "s" : ""}
                          </span>
                          <span>${totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-border pt-2 flex justify-between font-display font-bold text-foreground">
                          <span>Total</span>
                          <span className="text-accent">
                            ${totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Inline error */}
                    {bookingError && (
                      <div
                        className="flex items-start gap-2 bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2.5 text-sm text-destructive"
                        data-ocid="booking.error_state"
                      >
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{bookingError}</span>
                      </div>
                    )}

                    {/* CTA */}
                    {!isAuthenticated ? (
                      <Button
                        type="button"
                        className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                        size="lg"
                        onClick={login}
                        data-ocid="booking.login.button"
                      >
                        <LogIn className="w-4 h-4" />
                        Sign In to Book
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                        size="lg"
                        disabled={!vehicle.available || isPending}
                        onClick={handleBook}
                        data-ocid="booking.submit_button"
                      >
                        <Calendar className="w-4 h-4" />
                        {!vehicle.available
                          ? "Currently Unavailable"
                          : isPending
                            ? "Confirming…"
                            : "Confirm Booking"}
                      </Button>
                    )}

                    {!vehicle.available && (
                      <p className="text-xs text-destructive text-center">
                        This vehicle is currently not available for new
                        bookings.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

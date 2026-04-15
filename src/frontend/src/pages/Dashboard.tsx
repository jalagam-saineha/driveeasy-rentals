import { StatusBadge } from "@/components/Badge";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useCancelBooking, useMyBookings } from "@/hooks/use-bookings";
import { useVehicles } from "@/hooks/use-vehicles";
import { BookingStatus } from "@/types";
import type { BookingView } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  User,
  XCircle,
} from "lucide-react";

function formatDate(ns: bigint): string {
  return new Date(Number(ns) / 1_000_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatPrice(cents: bigint): string {
  return `$${(Number(cents) / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function truncatePrincipal(principal: string): string {
  if (principal.length <= 20) return principal;
  return `${principal.slice(0, 10)}…${principal.slice(-6)}`;
}

interface BookingCardProps {
  booking: BookingView;
  vehicleName: string;
  index: number;
  showCancel?: boolean;
}

function BookingCard({
  booking,
  vehicleName,
  index,
  showCancel = false,
}: BookingCardProps) {
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();
  const isConfirmed = booking.status === BookingStatus.confirmed;
  const isCancelled = booking.status === BookingStatus.cancelled;

  return (
    <Card
      className={`border border-border shadow-card transition-smooth hover:shadow-elevated ${isCancelled ? "opacity-65" : ""}`}
      data-ocid={`booking.item.${index}`}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Left color strip */}
          <div
            className={`w-full sm:w-1.5 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg h-1.5 sm:h-auto shrink-0 ${
              isConfirmed ? "bg-accent" : "bg-muted-foreground/30"
            }`}
          />

          <div className="flex-1 p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              {/* Booking info */}
              <div className="flex items-start gap-4 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isConfirmed ? "bg-accent/10" : "bg-muted"
                  }`}
                >
                  <Car
                    className={`w-5 h-5 ${isConfirmed ? "text-accent" : "text-muted-foreground"}`}
                  />
                </div>

                <div className="min-w-0">
                  {/* Status + ref */}
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <StatusBadge
                      variant={isConfirmed ? "confirmed" : "cancelled"}
                    />
                    <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                      #{booking.referenceNumber}
                    </span>
                  </div>

                  {/* Vehicle name */}
                  <p className="font-display font-semibold text-foreground text-base truncate max-w-xs">
                    {vehicleName}
                  </p>

                  {/* Dates */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(booking.pickupDate)}
                    </span>
                    <ChevronRight className="w-3 h-3 text-muted-foreground/50 hidden sm:block" />
                    <span className="flex items-center gap-1.5 sm:ml-0 ml-5">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(booking.dropoffDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price + action */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 sm:ml-4">
                <div className="text-right">
                  <p className="font-display font-bold text-lg text-foreground">
                    {formatPrice(booking.totalAmount)}
                  </p>
                  <p className="text-xs text-muted-foreground">total</p>
                </div>

                {showCancel && isConfirmed && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/50 transition-smooth"
                        data-ocid={`booking.cancel_button.${index}`}
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent data-ocid="booking.cancel.dialog">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-display">
                          Cancel this booking?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You're about to cancel{" "}
                          <strong className="text-foreground">
                            {vehicleName}
                          </strong>{" "}
                          (ref{" "}
                          <span className="font-mono">
                            #{booking.referenceNumber}
                          </span>
                          ). This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-ocid="booking.cancel.cancel_button">
                          Keep Booking
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => cancelBooking(booking.id)}
                          disabled={isCancelling}
                          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                          data-ocid="booking.cancel.confirm_button"
                        >
                          {isCancelling ? "Cancelling…" : "Yes, Cancel Booking"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BookingListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((k) => (
        <Skeleton key={k} className="h-24 w-full rounded-xl" />
      ))}
    </div>
  );
}

interface EmptyStateProps {
  tab: "upcoming" | "past";
}

function EmptyState({ tab }: EmptyStateProps) {
  return (
    <Card
      className="border border-dashed border-border bg-muted/10"
      data-ocid={`${tab}_bookings.empty_state`}
    >
      <CardContent className="flex flex-col items-center justify-center py-14 gap-3 text-center">
        {tab === "upcoming" ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-1">
              <Calendar className="w-7 h-7 text-accent/60" />
            </div>
            <p className="font-display font-semibold text-foreground text-lg">
              No upcoming bookings
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Browse our premium fleet and book your perfect ride for any
              occasion.
            </p>
            <Link to="/vehicles">
              <Button
                type="button"
                size="sm"
                className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90 gap-2 transition-smooth"
                data-ocid="dashboard.browse_fleet.button"
              >
                <Car className="w-4 h-4" />
                Browse Fleet
              </Button>
            </Link>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-1">
              <FileText className="w-7 h-7 text-muted-foreground/40" />
            </div>
            <p className="font-display font-semibold text-foreground text-lg">
              No past bookings
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your completed and cancelled bookings will appear here.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function DashboardContent() {
  const { data: bookings, isLoading: bookingsLoading } = useMyBookings();
  const { data: vehicles, isLoading: vehiclesLoading } = useVehicles();
  const { principalText } = useAuth();

  const isLoading = bookingsLoading || vehiclesLoading;

  // Build vehicle name lookup map
  const vehicleMap = new Map<string, string>(
    (vehicles ?? []).map((v) => [v.id.toString(), v.name]),
  );

  const getVehicleName = (vehicleId: bigint): string =>
    vehicleMap.get(vehicleId.toString()) ?? "Vehicle";

  const now = Date.now() * 1_000_000; // convert ms to ns for comparison

  const upcomingBookings = (bookings ?? []).filter(
    (b) => b.status === BookingStatus.confirmed && Number(b.pickupDate) >= now,
  );

  const pastBookings = (bookings ?? []).filter(
    (b) =>
      b.status === BookingStatus.cancelled ||
      (b.status === BookingStatus.confirmed && Number(b.pickupDate) < now),
  );

  const totalBookings = (bookings ?? []).length;

  return (
    <div data-ocid="dashboard.page" className="min-h-screen bg-background">
      {/* Hero header */}
      <section className="bg-card border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-2xl text-foreground leading-tight">
                    My Dashboard
                  </h1>
                  {principalText && (
                    <p className="text-xs text-muted-foreground font-mono">
                      {truncatePrincipal(principalText)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-xl border border-border">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Total bookings:</span>
                <span className="font-display font-semibold text-foreground">
                  {isLoading ? "—" : totalBookings}
                </span>
              </div>
              <Link to="/vehicles">
                <Button
                  type="button"
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 transition-smooth"
                  data-ocid="dashboard.book_now.button"
                >
                  <Car className="w-4 h-4" />
                  Book a Car
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Tabs defaultValue="upcoming" data-ocid="dashboard.tabs">
          <TabsList className="mb-8 bg-muted/50 p-1">
            <TabsTrigger
              value="upcoming"
              className="gap-2 font-display data-[state=active]:bg-card data-[state=active]:shadow-card transition-smooth"
              data-ocid="dashboard.upcoming.tab"
            >
              <Calendar className="w-4 h-4" />
              Upcoming
              {!isLoading && upcomingBookings.length > 0 && (
                <span className="ml-1 text-xs bg-accent/15 text-accent border border-accent/20 px-1.5 py-0 rounded-full font-semibold">
                  {upcomingBookings.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="gap-2 font-display data-[state=active]:bg-card data-[state=active]:shadow-card transition-smooth"
              data-ocid="dashboard.past.tab"
            >
              <FileText className="w-4 h-4" />
              Past
              {!isLoading && pastBookings.length > 0 && (
                <span className="ml-1 text-xs bg-muted text-muted-foreground border border-border px-1.5 py-0 rounded-full font-semibold">
                  {pastBookings.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Upcoming tab */}
          <TabsContent value="upcoming" data-ocid="dashboard.upcoming.panel">
            {isLoading ? (
              <BookingListSkeleton />
            ) : upcomingBookings.length === 0 ? (
              <EmptyState tab="upcoming" />
            ) : (
              <div className="space-y-3" data-ocid="upcoming_bookings.list">
                {upcomingBookings.map((booking, i) => (
                  <BookingCard
                    key={booking.id.toString()}
                    booking={booking}
                    vehicleName={getVehicleName(booking.vehicleId)}
                    index={i + 1}
                    showCancel
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Past tab */}
          <TabsContent value="past" data-ocid="dashboard.past.panel">
            {isLoading ? (
              <BookingListSkeleton />
            ) : pastBookings.length === 0 ? (
              <EmptyState tab="past" />
            ) : (
              <div className="space-y-3" data-ocid="past_bookings.list">
                {pastBookings.map((booking, i) => (
                  <BookingCard
                    key={booking.id.toString()}
                    booking={booking}
                    vehicleName={getVehicleName(booking.vehicleId)}
                    index={i + 1}
                    showCancel={false}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

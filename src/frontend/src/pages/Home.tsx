import { VehicleGridSkeleton } from "@/components/LoadingSpinner";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useVehicles } from "@/hooks/use-vehicles";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Car,
  Clock,
  Headphones,
  Search,
  Shield,
  Star,
} from "lucide-react";
import { useState } from "react";

const STATS = [
  { value: "500+", label: "Vehicles" },
  { value: "50K+", label: "Happy Customers" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];

const WHY_CHOOSE_US = [
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    body: "Book your vehicle in minutes with our streamlined checkout. Instant confirmation, no phone calls required.",
  },
  {
    icon: Car,
    title: "Wide Selection",
    body: "From compact city cars to rugged SUVs and luxury sedans — hundreds of vehicles across every category.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    body: "Our team is available around the clock to assist you before, during, and after your rental journey.",
  },
];

export function HomePage() {
  const { data: vehicles, isLoading } = useVehicles();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const featuredVehicles =
    vehicles?.filter((v) => v.available).slice(0, 6) ?? [];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set("pickup", pickup);
    if (dropoff) params.set("dropoff", dropoff);
    navigate({
      to: "/vehicles",
      search: params.toString() as unknown as Record<string, string>,
    });
  }

  return (
    <div data-ocid="home.page">
      {/* ── Hero ── */}
      <section
        className="relative bg-card border-b border-border overflow-hidden"
        id="hero"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy + search */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Real-time availability
                </div>
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                  Drive Your <span className="text-accent">Way</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Premium vehicles for every journey. Book instantly, drive
                  confidently — your perfect ride is just a few clicks away.
                </p>
              </div>

              {/* Date search bar */}
              <form
                onSubmit={handleSearch}
                className="bg-background border border-border rounded-2xl p-4 shadow-card flex flex-col sm:flex-row gap-3 items-end"
                data-ocid="hero.search.form"
              >
                <div className="flex-1 space-y-1.5 min-w-0">
                  <Label
                    htmlFor="pickup-date"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    Pickup Date
                  </Label>
                  <Input
                    id="pickup-date"
                    type="date"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-card border-border focus-visible:ring-accent"
                    data-ocid="hero.pickup_date.input"
                  />
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <Label
                    htmlFor="dropoff-date"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    Drop-off Date
                  </Label>
                  <Input
                    id="dropoff-date"
                    type="date"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    min={pickup || new Date().toISOString().split("T")[0]}
                    className="bg-card border-border focus-visible:ring-accent"
                    data-ocid="hero.dropoff_date.input"
                  />
                </div>
                <Button
                  type="submit"
                  size="default"
                  className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap px-5 shrink-0"
                  data-ocid="hero.search.submit_button"
                >
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </form>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 pt-1">
                {STATS.map(({ value, label }) => (
                  <div key={label}>
                    <div className="font-display font-bold text-xl text-foreground">
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>

              {!isAuthenticated && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={login}
                  className="gap-2"
                  data-ocid="hero.sign_in.button"
                >
                  Sign In to Book
                </Button>
              )}
            </div>

            {/* Right — hero visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated bg-muted">
                <img
                  src="/assets/images/hero-car.jpg"
                  alt="Premium DriveEasy rental vehicle"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/images/vehicle-placeholder.svg";
                  }}
                />
                {/* Floating rating badge */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-elevated border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-foreground">
                        4.9 / 5.0
                      </div>
                      <div className="text-xs text-muted-foreground">
                        12,400+ reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Vehicles ── */}
      <section className="bg-background py-16" id="featured">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                Featured Vehicles
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Top-rated vehicles ready to book
              </p>
            </div>
            <Link to="/vehicles">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1.5 text-accent hover:text-accent"
                data-ocid="home.view_all.button"
              >
                View All Vehicles <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <VehicleGridSkeleton count={6} />
          ) : featuredVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredVehicles.map((vehicle, i) => (
                  <VehicleCard
                    key={vehicle.id.toString()}
                    vehicle={vehicle}
                    index={i}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-10">
                <Link to="/vehicles">
                  <Button
                    type="button"
                    size="lg"
                    className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
                    data-ocid="home.view_all_cta.button"
                  >
                    View All Vehicles
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-16 gap-4"
              data-ocid="vehicles.empty_state"
            >
              <Car className="w-12 h-12 text-muted-foreground/40" />
              <p className="text-muted-foreground">
                No vehicles available right now.
              </p>
              <Link to="/vehicles">
                <Button type="button" variant="outline" size="sm">
                  Browse All Vehicles
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section
        className="bg-muted/30 border-t border-b border-border py-16"
        id="why-choose-us"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-foreground">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              DriveEasy delivers a rental experience built around simplicity,
              choice, and round-the-clock support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map(({ icon: Icon, title, body }) => (
              <Card
                key={title}
                className="border border-border shadow-card bg-card transition-smooth hover:shadow-elevated hover:border-accent/30"
                data-ocid={`why_choose_us.${title.toLowerCase().replace(/\s+/g, "_")}.card`}
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust signals ── */}
      <section className="bg-background py-16" id="trust">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: Shield,
                title: "Fully Insured Fleet",
                body: "Comprehensive insurance on every vehicle — your safety and peace of mind come first.",
              },
              {
                icon: Clock,
                title: "Instant Confirmation",
                body: "Bookings auto-confirmed in real time. No waiting, no phone calls.",
              },
              {
                icon: Star,
                title: "Premium Experience",
                body: "From booking to drop-off, every step is designed to be smooth and enjoyable.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-3 px-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-accent py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-bold text-3xl text-accent-foreground mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-accent-foreground/80 mb-8 max-w-md mx-auto">
            Join thousands of satisfied customers who trust DriveEasy for their
            rental needs.
          </p>
          <Link to="/vehicles">
            <Button
              type="button"
              size="lg"
              variant="secondary"
              className="gap-2 font-semibold px-8"
              data-ocid="cta.browse_fleet.button"
            >
              Browse Fleet Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

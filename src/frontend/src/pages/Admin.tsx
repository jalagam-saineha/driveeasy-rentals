import { StatusBadge } from "@/components/Badge";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAllBookings } from "@/hooks/use-bookings";
import {
  useAddVehicle,
  useDeleteVehicle,
  useIsAdmin,
  useRegisterAdmin,
  useUpdateVehicle,
  useVehicles,
} from "@/hooks/use-vehicles";
import {
  BookingStatus,
  VEHICLE_CATEGORY_LABELS,
  VehicleCategory,
} from "@/types";
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  VehicleView,
} from "@/types";
import {
  AlertTriangle,
  BarChart3,
  Car,
  CheckCircle2,
  DollarSign,
  Pencil,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────

interface VehicleFormValues {
  name: string;
  category: string;
  description: string;
  pricePerDay: string;
  features: string;
  imageUrl: string;
  available: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ns: bigint) {
  return new Date(Number(ns) / 1_000_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Format a cents bigint/number as a USD dollar string. */
function formatUsd(cents: bigint | number) {
  const dollars = Number(cents) / 100;
  return `$${dollars.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function truncatePrincipal(text: string) {
  if (text.length <= 20) return text;
  return `${text.slice(0, 10)}…${text.slice(-8)}`;
}

// ─── Vehicle Form Dialog ───────────────────────────────────────────────────────

interface VehicleFormDialogProps {
  open: boolean;
  onClose: () => void;
  editing: VehicleView | null;
}

function VehicleFormDialog({ open, onClose, editing }: VehicleFormDialogProps) {
  const { mutate: addVehicle, isPending: adding } = useAddVehicle();
  const { mutate: updateVehicle, isPending: updating } = useUpdateVehicle();
  const isPending = adding || updating;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    defaultValues: {
      name: "",
      category: VehicleCategory.car,
      description: "",
      pricePerDay: "150",
      features: "",
      imageUrl: "",
      available: true,
    },
  });

  const available = watch("available");
  const category = watch("category");

  useEffect(() => {
    if (open) {
      if (editing) {
        reset({
          name: editing.name,
          category: editing.category,
          description: editing.description,
          pricePerDay: editing.pricePerDay.toString(),
          features: editing.features.join(", "),
          imageUrl: editing.imageUrl,
          available: editing.available,
        });
      } else {
        reset({
          name: "",
          category: VehicleCategory.car,
          description: "",
          pricePerDay: "150",
          features: "",
          imageUrl: "",
          available: true,
        });
      }
    }
  }, [open, editing, reset]);

  function onSubmit(data: VehicleFormValues) {
    const features = data.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    const pricePerDay = BigInt(
      Math.max(1, Math.round(Number(data.pricePerDay))),
    );

    if (editing) {
      const input: UpdateVehicleInput = {
        id: editing.id,
        name: data.name,
        category: data.category as VehicleCategory,
        description: data.description,
        pricePerDay,
        features,
        imageUrl: data.imageUrl,
        available: data.available,
      };
      updateVehicle(input, { onSuccess: onClose });
    } else {
      const input: CreateVehicleInput = {
        name: data.name,
        category: data.category as VehicleCategory,
        description: data.description,
        pricePerDay,
        features,
        imageUrl: data.imageUrl,
      };
      addVehicle(input, { onSuccess: onClose });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" data-ocid="admin.vehicle_form.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {editing ? "Edit Vehicle" : "Add New Vehicle"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-1">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="v-name">Vehicle Name</Label>
            <Input
              id="v-name"
              placeholder="e.g. BMW 5 Series"
              data-ocid="admin.vehicle_name.input"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p
                className="text-xs text-destructive"
                data-ocid="admin.vehicle_name.field_error"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="v-category">Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setValue("category", v)}
              >
                <SelectTrigger
                  id="v-category"
                  className="w-full"
                  data-ocid="admin.vehicle_category.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(VehicleCategory).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {VEHICLE_CATEGORY_LABELS[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="v-price">Price per Day ($)</Label>
              <Input
                id="v-price"
                type="number"
                min={1}
                placeholder="150"
                data-ocid="admin.vehicle_price.input"
                {...register("pricePerDay", {
                  required: "Price is required",
                  min: { value: 1, message: "Must be at least $1" },
                })}
              />
              {errors.pricePerDay && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="admin.vehicle_price.field_error"
                >
                  {errors.pricePerDay.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="v-desc">Description</Label>
            <Textarea
              id="v-desc"
              placeholder="Brief description of the vehicle…"
              rows={3}
              data-ocid="admin.vehicle_description.textarea"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p
                className="text-xs text-destructive"
                data-ocid="admin.vehicle_description.field_error"
              >
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <Label htmlFor="v-img">Image URL</Label>
            <Input
              id="v-img"
              placeholder="https://example.com/car.jpg"
              data-ocid="admin.vehicle_image.input"
              {...register("imageUrl")}
            />
          </div>

          {/* Features */}
          <div className="space-y-1.5">
            <Label htmlFor="v-features">Features (comma-separated)</Label>
            <Input
              id="v-features"
              placeholder="GPS, Bluetooth, Heated Seats"
              data-ocid="admin.vehicle_features.input"
              {...register("features")}
            />
          </div>

          {/* Available (edit only) */}
          {editing && (
            <div className="flex items-center gap-3 pt-1">
              <Switch
                id="v-avail"
                checked={available}
                onCheckedChange={(v) => setValue("available", v)}
                data-ocid="admin.vehicle_available.switch"
              />
              <Label htmlFor="v-avail">Available for booking</Label>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="admin.vehicle_form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              data-ocid="admin.vehicle_form.submit_button"
            >
              {isPending ? "Saving…" : editing ? "Save Changes" : "Add Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Access Denied ────────────────────────────────────────────────────────────

function AccessDenied() {
  const { mutate: registerAdmin, isPending } = useRegisterAdmin();

  return (
    <div
      className="container max-w-2xl mx-auto px-4 py-24 text-center"
      data-ocid="admin.access_denied.section"
    >
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h1 className="font-display font-bold text-2xl text-foreground mb-3">
        Admin Access Required
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        You need admin privileges to access this panel. If you're the platform
        owner, register yourself as admin below — only the first person to
        register will receive admin access.
      </p>
      <Button
        type="button"
        onClick={() => registerAdmin()}
        disabled={isPending}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
        data-ocid="admin.register.button"
      >
        <Shield className="w-4 h-4 mr-2" />
        {isPending ? "Registering…" : "Register as Admin"}
      </Button>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export function AdminPage() {
  const { data: vehicles, isLoading: vehiclesLoading } = useVehicles();
  const { data: bookings, isLoading: bookingsLoading } = useAllBookings();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { mutate: deleteVehicle, isPending: deleting } = useDeleteVehicle();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<VehicleView | null>(
    null,
  );

  function openAdd() {
    setEditingVehicle(null);
    setDialogOpen(true);
  }

  function openEdit(vehicle: VehicleView) {
    setEditingVehicle(vehicle);
    setDialogOpen(true);
  }

  // Build vehicle name lookup map
  const vehicleNameMap = new Map<string, string>(
    (vehicles ?? []).map((v) => [v.id.toString(), v.name]),
  );

  // Stats
  const totalVehicles = vehicles?.length ?? 0;
  const availableVehicles = vehicles?.filter((v) => v.available).length ?? 0;
  const totalBookings = bookings?.length ?? 0;
  const totalRevenue = (bookings ?? [])
    .filter((b) => b.status === BookingStatus.confirmed)
    .reduce((sum, b) => sum + Number(b.totalAmount), 0);

  if (adminLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-10 space-y-4">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <div data-ocid="admin.page">
      {/* Page Header */}
      <section className="bg-card border-b border-border py-8">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground leading-tight">
                  Admin Panel
                </h1>
                <p className="text-muted-foreground text-sm">
                  DriveEasy Rentals — Fleet &amp; Booking Management
                </p>
              </div>
            </div>
            <StatusBadge variant="admin">Administrator</StatusBadge>
          </div>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Admin Registration Banner (for first-time setup, always show for non-admin registrations) */}
        <RegisterAdminBannerConditional />

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          data-ocid="admin.stats.section"
        >
          <StatCard
            icon={Car}
            label="Total Vehicles"
            value={totalVehicles}
            color="text-accent"
          />
          <StatCard
            icon={CheckCircle2}
            label="Available"
            value={availableVehicles}
            color="text-accent"
          />
          <StatCard
            icon={Users}
            label="Total Bookings"
            value={totalBookings}
            color="text-primary"
          />
          <StatCard
            icon={DollarSign}
            label="Confirmed Revenue"
            value={formatUsd(totalRevenue)}
            color="text-foreground"
          />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="vehicles" data-ocid="admin.main.tabs">
          <TabsList className="mb-1">
            <TabsTrigger value="vehicles" data-ocid="admin.vehicles.tab">
              <Car className="w-4 h-4 mr-1.5" />
              Fleet
            </TabsTrigger>
            <TabsTrigger value="bookings" data-ocid="admin.bookings.tab">
              <BarChart3 className="w-4 h-4 mr-1.5" />
              Bookings
            </TabsTrigger>
          </TabsList>

          {/* ── Vehicles Tab ── */}
          <TabsContent value="vehicles" className="mt-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-lg text-foreground">
                Fleet Management
              </h2>
              <Button
                type="button"
                onClick={openAdd}
                size="sm"
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                data-ocid="admin.add_vehicle.button"
              >
                <Plus className="w-4 h-4" />
                Add Vehicle
              </Button>
            </div>

            {vehiclesLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((k) => (
                  <Skeleton key={k} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            ) : (vehicles ?? []).length === 0 ? (
              <Card
                className="border border-dashed border-border"
                data-ocid="admin.vehicles.empty_state"
              >
                <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
                  <Car className="w-10 h-10 text-muted-foreground/30" />
                  <p className="text-muted-foreground text-sm">
                    No vehicles yet. Click "Add Vehicle" to get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div
                className="overflow-hidden rounded-xl border border-border bg-card"
                data-ocid="admin.vehicles.list"
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Vehicle
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">
                        Category
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground hidden md:table-cell">
                        Price/Day
                      </th>
                      <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(vehicles ?? []).map((vehicle, i) => (
                      <tr
                        key={vehicle.id.toString()}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`admin.vehicle.item.${i + 1}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                              <img
                                src={
                                  vehicle.imageUrl ||
                                  "/assets/images/vehicle-placeholder.svg"
                                }
                                alt={vehicle.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "/assets/images/vehicle-placeholder.svg";
                                }}
                              />
                            </div>
                            <span className="font-display font-semibold text-foreground truncate max-w-[140px]">
                              {vehicle.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <StatusBadge
                            variant={
                              vehicle.category as Parameters<
                                typeof StatusBadge
                              >[0]["variant"]
                            }
                          >
                            {VEHICLE_CATEGORY_LABELS[vehicle.category]}
                          </StatusBadge>
                        </td>
                        <td className="px-4 py-3 text-right hidden md:table-cell font-mono text-foreground">
                          {formatUsd(vehicle.pricePerDay)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <StatusBadge
                            variant={
                              vehicle.available ? "available" : "unavailable"
                            }
                          />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => openEdit(vehicle)}
                              className="gap-1.5 h-8 px-2.5"
                              data-ocid={`admin.vehicle.edit_button.${i + 1}`}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="gap-1.5 h-8 px-2.5 text-destructive border-destructive/30 hover:bg-destructive/5"
                                  data-ocid={`admin.vehicle.delete_button.${i + 1}`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent data-ocid="admin.delete_vehicle.dialog">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Vehicle?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to permanently delete{" "}
                                    <strong>{vehicle.name}</strong>? This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel data-ocid="admin.delete_vehicle.cancel_button">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteVehicle(vehicle.id)}
                                    disabled={deleting}
                                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                    data-ocid="admin.delete_vehicle.confirm_button"
                                  >
                                    Delete Vehicle
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* ── Bookings Tab ── */}
          <TabsContent value="bookings" className="mt-4">
            <h2 className="font-display font-semibold text-lg text-foreground mb-5">
              All Bookings
            </h2>

            {bookingsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((k) => (
                  <Skeleton key={k} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : (bookings ?? []).length === 0 ? (
              <Card
                className="border border-dashed border-border"
                data-ocid="admin.bookings.empty_state"
              >
                <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
                  <BarChart3 className="w-10 h-10 text-muted-foreground/30" />
                  <p className="text-muted-foreground text-sm">
                    No bookings yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div
                className="overflow-hidden rounded-xl border border-border bg-card"
                data-ocid="admin.bookings.list"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                          Reference
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">
                          Vehicle
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">
                          User
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">
                          Dates
                        </th>
                        <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(bookings ?? []).map((booking, i) => (
                        <tr
                          key={booking.id.toString()}
                          className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                          data-ocid={`admin.booking.item.${i + 1}`}
                        >
                          <td className="px-4 py-3">
                            <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-foreground">
                              #{booking.referenceNumber}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <span className="font-display font-medium text-foreground">
                              {vehicleNameMap.get(
                                booking.vehicleId.toString(),
                              ) ?? `Vehicle #${booking.vehicleId}`}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className="font-mono text-xs text-muted-foreground">
                              {truncatePrincipal(booking.userId.toText())}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground text-xs">
                            <div>{formatDate(booking.pickupDate)}</div>
                            <div className="text-muted-foreground/60">
                              → {formatDate(booking.dropoffDate)}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                            {formatUsd(booking.totalAmount)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <StatusBadge
                              variant={
                                booking.status === BookingStatus.confirmed
                                  ? "confirmed"
                                  : "cancelled"
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Vehicle Add/Edit Dialog */}
      <VehicleFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        editing={editingVehicle}
      />
    </div>
  );
}

// ─── RegisterAdminBannerConditional ──────────────────────────────────────────

function RegisterAdminBannerConditional() {
  // This banner is shown at the top of the page for admins to inform
  // that the "Register as Admin" registration has been completed.
  // Per requirements: if already admin, no need to show the banner.
  // We use a local component so it can be independently stateful.
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-accent" />
        </div>
        <div>
          <p className="font-display font-semibold text-foreground text-sm">
            You are the Administrator
          </p>
          <p className="text-muted-foreground text-xs">
            Full fleet and booking management access is enabled for your
            account.
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground shrink-0"
        onClick={() => setDismissed(true)}
        data-ocid="admin.admin_banner.close_button"
      >
        Dismiss
      </Button>
    </div>
  );
}

// ─── StatCard ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <Card className="border border-border shadow-card">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
        <div className={`font-display font-bold text-2xl ${color}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

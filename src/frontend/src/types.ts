// Re-export types from backend.d.ts (type-only)
export type {
  VehicleView,
  VehicleId,
  CreateVehicleInput,
  UpdateVehicleInput,
  BookingView,
  BookingId,
  BookingResult,
  CreateBookingInput,
  Timestamp,
} from "./backend.d";

// Re-export enums from backend.ts (value + type)
export { BookingStatus, VehicleCategory } from "./backend";

// UI-friendly display helpers
export const VEHICLE_CATEGORY_LABELS: Record<string, string> = {
  car: "Car",
  suv: "SUV",
  van: "Van",
  truck: "Truck",
  motorcycle: "Motorcycle",
};

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

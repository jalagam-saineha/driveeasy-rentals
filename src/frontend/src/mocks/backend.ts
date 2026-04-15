import type { backendInterface, VehicleView, BookingView } from "../backend";
import { BookingStatus, VehicleCategory } from "../backend";

const sampleVehicles: VehicleView[] = [
  {
    id: BigInt(1),
    name: "BMW i4 eDrive40",
    description: "A sleek and powerful electric sedan with impressive range and cutting-edge technology.",
    pricePerDay: BigInt(165),
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
    category: VehicleCategory.car,
    available: true,
    features: ["Electric", "Autopilot", "Heated Seats", "Panoramic Roof"],
  },
  {
    id: BigInt(2),
    name: "Audi Q8 e-tron",
    description: "Premium electric SUV combining luxury, performance, and zero emissions.",
    pricePerDay: BigInt(195),
    imageUrl: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800",
    category: VehicleCategory.suv,
    available: true,
    features: ["Electric", "AWD", "Massage Seats", "B&O Sound"],
  },
  {
    id: BigInt(3),
    name: "Tesla Model S",
    description: "The pinnacle of electric performance with Ludicrous Mode acceleration.",
    pricePerDay: BigInt(220),
    imageUrl: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800",
    category: VehicleCategory.car,
    available: true,
    features: ["Electric", "Autopilot", "17\" Display", "Over-the-air Updates"],
  },
  {
    id: BigInt(4),
    name: "Mercedes-Benz EQE",
    description: "Executive electric saloon with supreme comfort and MBUX Hyperscreen.",
    pricePerDay: BigInt(210),
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    category: VehicleCategory.car,
    available: false,
    features: ["Electric", "Hyperscreen", "Air Suspension", "Burmester Sound"],
  },
  {
    id: BigInt(5),
    name: "Porsche Taycan",
    description: "Sports car performance meets electric future — thrilling at every turn.",
    pricePerDay: BigInt(280),
    imageUrl: "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=800",
    category: VehicleCategory.car,
    available: true,
    features: ["Electric", "Sport Chrono", "PASM", "Launch Control"],
  },
  {
    id: BigInt(6),
    name: "Range Rover Sport",
    description: "Unmatched luxury SUV combining off-road capability with executive refinement.",
    pricePerDay: BigInt(250),
    imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
    category: VehicleCategory.suv,
    available: true,
    features: ["Hybrid", "Terrain Response", "Meridian Sound", "Adaptive Cruise"],
  },
];

const sampleBookings: BookingView[] = [
  {
    id: BigInt(1),
    vehicleId: BigInt(1),
    userId: { toString: () => "user-principal-1" } as any,
    status: BookingStatus.confirmed,
    referenceNumber: "DRV-2024-001",
    pickupDate: BigInt(Date.now() + 86400000),
    dropoffDate: BigInt(Date.now() + 3 * 86400000),
    totalAmount: BigInt(495),
    createdAt: BigInt(Date.now() - 86400000),
  },
  {
    id: BigInt(2),
    vehicleId: BigInt(3),
    userId: { toString: () => "user-principal-1" } as any,
    status: BookingStatus.cancelled,
    referenceNumber: "DRV-2024-002",
    pickupDate: BigInt(Date.now() + 7 * 86400000),
    dropoffDate: BigInt(Date.now() + 10 * 86400000),
    totalAmount: BigInt(660),
    createdAt: BigInt(Date.now() - 2 * 86400000),
  },
];

export const mockBackend: backendInterface = {
  addVehicle: async (input) => ({
    id: BigInt(99),
    ...input,
    available: true,
  }),

  cancelBooking: async (_id) => ({ __kind__: "ok", ok: null }),

  createBooking: async (input) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(99),
      vehicleId: input.vehicleId,
      userId: { toString: () => "mock-user" } as any,
      status: BookingStatus.confirmed,
      referenceNumber: "DRV-2024-099",
      pickupDate: input.pickupDate,
      dropoffDate: input.dropoffDate,
      totalAmount: BigInt(330),
      createdAt: BigInt(Date.now()),
    },
  }),

  deleteVehicle: async (_id) => ({ __kind__: "ok", ok: null }),

  getVehicle: async (id) => sampleVehicles.find((v) => v.id === id) ?? null,

  isAdmin: async () => true,

  listAllBookings: async () => sampleBookings,

  listVehicles: async () => sampleVehicles,

  myBookings: async () => sampleBookings,

  registerAdmin: async () => ({ __kind__: "ok", ok: null }),

  setVehicleAvailability: async (_id, _available) => ({ __kind__: "ok", ok: null }),

  updateVehicle: async (input) => ({
    id: input.id,
    name: input.name,
    description: input.description,
    pricePerDay: input.pricePerDay,
    imageUrl: input.imageUrl,
    category: input.category,
    available: input.available,
    features: input.features,
  }),
};

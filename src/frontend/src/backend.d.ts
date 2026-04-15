import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpdateVehicleInput {
    id: VehicleId;
    features: Array<string>;
    name: string;
    description: string;
    available: boolean;
    pricePerDay: bigint;
    imageUrl: string;
    category: VehicleCategory;
}
export type Timestamp = bigint;
export type VehicleId = bigint;
export interface VehicleView {
    id: VehicleId;
    features: Array<string>;
    name: string;
    description: string;
    available: boolean;
    pricePerDay: bigint;
    imageUrl: string;
    category: VehicleCategory;
}
export interface CreateVehicleInput {
    features: Array<string>;
    name: string;
    description: string;
    pricePerDay: bigint;
    imageUrl: string;
    category: VehicleCategory;
}
export type BookingId = bigint;
export interface CreateBookingInput {
    dropoffDate: Timestamp;
    pickupDate: Timestamp;
    vehicleId: VehicleId;
}
export type BookingResult = {
    __kind__: "ok";
    ok: BookingView;
} | {
    __kind__: "err";
    err: string;
};
export interface BookingView {
    id: BookingId;
    status: BookingStatus;
    referenceNumber: string;
    dropoffDate: Timestamp;
    userId: Principal;
    createdAt: Timestamp;
    pickupDate: Timestamp;
    totalAmount: bigint;
    vehicleId: VehicleId;
}
export enum BookingStatus {
    cancelled = "cancelled",
    confirmed = "confirmed"
}
export enum VehicleCategory {
    car = "car",
    suv = "suv",
    van = "van",
    truck = "truck",
    motorcycle = "motorcycle"
}
export interface backendInterface {
    addVehicle(input: CreateVehicleInput): Promise<VehicleView>;
    cancelBooking(id: BookingId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createBooking(input: CreateBookingInput): Promise<BookingResult>;
    deleteVehicle(id: VehicleId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getVehicle(id: VehicleId): Promise<VehicleView | null>;
    isAdmin(): Promise<boolean>;
    listAllBookings(): Promise<Array<BookingView>>;
    listVehicles(): Promise<Array<VehicleView>>;
    myBookings(): Promise<Array<BookingView>>;
    registerAdmin(): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setVehicleAvailability(id: VehicleId, available: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateVehicle(input: UpdateVehicleInput): Promise<VehicleView>;
}

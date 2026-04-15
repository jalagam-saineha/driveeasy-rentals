import List "mo:core/List";
import Set "mo:core/Set";
import VehicleTypes "types/vehicles";
import BookingTypes "types/bookings";
import VehicleLib "lib/vehicles";
import VehiclesMixin "mixins/vehicles-api";
import BookingsMixin "mixins/bookings-api";
import AdminMixin "mixins/admin-api";

actor {
  // --- Stable state ---
  let vehicles = List.empty<VehicleTypes.Vehicle>();
  let bookings = List.empty<BookingTypes.Booking>();
  let admins = Set.empty<Principal>();
  var nextVehicleId : Nat = 1;
  var nextBookingId : Nat = 1;
  var seeded : Bool = false;

  // Seed sample vehicles on first init
  if (not seeded) {
    let count = VehicleLib.seedSampleVehicles(vehicles, nextVehicleId);
    nextVehicleId += count;
    seeded := true;
  };

  // --- Mixin composition ---
  include AdminMixin(admins);
  include VehiclesMixin(vehicles, admins, nextVehicleId);
  include BookingsMixin(vehicles, bookings, admins, nextBookingId);
};

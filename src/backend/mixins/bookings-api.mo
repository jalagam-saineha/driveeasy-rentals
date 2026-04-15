import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Set "mo:core/Set";
import VehicleTypes "../types/vehicles";
import BookingTypes "../types/bookings";
import BookingLib "../lib/bookings";
import AdminLib "../lib/admin";

mixin (
  vehicles : List.List<VehicleTypes.Vehicle>,
  bookings : List.List<BookingTypes.Booking>,
  admins : Set.Set<Principal>,
  nextBookingId : Nat,
) {

  // User: create a booking (auto-confirmed if vehicle is available)
  public shared ({ caller }) func createBooking(input : BookingTypes.CreateBookingInput) : async BookingTypes.BookingResult {
    let currentId = nextBookingId + bookings.size();
    BookingLib.create(vehicles, bookings, currentId, caller, input);
  };

  // User: cancel own booking
  public shared ({ caller }) func cancelBooking(id : BookingTypes.BookingId) : async { #ok; #err : Text } {
    BookingLib.cancel(bookings, id, caller);
  };

  // User: view own bookings
  public query ({ caller }) func myBookings() : async [BookingTypes.BookingView] {
    BookingLib.getByUser(bookings, caller);
  };

  // Admin: view all bookings
  public query ({ caller }) func listAllBookings() : async [BookingTypes.BookingView] {
    if (not AdminLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    BookingLib.getAll(bookings);
  };
};

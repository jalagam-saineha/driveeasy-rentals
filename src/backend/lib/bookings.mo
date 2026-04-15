import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import BookingTypes "../types/bookings";
import VehicleTypes "../types/vehicles";

module {
  public type Booking = BookingTypes.Booking;
  public type BookingView = BookingTypes.BookingView;
  public type CreateBookingInput = BookingTypes.CreateBookingInput;
  public type BookingId = BookingTypes.BookingId;
  public type Vehicle = VehicleTypes.Vehicle;

  public func toView(b : Booking) : BookingView {
    {
      id = b.id;
      vehicleId = b.vehicleId;
      userId = b.userId;
      pickupDate = b.pickupDate;
      dropoffDate = b.dropoffDate;
      status = b.status;
      totalAmount = b.totalAmount;
      referenceNumber = b.referenceNumber;
      createdAt = b.createdAt;
    };
  };

  public func generateReference(id : BookingId) : Text {
    // Pad id to 6 digits: DRV-000001
    let idText = id.toText();
    let len = idText.size();
    let padding = if (len >= 6) {
      "";
    } else {
      var pad = "";
      var remaining = 6 - len;
      while (remaining > 0) {
        pad := "0" # pad;
        remaining -= 1;
      };
      pad;
    };
    "DRV-" # padding # idText;
  };

  public func create(
    vehicles : List.List<Vehicle>,
    bookings : List.List<Booking>,
    nextId : Nat,
    caller : Principal,
    input : CreateBookingInput,
  ) : BookingTypes.BookingResult {
    // Validate date range
    if (input.pickupDate >= input.dropoffDate) {
      return #err("Pickup date must be before dropoff date");
    };

    // Find the vehicle
    let vehicleOpt = vehicles.find(func(v : Vehicle) : Bool { v.id == input.vehicleId });
    let vehicle = switch (vehicleOpt) {
      case null return #err("Vehicle not found");
      case (?v) v;
    };

    // Check vehicle availability flag
    if (not vehicle.available) {
      return #err("Vehicle is not available for rental");
    };

    // Check for booking overlaps — any confirmed booking on this vehicle that overlaps the range
    let hasOverlap = bookings.any(func(b : Booking) : Bool {
      b.vehicleId == input.vehicleId and
      b.status == #confirmed and
      input.pickupDate < b.dropoffDate and input.dropoffDate > b.pickupDate
    });

    if (hasOverlap) {
      return #err("Vehicle is already booked for the requested dates");
    };

    // Calculate total amount: pricePerDay * number of days
    // dates are nanosecond Int timestamps
    let nanosecondsPerDay : Int = 86_400_000_000_000;
    let durationNs = input.dropoffDate - input.pickupDate;
    let days : Nat = if (durationNs <= 0) {
      1;
    } else {
      let d = durationNs / nanosecondsPerDay;
      if (d == 0) 1 else d.toNat();
    };
    let totalAmount = vehicle.pricePerDay * days;

    let refNum = generateReference(nextId);
    let booking : Booking = {
      id = nextId;
      vehicleId = input.vehicleId;
      userId = caller;
      pickupDate = input.pickupDate;
      dropoffDate = input.dropoffDate;
      var status = #confirmed;
      totalAmount = totalAmount;
      referenceNumber = refNum;
      createdAt = Time.now();
    };
    bookings.add(booking);
    #ok(toView(booking));
  };

  public func cancel(
    bookings : List.List<Booking>,
    id : BookingId,
    caller : Principal,
  ) : { #ok; #err : Text } {
    let bookingOpt = bookings.find(func(b : Booking) : Bool { b.id == id });
    switch (bookingOpt) {
      case null #err("Booking not found");
      case (?b) {
        if (not Principal.equal(b.userId, caller)) {
          return #err("You can only cancel your own bookings");
        };
        if (b.status == #cancelled) {
          return #err("Booking is already cancelled");
        };
        b.status := #cancelled;
        #ok;
      };
    };
  };

  public func getByUser(bookings : List.List<Booking>, userId : Principal) : [BookingView] {
    bookings
      .filter(func(b : Booking) : Bool { Principal.equal(b.userId, userId) })
      .map<Booking, BookingView>(func(b) { toView(b) })
      .toArray();
  };

  public func getAll(bookings : List.List<Booking>) : [BookingView] {
    bookings.map<Booking, BookingView>(func(b) { toView(b) }).toArray();
  };
};

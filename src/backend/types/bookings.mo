import Common "common";

module {
  public type BookingId = Common.BookingId;
  public type VehicleId = Common.VehicleId;
  public type Timestamp = Common.Timestamp;

  public type BookingStatus = {
    #confirmed;
    #cancelled;
  };

  public type Booking = {
    id : BookingId;
    vehicleId : VehicleId;
    userId : Principal;
    pickupDate : Timestamp;
    dropoffDate : Timestamp;
    var status : BookingStatus;
    totalAmount : Nat;
    referenceNumber : Text;
    createdAt : Timestamp;
  };

  // Shared (immutable) representation for API boundaries
  public type BookingView = {
    id : BookingId;
    vehicleId : VehicleId;
    userId : Principal;
    pickupDate : Timestamp;
    dropoffDate : Timestamp;
    status : BookingStatus;
    totalAmount : Nat;
    referenceNumber : Text;
    createdAt : Timestamp;
  };

  public type CreateBookingInput = {
    vehicleId : VehicleId;
    pickupDate : Timestamp;
    dropoffDate : Timestamp;
  };

  public type BookingResult = {
    #ok : BookingView;
    #err : Text;
  };
};

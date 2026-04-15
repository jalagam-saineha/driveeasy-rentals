import Common "common";

module {
  public type VehicleId = Common.VehicleId;

  public type VehicleCategory = {
    #car;
    #suv;
    #van;
    #truck;
    #motorcycle;
  };

  public type Vehicle = {
    id : VehicleId;
    var name : Text;
    var category : VehicleCategory;
    var description : Text;
    var pricePerDay : Nat;
    var features : [Text];
    var imageUrl : Text;
    var available : Bool;
  };

  // Shared (immutable) representation for API boundaries
  public type VehicleView = {
    id : VehicleId;
    name : Text;
    category : VehicleCategory;
    description : Text;
    pricePerDay : Nat;
    features : [Text];
    imageUrl : Text;
    available : Bool;
  };

  public type CreateVehicleInput = {
    name : Text;
    category : VehicleCategory;
    description : Text;
    pricePerDay : Nat;
    features : [Text];
    imageUrl : Text;
  };

  public type UpdateVehicleInput = {
    id : VehicleId;
    name : Text;
    category : VehicleCategory;
    description : Text;
    pricePerDay : Nat;
    features : [Text];
    imageUrl : Text;
    available : Bool;
  };
};

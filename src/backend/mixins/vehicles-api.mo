import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Set "mo:core/Set";
import VehicleTypes "../types/vehicles";
import VehicleLib "../lib/vehicles";
import AdminLib "../lib/admin";

mixin (
  vehicles : List.List<VehicleTypes.Vehicle>,
  admins : Set.Set<Principal>,
  nextVehicleId : Nat,
) {

  // Public: list all vehicles
  public query func listVehicles() : async [VehicleTypes.VehicleView] {
    vehicles.map<VehicleTypes.Vehicle, VehicleTypes.VehicleView>(
      func(v) { VehicleLib.toView(v) }
    ).toArray();
  };

  // Public: get a single vehicle by id
  public query func getVehicle(id : VehicleTypes.VehicleId) : async ?VehicleTypes.VehicleView {
    switch (VehicleLib.getById(vehicles, id)) {
      case null null;
      case (?v) ?VehicleLib.toView(v);
    };
  };

  // Admin: add a new vehicle
  public shared ({ caller }) func addVehicle(input : VehicleTypes.CreateVehicleInput) : async VehicleTypes.VehicleView {
    if (not AdminLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let currentId = nextVehicleId + vehicles.size();
    let v = VehicleLib.create(vehicles, currentId, input);
    VehicleLib.toView(v);
  };

  // Admin: update an existing vehicle
  public shared ({ caller }) func updateVehicle(input : VehicleTypes.UpdateVehicleInput) : async VehicleTypes.VehicleView {
    if (not AdminLib.isAdmin(admins, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (VehicleLib.getById(vehicles, input.id)) {
      case null Runtime.trap("Vehicle not found");
      case (?v) {
        v.name := input.name;
        v.category := input.category;
        v.description := input.description;
        v.pricePerDay := input.pricePerDay;
        v.features := input.features;
        v.imageUrl := input.imageUrl;
        v.available := input.available;
        VehicleLib.toView(v);
      };
    };
  };

  // Admin: delete a vehicle (marks unavailable — soft delete)
  public shared ({ caller }) func deleteVehicle(id : VehicleTypes.VehicleId) : async { #ok; #err : Text } {
    if (not AdminLib.isAdmin(admins, caller)) {
      return #err("Unauthorized: admin only");
    };
    switch (VehicleLib.getById(vehicles, id)) {
      case null #err("Vehicle not found");
      case (?v) {
        v.available := false;
        #ok;
      };
    };
  };

  // Admin: set vehicle availability flag
  public shared ({ caller }) func setVehicleAvailability(id : VehicleTypes.VehicleId, available : Bool) : async { #ok; #err : Text } {
    if (not AdminLib.isAdmin(admins, caller)) {
      return #err("Unauthorized: admin only");
    };
    switch (VehicleLib.getById(vehicles, id)) {
      case null #err("Vehicle not found");
      case (?v) {
        v.available := available;
        #ok;
      };
    };
  };
};

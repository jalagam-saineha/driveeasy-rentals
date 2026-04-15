import Set "mo:core/Set";
import AdminLib "../lib/admin";

mixin (admins : Set.Set<Principal>) {

  // Register caller as admin if no admins exist yet (first-run bootstrap)
  public shared ({ caller }) func registerAdmin() : async { #ok; #err : Text } {
    if (admins.isEmpty()) {
      AdminLib.registerFirstAdmin(admins, caller);
      #ok;
    } else {
      #err("Admin already registered. Only the first caller can become admin.");
    };
  };

  // Check if caller is admin
  public query ({ caller }) func isAdmin() : async Bool {
    AdminLib.isAdmin(admins, caller);
  };
};

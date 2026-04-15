import Set "mo:core/Set";

module {
  public func isAdmin(admins : Set.Set<Principal>, caller : Principal) : Bool {
    admins.contains(caller);
  };

  public func registerFirstAdmin(admins : Set.Set<Principal>, caller : Principal) {
    if (admins.isEmpty()) {
      admins.add(caller);
    };
  };
};

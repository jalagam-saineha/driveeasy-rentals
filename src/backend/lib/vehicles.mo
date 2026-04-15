import List "mo:core/List";
import Types "../types/vehicles";
import BookingTypes "../types/bookings";

module {
  public type Vehicle = Types.Vehicle;
  public type VehicleView = Types.VehicleView;
  public type CreateVehicleInput = Types.CreateVehicleInput;
  public type UpdateVehicleInput = Types.UpdateVehicleInput;
  public type VehicleId = Types.VehicleId;

  public func toView(v : Vehicle) : VehicleView {
    {
      id = v.id;
      name = v.name;
      category = v.category;
      description = v.description;
      pricePerDay = v.pricePerDay;
      features = v.features;
      imageUrl = v.imageUrl;
      available = v.available;
    };
  };

  public func create(
    vehicles : List.List<Vehicle>,
    nextId : Nat,
    input : CreateVehicleInput,
  ) : Vehicle {
    let v : Vehicle = {
      id = nextId;
      var name = input.name;
      var category = input.category;
      var description = input.description;
      var pricePerDay = input.pricePerDay;
      var features = input.features;
      var imageUrl = input.imageUrl;
      var available = true;
    };
    vehicles.add(v);
    v;
  };

  public func getById(vehicles : List.List<Vehicle>, id : VehicleId) : ?Vehicle {
    vehicles.find(func(v) { v.id == id });
  };

  public func isAvailableForRange(
    vehicle : Vehicle,
    bookings : List.List<BookingTypes.Booking>,
    pickupDate : Int,
    dropoffDate : Int,
  ) : Bool {
    if (not vehicle.available) return false;
    // Check for any confirmed booking that overlaps the requested range
    let hasOverlap = bookings.any(func(b : BookingTypes.Booking) : Bool {
      b.vehicleId == vehicle.id and
      b.status == #confirmed and
      // Overlap: pickup < other.dropoff AND dropoff > other.pickup
      pickupDate < b.dropoffDate and dropoffDate > b.pickupDate
    });
    not hasOverlap;
  };

  public func seedSampleVehicles(vehicles : List.List<Vehicle>, startId : Nat) : Nat {
    let samples : [(Types.CreateVehicleInput, Nat)] = [
      (
        {
          name = "Toyota Camry";
          category = #car;
          description = "Comfortable mid-size sedan perfect for city drives and long trips.";
          pricePerDay = 5500; // $55.00/day in cents
          features = ["Air Conditioning", "Bluetooth", "Backup Camera", "Cruise Control"];
          imageUrl = "https://picsum.photos/seed/camry/800/500";
        },
        startId,
      ),
      (
        {
          name = "Honda Civic";
          category = #car;
          description = "Fuel-efficient compact car, ideal for urban commuting.";
          pricePerDay = 4500; // $45.00/day
          features = ["Air Conditioning", "Bluetooth", "USB Charging", "Lane Assist"];
          imageUrl = "https://picsum.photos/seed/civic/800/500";
        },
        startId + 1,
      ),
      (
        {
          name = "BMW 3 Series";
          category = #car;
          description = "Luxury sports sedan delivering premium performance and style.";
          pricePerDay = 9500; // $95.00/day
          features = ["Leather Seats", "Navigation", "Sunroof", "Sport Mode", "Heated Seats"];
          imageUrl = "https://picsum.photos/seed/bmw3/800/500";
        },
        startId + 2,
      ),
      (
        {
          name = "Ford Explorer";
          category = #suv;
          description = "Spacious SUV with room for the whole family and all their gear.";
          pricePerDay = 7500; // $75.00/day
          features = ["7-Seat Capacity", "4WD", "Apple CarPlay", "Roof Rails", "Tow Hitch"];
          imageUrl = "https://picsum.photos/seed/explorer/800/500";
        },
        startId + 3,
      ),
      (
        {
          name = "Toyota RAV4";
          category = #suv;
          description = "Versatile crossover SUV combining efficiency with off-road capability.";
          pricePerDay = 6800; // $68.00/day
          features = ["AWD", "Hybrid Option", "Safety Sense", "Adaptive Cruise", "Wireless Charging"];
          imageUrl = "https://picsum.photos/seed/rav4/800/500";
        },
        startId + 4,
      ),
      (
        {
          name = "Mercedes Sprinter";
          category = #van;
          description = "High-roof cargo van, perfect for moving, deliveries, or group transport.";
          pricePerDay = 11000; // $110.00/day
          features = ["High Roof", "Cargo Partition", "GPS", "Reverse Sensors", "Climate Control"];
          imageUrl = "https://picsum.photos/seed/sprinter/800/500";
        },
        startId + 5,
      ),
      (
        {
          name = "Ford F-150";
          category = #truck;
          description = "America's best-selling truck, built for tough jobs and weekend adventures.";
          pricePerDay = 8500; // $85.00/day
          features = ["4x4", "Tow Package", "Bed Liner", "Bluetooth", "V8 Engine"];
          imageUrl = "https://picsum.photos/seed/f150/800/500";
        },
        startId + 6,
      ),
      (
        {
          name = "Harley-Davidson Sportster";
          category = #motorcycle;
          description = "Iconic American motorcycle for the open road experience.";
          pricePerDay = 3500; // $35.00/day
          features = ["Helmet Included", "Saddlebags", "Anti-lock Brakes", "Fuel Injection"];
          imageUrl = "https://picsum.photos/seed/harley/800/500";
        },
        startId + 7,
      ),
    ];

    var count = 0;
    for ((input, id) in samples.values()) {
      let v : Vehicle = {
        id = id;
        var name = input.name;
        var category = input.category;
        var description = input.description;
        var pricePerDay = input.pricePerDay;
        var features = input.features;
        var imageUrl = input.imageUrl;
        var available = true;
      };
      vehicles.add(v);
      count += 1;
    };
    count;
  };
};

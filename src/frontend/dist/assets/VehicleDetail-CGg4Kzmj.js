import { c as createLucideIcon, i as useParams, k as useVehicle, a as useAuth, r as reactExports, j as jsxRuntimeExports, l as Skeleton, L as Link, B as Button, S as Shield, m as LogIn, n as ue } from "./index-D-b77d8q.js";
import { u as useCreateBooking, S as StatusBadge, C as CircleCheck } from "./use-bookings-B_mtjnUh.js";
import { C as Card, a as CardContent } from "./card-BPPLahxR.js";
import { V as VEHICLE_CATEGORY_LABELS } from "./types-C4-VQn31.js";
import { S as Star } from "./star-I0q6OLRm.js";
import { C as Check } from "./check-D8yQCwcv.js";
import { C as Calendar } from "./calendar-BDo5tFXk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
];
const ClipboardCopy = createLucideIcon("clipboard-copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const FALLBACK_IMAGE = "/assets/images/vehicle-placeholder.svg";
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4 sm:px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[16/9] w-full rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-2/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 pt-2", children: Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-lg" }, i)
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 w-full rounded-2xl" })
    ] })
  ] });
}
function BookingConfirmation({
  confirmation,
  vehicle,
  onReset
}) {
  const { booking } = confirmation;
  function copyRef() {
    navigator.clipboard.writeText(booking.referenceNumber);
    ue.success("Reference copied to clipboard");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 text-center", "data-ocid": "booking.success_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-accent" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Booking Confirmed!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        vehicle.name,
        " is reserved for you."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/5 border border-accent/20 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Reference Number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-accent text-lg tracking-widest", children: booking.referenceNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: copyRef,
            className: "text-muted-foreground hover:text-accent transition-colors",
            "aria-label": "Copy reference number",
            "data-ocid": "booking.copy_ref.button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-1.5 text-left bg-muted/40 rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Pickup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: new Date(
          Number(booking.pickupDate) / 1e6
        ).toLocaleDateString(void 0, {
          weekday: "short",
          month: "short",
          day: "numeric"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Dropoff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: new Date(
          Number(booking.dropoffDate) / 1e6
        ).toLocaleDateString(void 0, {
          weekday: "short",
          month: "short",
          day: "numeric"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border pt-1.5 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-accent", children: [
          "$",
          confirmation.totalPrice.toLocaleString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold",
          "data-ocid": "booking.view_bookings.button",
          children: "View My Bookings"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "text-muted-foreground",
          onClick: onReset,
          "data-ocid": "booking.book_again.button",
          children: "Book another vehicle"
        }
      )
    ] })
  ] });
}
function VehicleDetailPage() {
  const { vehicleId } = useParams({ from: "/vehicles/$vehicleId" });
  const vehicleIdBigInt = BigInt(vehicleId);
  const { data: vehicle, isLoading } = useVehicle(vehicleIdBigInt);
  const { mutate: createBooking, isPending } = useCreateBooking();
  const { isAuthenticated, login } = useAuth();
  const [pickupDate, setPickupDate] = reactExports.useState("");
  const [dropoffDate, setDropoffDate] = reactExports.useState("");
  const [bookingError, setBookingError] = reactExports.useState(null);
  const [confirmation, setConfirmation] = reactExports.useState(
    null
  );
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const totalDays = pickupDate && dropoffDate ? Math.max(
    1,
    Math.ceil(
      (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) / (1e3 * 60 * 60 * 24)
    )
  ) : 0;
  const totalPrice = vehicle ? totalDays * Number(vehicle.pricePerDay) : 0;
  function handleBook() {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!pickupDate || !dropoffDate) {
      setBookingError("Please select both pickup and dropoff dates.");
      return;
    }
    if (new Date(dropoffDate) <= new Date(pickupDate)) {
      setBookingError("Dropoff date must be after pickup date.");
      return;
    }
    setBookingError(null);
    createBooking(
      {
        vehicleId: vehicleIdBigInt,
        pickupDate: BigInt(new Date(pickupDate).getTime()) * BigInt(1e6),
        dropoffDate: BigInt(new Date(dropoffDate).getTime()) * BigInt(1e6)
      },
      {
        onSuccess: (result) => {
          if (result.__kind__ === "ok") {
            setConfirmation({ booking: result.ok, totalPrice });
          } else {
            setBookingError(result.err);
          }
        },
        onError: (e) => {
          setBookingError(
            e.message ?? "Something went wrong. Please try again."
          );
        }
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "vehicle_detail.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {})
    ] });
  }
  if (!vehicle) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[50vh] gap-4",
        "data-ocid": "vehicle.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground", children: "Vehicle not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This vehicle may have been removed or the link is invalid." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Fleet"
          ] }) })
        ]
      }
    );
  }
  const categoryLabel = VEHICLE_CATEGORY_LABELS[vehicle.category] ?? vehicle.category;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "vehicle_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/vehicles",
          className: "inline-flex items-center gap-1.5 hover:text-foreground transition-colors",
          "data-ocid": "vehicle_detail.back.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Fleet"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: vehicle.name })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden aspect-[16/9] bg-muted shadow-card relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: vehicle.imageUrl || FALLBACK_IMAGE,
              alt: vehicle.name,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-4 left-4",
              "data-ocid": "vehicle_detail.availability.badge",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  variant: vehicle.available ? "available" : "unavailable"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  variant: vehicle.category,
                  children: categoryLabel
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-accent text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "4.8" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "(248 reviews)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground leading-tight", children: vehicle.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-3xl text-accent", children: [
              "$",
              Number(vehicle.pricePerDay).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "per day" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground mb-3", children: "About This Vehicle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: vehicle.description })
        ] }),
        vehicle.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground mb-4", children: "Features & Amenities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: vehicle.features.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2.5 text-sm text-foreground bg-muted/40 rounded-lg px-3 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-accent shrink-0" }),
                feature
              ]
            },
            feature
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
          { icon: Shield, label: "Fully Insured" },
          { icon: Zap, label: "Instant Confirm" },
          { icon: Check, label: "Inspected & Clean" },
          { icon: Calendar, label: "Flexible Pickup" }
        ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-2 text-center p-4 rounded-xl bg-card border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: label })
            ]
          },
          label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "sticky top-24 border border-border shadow-elevated",
          "data-ocid": "booking.widget",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: confirmation ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            BookingConfirmation,
            {
              confirmation,
              vehicle,
              onReset: () => {
                setConfirmation(null);
                setPickupDate("");
                setDropoffDate("");
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Book This Vehicle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Instant confirmation · Free cancellation" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "booking-pickup",
                    className: "text-sm font-medium text-foreground block mb-1.5",
                    children: "Pickup Date"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "booking-pickup",
                    type: "date",
                    min: today,
                    value: pickupDate,
                    onChange: (e) => {
                      setPickupDate(e.target.value);
                      setBookingError(null);
                    },
                    className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-smooth",
                    "data-ocid": "booking.pickup_date.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "booking-dropoff",
                    className: "text-sm font-medium text-foreground block mb-1.5",
                    children: "Dropoff Date"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "booking-dropoff",
                    type: "date",
                    min: pickupDate || today,
                    value: dropoffDate,
                    onChange: (e) => {
                      setDropoffDate(e.target.value);
                      setBookingError(null);
                    },
                    className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-smooth",
                    "data-ocid": "booking.dropoff_date.input"
                  }
                )
              ] })
            ] }),
            totalDays > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-xl p-4 space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "$",
                  Number(vehicle.pricePerDay).toLocaleString(),
                  " ×",
                  " ",
                  totalDays,
                  " day",
                  totalDays !== 1 ? "s" : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "$",
                  totalPrice.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-2 flex justify-between font-display font-bold text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent", children: [
                  "$",
                  totalPrice.toLocaleString()
                ] })
              ] })
            ] }),
            bookingError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-2 bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2.5 text-sm text-destructive",
                "data-ocid": "booking.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: bookingError })
                ]
              }
            ),
            !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold",
                size: "lg",
                onClick: login,
                "data-ocid": "booking.login.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  "Sign In to Book"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold",
                size: "lg",
                disabled: !vehicle.available || isPending,
                onClick: handleBook,
                "data-ocid": "booking.submit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                  !vehicle.available ? "Currently Unavailable" : isPending ? "Confirming…" : "Confirm Booking"
                ]
              }
            ),
            !vehicle.available && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive text-center", children: "This vehicle is currently not available for new bookings." })
          ] }) })
        }
      ) })
    ] }) })
  ] });
}
export {
  VehicleDetailPage
};

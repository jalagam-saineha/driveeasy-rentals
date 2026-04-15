import { c as createLucideIcon, j as jsxRuntimeExports, P as ProtectedRoute, u as useVehicles, a as useAuth, o as BookingStatus, L as Link, B as Button, C as Car, l as Skeleton } from "./index-D-b77d8q.js";
import { a as useMyBookings, C as CircleCheck, b as useCancelBooking, S as StatusBadge } from "./use-bookings-B_mtjnUh.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, A as AlertDialog, d as AlertDialogTrigger, e as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, h as AlertDialogDescription, i as AlertDialogFooter, j as AlertDialogCancel, k as AlertDialogAction } from "./tabs-DxFuoZF3.js";
import { C as Card, a as CardContent } from "./card-BPPLahxR.js";
import { C as Calendar } from "./calendar-BDo5tFXk.js";
import { C as Clock } from "./clock-BW61Itam.js";
import "./Combination-CGDDXwDV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function formatDate(ns) {
  return new Date(Number(ns) / 1e6).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatPrice(cents) {
  return `$${(Number(cents) / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
function truncatePrincipal(principal) {
  if (principal.length <= 20) return principal;
  return `${principal.slice(0, 10)}…${principal.slice(-6)}`;
}
function BookingCard({
  booking,
  vehicleName,
  index,
  showCancel = false
}) {
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();
  const isConfirmed = booking.status === BookingStatus.confirmed;
  const isCancelled = booking.status === BookingStatus.cancelled;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `border border-border shadow-card transition-smooth hover:shadow-elevated ${isCancelled ? "opacity-65" : ""}`,
      "data-ocid": `booking.item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-full sm:w-1.5 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg h-1.5 sm:h-auto shrink-0 ${isConfirmed ? "bg-accent" : "bg-muted-foreground/30"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${isConfirmed ? "bg-accent/10" : "bg-muted"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Car,
                  {
                    className: `w-5 h-5 ${isConfirmed ? "text-accent" : "text-muted-foreground"}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusBadge,
                  {
                    variant: isConfirmed ? "confirmed" : "cancelled"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded", children: [
                  "#",
                  booking.referenceNumber
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base truncate max-w-xs", children: vehicleName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                  formatDate(booking.pickupDate)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground/50 hidden sm:block" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 sm:ml-0 ml-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                  formatDate(booking.dropoffDate)
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 sm:ml-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: formatPrice(booking.totalAmount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "total" })
            ] }),
            showCancel && isConfirmed && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/50 transition-smooth",
                  "data-ocid": `booking.cancel_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
                    "Cancel"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "booking.cancel.dialog", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display", children: "Cancel this booking?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                    "You're about to cancel",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: vehicleName }),
                    " ",
                    "(ref",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                      "#",
                      booking.referenceNumber
                    ] }),
                    "). This action cannot be undone."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "booking.cancel.cancel_button", children: "Keep Booking" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      onClick: () => cancelBooking(booking.id),
                      disabled: isCancelling,
                      className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                      "data-ocid": "booking.cancel.confirm_button",
                      children: isCancelling ? "Cancelling…" : "Yes, Cancel Booking"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ] }) })
    }
  );
}
function BookingListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, k)) });
}
function EmptyState({ tab }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border border-dashed border-border bg-muted/10",
      "data-ocid": `${tab}_bookings.empty_state`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex flex-col items-center justify-center py-14 gap-3 text-center", children: tab === "upcoming" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-7 h-7 text-accent/60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "No upcoming bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Browse our premium fleet and book your perfect ride for any occasion." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            className: "mt-2 bg-accent text-accent-foreground hover:bg-accent/90 gap-2 transition-smooth",
            "data-ocid": "dashboard.browse_fleet.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-4 h-4" }),
              "Browse Fleet"
            ]
          }
        ) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-7 h-7 text-muted-foreground/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "No past bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Your completed and cancelled bookings will appear here." })
      ] }) })
    }
  );
}
function DashboardContent() {
  const { data: bookings, isLoading: bookingsLoading } = useMyBookings();
  const { data: vehicles, isLoading: vehiclesLoading } = useVehicles();
  const { principalText } = useAuth();
  const isLoading = bookingsLoading || vehiclesLoading;
  const vehicleMap = new Map(
    (vehicles ?? []).map((v) => [v.id.toString(), v.name])
  );
  const getVehicleName = (vehicleId) => vehicleMap.get(vehicleId.toString()) ?? "Vehicle";
  const now = Date.now() * 1e6;
  const upcomingBookings = (bookings ?? []).filter(
    (b) => b.status === BookingStatus.confirmed && Number(b.pickupDate) >= now
  );
  const pastBookings = (bookings ?? []).filter(
    (b) => b.status === BookingStatus.cancelled || b.status === BookingStatus.confirmed && Number(b.pickupDate) < now
  );
  const totalBookings = (bookings ?? []).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.page", className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: "My Dashboard" }),
          principalText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: truncatePrincipal(principalText) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-xl border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total bookings:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: isLoading ? "—" : totalBookings })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2 transition-smooth",
            "data-ocid": "dashboard.book_now.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-4 h-4" }),
              "Book a Car"
            ]
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "upcoming", "data-ocid": "dashboard.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-8 bg-muted/50 p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "upcoming",
            className: "gap-2 font-display data-[state=active]:bg-card data-[state=active]:shadow-card transition-smooth",
            "data-ocid": "dashboard.upcoming.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
              "Upcoming",
              !isLoading && upcomingBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs bg-accent/15 text-accent border border-accent/20 px-1.5 py-0 rounded-full font-semibold", children: upcomingBookings.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "past",
            className: "gap-2 font-display data-[state=active]:bg-card data-[state=active]:shadow-card transition-smooth",
            "data-ocid": "dashboard.past.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
              "Past",
              !isLoading && pastBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs bg-muted text-muted-foreground border border-border px-1.5 py-0 rounded-full font-semibold", children: pastBookings.length })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "upcoming", "data-ocid": "dashboard.upcoming.panel", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookingListSkeleton, {}) : upcomingBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tab: "upcoming" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "upcoming_bookings.list", children: upcomingBookings.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        BookingCard,
        {
          booking,
          vehicleName: getVehicleName(booking.vehicleId),
          index: i + 1,
          showCancel: true
        },
        booking.id.toString()
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "past", "data-ocid": "dashboard.past.panel", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookingListSkeleton, {}) : pastBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tab: "past" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "past_bookings.list", children: pastBookings.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        BookingCard,
        {
          booking,
          vehicleName: getVehicleName(booking.vehicleId),
          index: i + 1,
          showCancel: false
        },
        booking.id.toString()
      )) }) })
    ] }) })
  ] });
}
function DashboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardContent, {}) });
}
export {
  DashboardPage
};

import { c as createLucideIcon, u as useVehicles, a as useAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, V as VehicleGridSkeleton, C as Car, S as Shield } from "./index-D-b77d8q.js";
import { V as VehicleCard } from "./VehicleCard-BC4KG0iw.js";
import { C as Card, a as CardContent } from "./card-BPPLahxR.js";
import { L as Label, I as Input } from "./label-DRKFVyur.js";
import { S as Star } from "./star-I0q6OLRm.js";
import { C as Clock } from "./clock-BW61Itam.js";
import "./types-C4-VQn31.js";
import "./calendar-BDo5tFXk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
];
const Headphones = createLucideIcon("headphones", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const STATS = [
  { value: "500+", label: "Vehicles" },
  { value: "50K+", label: "Happy Customers" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" }
];
const WHY_CHOOSE_US = [
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    body: "Book your vehicle in minutes with our streamlined checkout. Instant confirmation, no phone calls required."
  },
  {
    icon: Car,
    title: "Wide Selection",
    body: "From compact city cars to rugged SUVs and luxury sedans — hundreds of vehicles across every category."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    body: "Our team is available around the clock to assist you before, during, and after your rental journey."
  }
];
function HomePage() {
  const { data: vehicles, isLoading } = useVehicles();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [pickup, setPickup] = reactExports.useState("");
  const [dropoff, setDropoff] = reactExports.useState("");
  const featuredVehicles = (vehicles == null ? void 0 : vehicles.filter((v) => v.available).slice(0, 6)) ?? [];
  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set("pickup", pickup);
    if (dropoff) params.set("dropoff", dropoff);
    navigate({
      to: "/vehicles",
      search: params.toString()
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative bg-card border-b border-border overflow-hidden",
        id: "hero",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent animate-pulse" }),
                "Real-time availability"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight", children: [
                "Drive Your ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Way" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed max-w-lg", children: "Premium vehicles for every journey. Book instantly, drive confidently — your perfect ride is just a few clicks away." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSearch,
                className: "bg-background border border-border rounded-2xl p-4 shadow-card flex flex-col sm:flex-row gap-3 items-end",
                "data-ocid": "hero.search.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "pickup-date",
                        className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                        children: "Pickup Date"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "pickup-date",
                        type: "date",
                        value: pickup,
                        onChange: (e) => setPickup(e.target.value),
                        min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                        className: "bg-card border-border focus-visible:ring-accent",
                        "data-ocid": "hero.pickup_date.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "dropoff-date",
                        className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                        children: "Drop-off Date"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "dropoff-date",
                        type: "date",
                        value: dropoff,
                        onChange: (e) => setDropoff(e.target.value),
                        min: pickup || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                        className: "bg-card border-border focus-visible:ring-accent",
                        "data-ocid": "hero.dropoff_date.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      size: "default",
                      className: "gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap px-5 shrink-0",
                      "data-ocid": "hero.search.submit_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                        "Search"
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-6 pt-1", children: STATS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl text-foreground", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
            ] }, label)) }),
            !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: login,
                className: "gap-2",
                "data-ocid": "hero.sign_in.button",
                children: "Sign In to Book"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative hidden lg:flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/images/hero-car.jpg",
                alt: "Premium DriveEasy rental vehicle",
                className: "w-full h-full object-cover",
                onError: (e) => {
                  e.currentTarget.src = "/assets/images/vehicle-placeholder.svg";
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-elevated border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-accent fill-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-sm text-foreground", children: "4.9 / 5.0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "12,400+ reviews" })
              ] })
            ] }) })
          ] }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", id: "featured", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground", children: "Featured Vehicles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Top-rated vehicles ready to book" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "gap-1.5 text-accent hover:text-accent",
            "data-ocid": "home.view_all.button",
            children: [
              "View All Vehicles ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        ) })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleGridSkeleton, { count: 6 }) : featuredVehicles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: featuredVehicles.map((vehicle, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          VehicleCard,
          {
            vehicle,
            index: i
          },
          vehicle.id.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "lg",
            className: "gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8",
            "data-ocid": "home.view_all_cta.button",
            children: [
              "View All Vehicles",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        ) }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 gap-4",
          "data-ocid": "vehicles.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-12 h-12 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No vehicles available right now." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", children: "Browse All Vehicles" }) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 border-t border-b border-border py-16",
        id: "why-choose-us",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Why Choose Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-xl mx-auto", children: "DriveEasy delivers a rental experience built around simplicity, choice, and round-the-clock support." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: WHY_CHOOSE_US.map(({ icon: Icon, title, body }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border border-border shadow-card bg-card transition-smooth hover:shadow-elevated hover:border-accent/30",
              "data-ocid": `why_choose_us.${title.toLowerCase().replace(/\s+/g, "_")}.card`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg mb-2", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: body })
                ] })
              ] })
            },
            title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", id: "trust", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 text-center", children: [
      {
        icon: Shield,
        title: "Fully Insured Fleet",
        body: "Comprehensive insurance on every vehicle — your safety and peace of mind come first."
      },
      {
        icon: Clock,
        title: "Instant Confirmation",
        body: "Bookings auto-confirmed in real time. No waiting, no phone calls."
      },
      {
        icon: Star,
        title: "Premium Experience",
        body: "From booking to drop-off, every step is designed to be smooth and enjoyable."
      }
    ].map(({ icon: Icon, title, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 px-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xs", children: body })
        ]
      },
      title
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-accent py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-accent-foreground mb-4", children: "Ready to Hit the Road?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent-foreground/80 mb-8 max-w-md mx-auto", children: "Join thousands of satisfied customers who trust DriveEasy for their rental needs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "lg",
          variant: "secondary",
          className: "gap-2 font-semibold px-8",
          "data-ocid": "cta.browse_fleet.button",
          children: [
            "Browse Fleet Now",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      ) })
    ] }) })
  ] });
}
export {
  HomePage
};

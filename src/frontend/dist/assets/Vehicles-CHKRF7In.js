import { c as createLucideIcon, u as useVehicles, r as reactExports, j as jsxRuntimeExports, d as Separator, B as Button, V as VehicleGridSkeleton, C as Car, X, e as VehicleCategory } from "./index-D-b77d8q.js";
import { B as Badge, V as VehicleCard } from "./VehicleCard-BC4KG0iw.js";
import { L as Label, I as Input } from "./label-DRKFVyur.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BGYgoWpE.js";
import { V as VEHICLE_CATEGORY_LABELS } from "./types-C4-VQn31.js";
import { C as Calendar } from "./calendar-BDo5tFXk.js";
import "./card-BPPLahxR.js";
import "./star-I0q6OLRm.js";
import "./Combination-CGDDXwDV.js";
import "./check-D8yQCwcv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "m21 8-4-4-4 4", key: "1c9v7m" }],
  ["path", { d: "M17 4v16", key: "7dpous" }]
];
const ArrowDownUp = createLucideIcon("arrow-down-up", __iconNode$2);
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
const SORT_OPTIONS = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name A–Z" }
];
const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  ...Object.values(VehicleCategory).map((cat) => ({
    value: cat,
    label: VEHICLE_CATEGORY_LABELS[cat] ?? cat
  }))
];
function getQueryParam(name) {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}
function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function VehiclesPage() {
  const { data: vehicles, isLoading } = useVehicles();
  const pickupParam = getQueryParam("pickup");
  const dropoffParam = getQueryParam("dropoff");
  const [category, setCategory] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("price-asc");
  const [availableOnly, setAvailableOnly] = reactExports.useState(false);
  const [minPrice, setMinPrice] = reactExports.useState("");
  const [maxPrice, setMaxPrice] = reactExports.useState("");
  const maxDataPrice = reactExports.useMemo(() => {
    if (!(vehicles == null ? void 0 : vehicles.length)) return 0;
    return Math.max(...vehicles.map((v) => Number(v.pricePerDay)));
  }, [vehicles]);
  const filtered = reactExports.useMemo(() => {
    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;
    return (vehicles ?? []).filter((v) => {
      const matchCategory = category === "all" || v.category === category;
      const matchAvail = !availableOnly || v.available;
      const price = Number(v.pricePerDay);
      const matchMin = min === null || price >= min;
      const matchMax = max === null || price <= max;
      return matchCategory && matchAvail && matchMin && matchMax;
    }).sort((a, b) => {
      if (sort === "price-asc") return Number(a.pricePerDay - b.pricePerDay);
      if (sort === "price-desc") return Number(b.pricePerDay - a.pricePerDay);
      return a.name.localeCompare(b.name);
    });
  }, [vehicles, category, availableOnly, sort, minPrice, maxPrice]);
  const hasActiveFilters = category !== "all" || availableOnly || minPrice !== "" || maxPrice !== "";
  function clearFilters() {
    setCategory("all");
    setAvailableOnly(false);
    setMinPrice("");
    setMaxPrice("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "vehicles.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-1", children: "Our Fleet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: isLoading ? "Loading vehicles…" : `${(vehicles == null ? void 0 : vehicles.length) ?? 0} vehicles in our collection` })
      ] }),
      (pickupParam || dropoffParam) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-sm",
          "data-ocid": "vehicles.date_filter.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
              pickupParam && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Pick-up: " }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-accent", children: formatDate(pickupParam) })
              ] }),
              pickupParam && dropoffParam && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mx-2", children: "→" }),
              dropoffParam && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Drop-off: " }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-accent", children: formatDate(dropoffParam) })
              ] })
            ] })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border sticky top-16 z-30 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 mr-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5" }),
          "Category"
        ] }),
        CATEGORY_OPTIONS.map((opt) => {
          const isActive = category === opt.value;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCategory(opt.value),
              "data-ocid": `vehicles.category.${opt.value}`,
              className: [
                "px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
                isActive ? "bg-accent text-accent-foreground border-accent shadow-sm" : "bg-background text-foreground border-border hover:border-accent/50 hover:text-accent"
              ].join(" "),
              children: opt.label
            },
            opt.value
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "min-price",
                className: "text-xs text-muted-foreground",
                children: "Min $/day"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "min-price",
                type: "number",
                placeholder: "0",
                value: minPrice,
                onChange: (e) => setMinPrice(e.target.value),
                className: "w-24 h-8 text-sm bg-background",
                min: 0,
                "data-ocid": "vehicles.min_price.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mb-2", children: "–" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "max-price",
                className: "text-xs text-muted-foreground",
                children: "Max $/day"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "max-price",
                type: "number",
                placeholder: maxDataPrice ? String(maxDataPrice) : "∞",
                value: maxPrice,
                onChange: (e) => setMaxPrice(e.target.value),
                className: "w-24 h-8 text-sm bg-background",
                min: 0,
                "data-ocid": "vehicles.max_price.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: availableOnly ? "default" : "outline",
            size: "sm",
            onClick: () => setAvailableOnly((v) => !v),
            className: [
              "h-8 gap-1.5",
              availableOnly ? "bg-accent text-accent-foreground hover:bg-accent/90 border-accent" : ""
            ].join(" "),
            "data-ocid": "vehicles.available_only.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `w-2 h-2 rounded-full ${availableOnly ? "bg-accent-foreground" : "bg-muted-foreground"}`
                }
              ),
              "Available only"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownUp, { className: "w-3 h-3" }),
            "Sort"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: sort,
              onValueChange: (v) => setSort(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-44 h-8 bg-background text-sm",
                    "data-ocid": "vehicles.sort.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
              ]
            }
          )
        ] }) }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: clearFilters,
            className: "h-8 gap-1.5 text-muted-foreground hover:text-destructive",
            "data-ocid": "vehicles.clear_filters.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
              "Clear"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleGridSkeleton, { count: 6 }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 gap-5",
        "data-ocid": "vehicles.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-9 h-9 text-muted-foreground/50" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg mb-1", children: "No vehicles found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Try adjusting your filters to explore more of our fleet." })
          ] }),
          hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: clearFilters,
              className: "gap-1.5",
              "data-ocid": "vehicles.empty_clear_filters.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                "Clear all filters"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-sm text-muted-foreground",
            "data-ocid": "vehicles.result_count",
            children: [
              "Showing",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
              " ",
              "vehicle",
              filtered.length !== 1 ? "s" : "",
              vehicles && filtered.length < vehicles.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                " ",
                "of ",
                vehicles.length
              ] })
            ]
          }
        ),
        category !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors",
            onClick: () => setCategory("all"),
            "data-ocid": "vehicles.active_filter.category",
            children: [
              VEHICLE_CATEGORY_LABELS[category] ?? category,
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
            ]
          }
        ),
        availableOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors",
            onClick: () => setAvailableOnly(false),
            "data-ocid": "vehicles.active_filter.available",
            children: [
              "Available only",
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
            ]
          }
        ),
        (minPrice !== "" || maxPrice !== "") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors",
            onClick: () => {
              setMinPrice("");
              setMaxPrice("");
            },
            "data-ocid": "vehicles.active_filter.price",
            children: [
              "$",
              minPrice || "0",
              " – $",
              maxPrice || "∞",
              "/day",
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "vehicles.list",
          children: filtered.map((vehicle, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            VehicleCard,
            {
              vehicle,
              index: i
            },
            vehicle.id.toString()
          ))
        }
      )
    ] }) }) })
  ] });
}
export {
  VehiclesPage
};

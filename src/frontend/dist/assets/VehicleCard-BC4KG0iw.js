import { j as jsxRuntimeExports, f as Slot, g as cn, h as cva, L as Link, B as Button } from "./index-D-b77d8q.js";
import { C as Card, a as CardContent } from "./card-BPPLahxR.js";
import { V as VEHICLE_CATEGORY_LABELS } from "./types-C4-VQn31.js";
import { S as Star } from "./star-I0q6OLRm.js";
import { C as Calendar } from "./calendar-BDo5tFXk.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const FALLBACK_IMAGE = "/assets/images/vehicle-placeholder.svg";
const CATEGORY_COLORS = {
  car: "bg-primary/10 text-primary border-primary/20",
  suv: "bg-accent/10 text-accent border-accent/20",
  van: "bg-secondary text-secondary-foreground border-border",
  truck: "bg-muted text-muted-foreground border-border",
  motorcycle: "bg-destructive/10 text-destructive border-destructive/20"
};
function VehicleCard({ vehicle, index = 0 }) {
  const categoryLabel = VEHICLE_CATEGORY_LABELS[vehicle.category] ?? vehicle.category;
  const categoryClass = CATEGORY_COLORS[vehicle.category] ?? "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "group overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 bg-card",
      "data-ocid": `vehicle.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-[16/9] bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: vehicle.imageUrl || FALLBACK_IMAGE,
              alt: vehicle.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
              onError: (e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${vehicle.available ? "bg-accent/90 text-accent-foreground border-accent/30" : "bg-destructive/80 text-destructive-foreground border-destructive/20"}`,
              "data-ocid": `vehicle.availability.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-1.5 h-1.5 rounded-full ${vehicle.available ? "bg-accent-foreground" : "bg-destructive-foreground"}`
                  }
                ),
                vehicle.available ? "Available" : "Unavailable"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${categoryClass}`,
              children: categoryLabel
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight line-clamp-1", children: vehicle.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-accent text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "4.8" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed", children: vehicle.description }),
          vehicle.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mb-4", children: [
            vehicle.features.slice(0, 3).map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs font-normal px-2 py-0.5",
                children: feature
              },
              feature
            )),
            vehicle.features.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs font-normal px-2 py-0.5",
                children: [
                  "+",
                  vehicle.features.length - 3,
                  " more"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl text-accent", children: [
                "$",
                Number(vehicle.pricePerDay).toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "/ day" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/vehicles/$vehicleId",
                params: { vehicleId: vehicle.id.toString() },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    disabled: !vehicle.available,
                    className: "gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50",
                    "data-ocid": `vehicle.book_button.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                      vehicle.available ? "Book Now" : "Unavailable"
                    ]
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  Badge as B,
  VehicleCard as V
};

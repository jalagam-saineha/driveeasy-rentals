import { c as createLucideIcon, j as jsxRuntimeExports, g as cn, F as useQueryClient, G as useMutation, H as useQuery, I as useActor, n as ue, J as createActor } from "./index-D-b77d8q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
const VARIANT_CLASSES = {
  available: "bg-accent/10 text-accent border border-accent/25 font-semibold",
  unavailable: "bg-destructive/10 text-destructive border border-destructive/25 font-semibold",
  confirmed: "bg-accent/10 text-accent border border-accent/25 font-semibold",
  cancelled: "bg-destructive/10 text-destructive border border-destructive/25 font-semibold",
  car: "bg-primary/10 text-primary border border-primary/20",
  suv: "bg-accent/10 text-accent border border-accent/20",
  van: "bg-secondary text-secondary-foreground border border-border",
  truck: "bg-muted text-muted-foreground border border-border",
  motorcycle: "bg-destructive/10 text-destructive border border-destructive/20",
  admin: "bg-primary/15 text-primary border border-primary/30 font-semibold",
  default: "bg-muted text-muted-foreground border border-border"
};
const DEFAULT_LABELS = {
  available: "Available",
  unavailable: "Unavailable",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  admin: "Admin"
};
function StatusBadge({
  variant,
  children,
  className
}) {
  const label = children ?? DEFAULT_LABELS[variant] ?? variant;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs",
        VARIANT_CLASSES[variant],
        className
      ),
      children: [
        (variant === "available" || variant === "confirmed") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current opacity-70" }),
        (variant === "unavailable" || variant === "cancelled") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current opacity-70" }),
        label
      ]
    }
  );
}
function useBackendActor() {
  return useActor(createActor);
}
function useMyBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.myBookings();
    },
    enabled: !!actor && !isFetching
  });
}
function useAllBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllBookings();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createBooking(input);
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        queryClient.invalidateQueries({ queryKey: ["myBookings"] });
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        ue.success(`Booking confirmed! Ref: ${result.ok.referenceNumber}`);
      } else {
        ue.error(result.err);
      }
    },
    onError: (e) => ue.error(e.message)
  });
}
function useCancelBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.cancelBooking(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      ue.success("Booking cancelled");
    },
    onError: (e) => ue.error(e.message)
  });
}
export {
  CircleCheck as C,
  StatusBadge as S,
  useMyBookings as a,
  useCancelBooking as b,
  useAllBookings as c,
  useCreateBooking as u
};

import { Layout } from "@/components/Layout";
import { PageLoading } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const HomePage = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.HomePage })),
);
const VehiclesPage = lazy(() =>
  import("@/pages/Vehicles").then((m) => ({ default: m.VehiclesPage })),
);
const VehicleDetailPage = lazy(() =>
  import("@/pages/VehicleDetail").then((m) => ({
    default: m.VehicleDetailPage,
  })),
);
const DashboardPage = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.DashboardPage })),
);
const AdminPage = lazy(() =>
  import("@/pages/Admin").then((m) => ({ default: m.AdminPage })),
);

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Component />
    </Suspense>
  );
}

// Root route with Layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// Home
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => withSuspense(HomePage),
});

// Vehicles catalog
const vehiclesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vehicles",
  component: () => withSuspense(VehiclesPage),
});

// Vehicle detail
const vehicleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vehicles/$vehicleId",
  component: () => withSuspense(VehicleDetailPage),
});

// Dashboard (protected)
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>{withSuspense(DashboardPage)}</ProtectedRoute>
  ),
});

// Admin (protected)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => <ProtectedRoute>{withSuspense(AdminPage)}</ProtectedRoute>,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  vehiclesRoute,
  vehicleDetailRoute,
  dashboardRoute,
  adminRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import { PageLoading } from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <PageLoading message="Checking authentication…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

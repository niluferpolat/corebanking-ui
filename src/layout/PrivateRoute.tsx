import type { ReactNode } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Navigate } from "react-router";

type PrivateRouteProps = {
  children: ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

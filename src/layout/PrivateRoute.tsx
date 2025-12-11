import { useAuthStore } from "@/store/auth.store";
import { Navigate } from "react-router";

export function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RoleGuard({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || !user) return children;
  if (user.role === "admin") return children;
  if (!user.hasSelectedRole && location.pathname !== "/complete-role") {
    return <Navigate to="/complete-role" replace />;
  }
  if (user.hasSelectedRole && location.pathname === "/complete-role") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

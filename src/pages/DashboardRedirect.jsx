import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (user.role === "founder") return <Navigate to="/dashboard/founder" replace />;
  return <Navigate to="/dashboard/collaborator" replace />;
}

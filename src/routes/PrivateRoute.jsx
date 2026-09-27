import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader label="Checking authentication..." />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

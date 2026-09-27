import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../ui/Button";

const linkClass = ({ isActive }) =>
  `text-sm font-medium ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-muted)] hover:text-white"}`;

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f14cc] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="font-display text-xl font-bold text-white">
          Startup<span className="text-[var(--color-accent)]">Forge</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/startups" className={linkClass}>Browse Startups</NavLink>
          <NavLink to="/opportunities" className={linkClass}>Browse Opportunities</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-white">Dashboard</Link>
              <Button variant="ghost" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../ui/Button";
import NotificationBell from "./NotificationBell";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"}`;

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/startups", label: "Browse Startups" },
  { to: "/opportunities", label: "Browse Opportunities" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          Startup<span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">Forge</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleTheme} className="rounded-xl border border-[var(--border)] bg-[var(--panel-solid)] p-2 text-[var(--text)]" aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <NotificationBell />
          <button type="button" className="rounded-xl border border-[var(--border)] bg-[var(--panel-solid)] p-2 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          {user ? (
            <>
              <Link to="/dashboard" className="hidden text-sm font-medium sm:inline">Dashboard</Link>
              <Button variant="ghost" className="hidden sm:inline-flex" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Link to="/login" className="hidden sm:block">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--panel-solid)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.end} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                <button type="button" onClick={() => { logout(); setOpen(false); }}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

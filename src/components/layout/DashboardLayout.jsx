import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const itemClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm ${isActive ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]" : "text-[var(--color-muted)] hover:bg-white/5"}`;

export default function DashboardLayout({ links }) {
  const { user } = useAuth();

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-2xl border border-white/10 bg-[var(--color-panel)] p-4">
        <div className="mb-6 border-b border-white/10 pb-4">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-[var(--color-muted)]">{user?.role}</p>
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={itemClass} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <section className="rounded-2xl border border-white/10 bg-[var(--color-panel)] p-6">
        <Outlet />
      </section>
    </div>
  );
}

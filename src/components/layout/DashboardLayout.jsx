import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const itemClass = ({ isActive }) =>
  `block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
    isActive
      ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white"
      : "text-[var(--muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--text)]"
  }`;

export default function DashboardLayout({ links }) {
  const { user } = useAuth();

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <aside className="glass-panel h-fit rounded-2xl p-4">
        <div className="mb-6 border-b border-[var(--border)] pb-4">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{user?.role}</p>
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={itemClass} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <section className="glass-panel rounded-2xl p-6 md:p-8">
        <Outlet />
      </section>
    </div>
  );
}

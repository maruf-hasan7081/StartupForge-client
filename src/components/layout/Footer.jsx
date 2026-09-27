import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <Link to="/" className="font-display text-lg font-bold">
            Startup<span className="text-[var(--accent)]">Forge</span>
          </Link>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Where founders meet builders. Ship faster with the right team.
          </p>
        </div>
        <div>
          <p className="mb-3 font-semibold">Quick Links</p>
          <div className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <Link to="/startups">Browse Startups</Link>
            <Link to="/opportunities">Browse Opportunities</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Social Links</p>
          <div className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Contact Information</p>
          <p className="text-sm text-[var(--muted)]">hello@startupforge.com</p>
          <p className="text-sm text-[var(--muted)]">+880 1234 567890</p>
        </div>
      </div>
      <p className="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} StartupForge. All rights reserved.
      </p>
    </footer>
  );
}

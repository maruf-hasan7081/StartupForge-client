import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#090d12]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold">StartupForge</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Connect founders with collaborators to build the next generation of startups.
          </p>
        </div>
        <div>
          <p className="mb-3 font-semibold">Quick Links</p>
          <div className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
            <Link to="/startups">Browse Startups</Link>
            <Link to="/opportunities">Browse Opportunities</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Social</p>
          <div className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Contact</p>
          <p className="text-sm text-[var(--color-muted)]">hello@startupforge.com</p>
          <p className="text-sm text-[var(--color-muted)]">+880 1234 567890</p>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-[var(--color-muted)]">
        © {new Date().getFullYear()} StartupForge. All rights reserved.
      </p>
    </footer>
  );
}

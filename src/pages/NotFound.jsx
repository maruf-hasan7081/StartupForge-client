import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="page-container flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
      <div className="text-7xl font-bold text-[var(--accent)]">404</div>
      <h1 className="mt-4 font-display text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-[var(--muted)]">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6">
        <Button>Back Home</Button>
      </Link>
    </div>
  );
}

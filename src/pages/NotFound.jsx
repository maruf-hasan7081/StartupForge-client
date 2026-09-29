import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

function NotFoundIllustration() {
  return (
    <svg
      className="mx-auto h-40 w-40 text-[var(--accent)]"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path
        d="M55 95h90M70 125c8 18 52 18 60 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="72" cy="82" r="8" fill="currentColor" />
      <circle cx="128" cy="82" r="8" fill="currentColor" />
      <text
        x="100"
        y="178"
        textAnchor="middle"
        fill="currentColor"
        fontSize="28"
        fontWeight="bold"
        fontFamily="system-ui,sans-serif"
      >
        404
      </text>
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="page-container flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
      <NotFoundIllustration />
      <h1 className="mt-6 font-display text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-[var(--muted)]">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6">
        <Button>Back Home</Button>
      </Link>
    </div>
  );
}

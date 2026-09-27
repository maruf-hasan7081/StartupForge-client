export default function Card({ children, className = "" }) {
  return (
    <div
      className={`glass-panel flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] ${className}`}
    >
      {children}
    </div>
  );
}

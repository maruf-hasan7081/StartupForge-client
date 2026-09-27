export default function Card({ children, className = "" }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-white/10 bg-[var(--color-panel)] p-5 shadow-lg shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}

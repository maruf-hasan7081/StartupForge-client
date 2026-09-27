export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-[var(--color-muted)]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[var(--color-accent)]" />
      <p>{label}</p>
    </div>
  );
}

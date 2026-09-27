export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50";
  const styles = {
    primary: "bg-[var(--color-accent)] text-[#04140d] hover:brightness-110",
    ghost: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    danger: "bg-red-500/90 text-white hover:bg-red-500",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

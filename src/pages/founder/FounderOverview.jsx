import { useEffect, useState } from "react";
import api from "../../api/client";

export default function FounderOverview() {
  const [stats, setStats] = useState({ opportunities: 0, applications: 0, accepted: 0 });

  useEffect(() => {
    api.get("/api/dashboard/founder").then((res) => setStats(res.data.stats));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Founder Overview</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ["Total Opportunities", stats.opportunities],
          ["Total Applications", stats.applications],
          ["Accepted Members", stats.accepted],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-[var(--color-muted)]">{label}</p>
            <p className="mt-2 text-3xl font-bold text-[var(--color-accent)]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

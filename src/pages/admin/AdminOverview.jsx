import { useEffect, useState } from "react";
import api from "../../api/client";

export default function AdminOverview() {
  const [stats, setStats] = useState({ users: 0, startups: 0, opportunities: 0, revenue: 0 });

  useEffect(() => {
    api.get("/api/admin/overview").then((res) => setStats(res.data.stats));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Admin Overview</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          ["Total Users", stats.users],
          ["Total Startups", stats.startups],
          ["Total Opportunities", stats.opportunities],
          ["Total Revenue", `$${stats.revenue}`],
        ].map(([label, value]) => (
          <div key={label} className="stat-card">
            <p className="text-sm text-[var(--muted)]">{label}</p>
            <p className="mt-2 text-2xl font-bold text-[var(--accent)]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

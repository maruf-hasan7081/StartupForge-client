import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../../api/client";

const COLORS = ["#7c6cff", "#2dd4bf", "#f59e0b"];

export default function FounderOverview() {
  const [stats, setStats] = useState({ opportunities: 0, applications: 0, accepted: 0 });
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get("/api/dashboard/founder").then((res) => {
      setStats(res.data.stats);
      setAnalytics(res.data.analytics);
    });
  }, []);

  const pieData = analytics
    ? [
        { name: "Pending", value: analytics.statusBreakdown.pending },
        { name: "Accepted", value: analytics.statusBreakdown.accepted },
        { name: "Rejected", value: analytics.statusBreakdown.rejected },
      ]
    : [];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Founder analytics</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">Track hiring performance across your startup.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Opportunities", stats.opportunities],
          ["Applications", stats.applications],
          ["Accepted", stats.accepted],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-[var(--bg-soft)] p-5">
            <p className="text-sm text-[var(--muted)]">{label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-[var(--accent)]">{value}</p>
          </div>
        ))}
      </div>

      {analytics && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-[var(--bg-soft)] p-4">
            <p className="mb-3 text-sm font-semibold">Applications by month</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={analytics.applicationsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} />
                <YAxis stroke="var(--muted)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--accent)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl bg-[var(--bg-soft)] p-4">
            <p className="mb-3 text-sm font-semibold">Application status</p>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

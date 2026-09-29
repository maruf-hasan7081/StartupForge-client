import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/client";
import Button from "../../components/ui/Button";

export default function CollaboratorOverview() {
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, rejected: 0 });

  useEffect(() => {
    api.get("/api/applications/mine").then((res) => {
      const apps = res.data.applications || [];
      setStats({
        total: apps.length,
        pending: apps.filter((a) => a.status === "pending").length,
        accepted: apps.filter((a) => a.status === "accepted").length,
        rejected: apps.filter((a) => a.status === "rejected").length,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Collaborator Overview</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">Track your applications at a glance.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          ["Total Applications", stats.total],
          ["Pending", stats.pending],
          ["Accepted", stats.accepted],
          ["Rejected", stats.rejected],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-[var(--bg-soft)] p-5">
            <p className="text-sm text-[var(--muted)]">{label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-[var(--accent)]">{value}</p>
          </div>
        ))}
      </div>
      <Link to="/opportunities" className="mt-8 inline-block">
        <Button variant="ghost">Browse Opportunities</Button>
      </Link>
    </div>
  );
}

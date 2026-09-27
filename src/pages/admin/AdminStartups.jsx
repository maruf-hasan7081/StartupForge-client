import { useEffect, useState } from "react";
import api from "../../api/client";
import Button from "../../components/ui/Button";

export default function AdminStartups() {
  const [startups, setStartups] = useState([]);

  const load = () => api.get("/api/admin/startups").then((res) => setStartups(res.data.startups || []));
  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Manage Startups</h1>
      <div className="mt-6 space-y-3">
        {startups.map((startup) => (
          <div key={startup._id} className="panel-row flex items-center justify-between">
            <div>
              <p className="font-semibold">{startup.startup_name}</p>
              <p className="text-sm text-[var(--muted)]">{startup.industry} · {startup.status}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => api.patch(`/api/admin/startups/${startup._id}/approve`).then(load)}>Approve</Button>
              <Button variant="danger" onClick={() => api.delete(`/api/admin/startups/${startup._id}`).then(load)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

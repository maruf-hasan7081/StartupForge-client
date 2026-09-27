import { useEffect, useState } from "react";
import api from "../../api/client";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/api/applications/mine").then((res) => setApplications(res.data.applications || []));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">My Applications</h1>
      <div className="mt-6 space-y-3">
        {applications.map((app) => (
          <div key={app._id} className="panel-row">
            <p className="font-semibold">{app.opportunity_name}</p>
            <p className="text-sm text-[var(--muted)]">{app.startup_name}</p>
            <p className="text-sm">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
            <p className="text-sm text-[var(--accent)]">Status: {app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

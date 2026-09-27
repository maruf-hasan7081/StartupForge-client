import { useEffect, useState } from "react";
import api from "../../api/client";
import Button from "../../components/ui/Button";

export default function FounderApplications() {
  const [applications, setApplications] = useState([]);

  const load = () => api.get("/api/applications/founder").then((res) => setApplications(res.data.applications || []));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/api/applications/${id}/status`, { status });
    load();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Applications</h1>
      <div className="mt-6 space-y-3">
        {applications.map((app) => (
          <div key={app._id} className="panel-row">
            <p className="font-semibold">{app.opportunity_name}</p>
            <p className="text-sm text-[var(--muted)]">{app.applicant_email}</p>
            <p className="mt-2 text-sm">{app.motivation}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">Status: {app.status}</p>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => updateStatus(app._id, "accepted")}>Accept</Button>
              <Button variant="danger" onClick={() => updateStatus(app._id, "rejected")}>Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

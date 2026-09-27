import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/client";
import Button from "../../components/ui/Button";

export default function CollaboratorOverview() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get("/api/applications/mine").then((res) => setCount(res.data.applications?.length || 0));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Collaborator Overview</h1>
      <p className="mt-4 text-[var(--muted)]">You have submitted {count} applications.</p>
      <Link to="/opportunities" className="mt-6 inline-block">
        <Button variant="ghost">Browse Opportunities</Button>
      </Link>
    </div>
  );
}

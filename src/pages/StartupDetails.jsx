import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import Loader from "../components/ui/Loader";

export default function StartupDetails() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/startups/${id}`).then((res) => {
      setStartup(res.data.startup);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!startup) return <p className="p-8 text-center">Startup not found.</p>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-[var(--color-panel)] p-8">
        <div className="flex items-center gap-4">
          <img src={startup.logo} alt="" className="h-20 w-20 rounded-xl object-cover" />
          <div>
            <h1 className="font-display text-3xl font-bold">{startup.startup_name}</h1>
            <p className="text-[var(--color-muted)]">{startup.industry} · {startup.funding_stage}</p>
          </div>
        </div>
        <p className="mt-6 text-[var(--color-muted)]">{startup.description}</p>
        <p className="mt-4 text-sm">Founder: {startup.founder_name || startup.founder_email}</p>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { useAuth } from "../contexts/AuthContext";

export default function OpportunityDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [opportunity, setOpportunity] = useState(null);
  const [portfolio, setPortfolio] = useState("");
  const [motivation, setMotivation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/opportunities/${id}`).then((res) => {
      setOpportunity(res.data.opportunity);
      setLoading(false);
    });
  }, [id]);

  const apply = async () => {
    try {
      await api.post("/api/applications", {
        opportunity_id: id,
        portfolio_link: portfolio,
        motivation,
      });
      setMessage("Application submitted successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to apply.");
    }
  };

  if (loading) return <Loader />;
  if (!opportunity) return <p className="p-8 text-center">Opportunity not found.</p>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-[var(--color-panel)] p-8">
        <h1 className="font-display text-3xl font-bold">{opportunity.role_title}</h1>
        <p className="text-[var(--color-muted)]">{opportunity.startup_name}</p>
        <p className="mt-4">{opportunity.required_skills}</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">Work type: {opportunity.work_type}</p>
        <p className="text-sm text-[var(--color-muted)]">Commitment: {opportunity.commitment_level}</p>

        {user?.role === "collaborator" && (
          <div className="mt-8 space-y-3">
            <input className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2" placeholder="Portfolio link" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
            <textarea className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2" rows={4} placeholder="Motivation message" value={motivation} onChange={(e) => setMotivation(e.target.value)} />
            <Button onClick={apply}>Apply Now</Button>
            {message && <p className="text-sm text-[var(--color-accent)]">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

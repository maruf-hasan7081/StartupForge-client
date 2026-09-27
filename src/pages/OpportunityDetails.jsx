import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { useAuth } from "../contexts/AuthContext";
import { calculateSkillMatch } from "../utils/skillMatch";

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

  const skillMatch = useMemo(() => {
    if (!opportunity || !user?.skills) return null;
    return calculateSkillMatch(user.skills, opportunity.required_skills);
  }, [opportunity, user?.skills]);

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
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="glass-panel rounded-3xl p-8">
        <h1 className="font-display text-3xl font-bold">{opportunity.role_title}</h1>
        <p className="text-[var(--muted)]">{opportunity.startup_name}</p>
        <p className="mt-4">{opportunity.required_skills}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">Work type: {opportunity.work_type}</p>
        <p className="text-sm text-[var(--muted)]">Commitment: {opportunity.commitment_level}</p>

        {user?.role === "collaborator" && skillMatch !== null && (
          <div className="mt-6 rounded-2xl bg-[var(--bg-soft)] p-4">
            <p className="text-sm text-[var(--muted)]">Skill match</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
                  style={{ width: `${skillMatch}%` }}
                />
              </div>
              <span className="font-display text-xl font-bold">{skillMatch}%</span>
            </div>
            {!user.skills && (
              <p className="mt-2 text-xs text-[var(--muted)]">Add skills in Profile to improve match accuracy.</p>
            )}
          </div>
        )}

        {user?.role === "collaborator" && (
          <div className="mt-8 space-y-3">
            <input className="input-field" placeholder="Portfolio link" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
            <textarea className="input-field" rows={4} placeholder="Motivation message" value={motivation} onChange={(e) => setMotivation(e.target.value)} />
            <Button onClick={apply}>Apply now</Button>
            {message && <p className="text-sm text-[var(--accent)]">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

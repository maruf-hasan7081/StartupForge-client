import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function CompleteRole() {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("collaborator");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    try {
      await api.patch("/api/users/role", { role });
      await refreshUser();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save role.");
    }
  };

  return (
    <div className="page-container max-w-md">
      <div className="glass-panel rounded-3xl p-8">
        <h1 className="page-title text-2xl">Choose your role</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Complete your account to continue.</p>
        <select className="input-field mt-6" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="founder">Founder</option>
          <option value="collaborator">Collaborator</option>
        </select>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <Button className="mt-4 w-full" onClick={submit}>Continue</Button>
      </div>
    </div>
  );
}

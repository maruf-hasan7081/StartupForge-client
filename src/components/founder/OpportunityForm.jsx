import { useState } from "react";
import api from "../../api/client";
import Button from "../ui/Button";

const empty = {
  role_title: "",
  required_skills: "",
  work_type: "Remote",
  commitment_level: "Full-time",
  deadline: "",
};

export default function OpportunityForm({ onSuccess, submitLabel = "Add Opportunity" }) {
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const save = async () => {
    setError("");
    try {
      await api.post("/api/opportunities", form);
      setForm(empty);
      setMessage("Opportunity created.");
      onSuccess?.();
    } catch (err) {
      const data = err.response?.data;
      setError(data?.message || "Failed to save.");
      if (data?.requiresPremium) {
        const checkout = await api.post("/api/payments/checkout");
        if (checkout.data.url) window.location.href = checkout.data.url;
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input className="input-field" placeholder="Role Title" value={form.role_title} onChange={(e) => setForm({ ...form, role_title: e.target.value })} />
        <input className="input-field" placeholder="Required Skills" value={form.required_skills} onChange={(e) => setForm({ ...form, required_skills: e.target.value })} />
        <input className="input-field" placeholder="Work Type" value={form.work_type} onChange={(e) => setForm({ ...form, work_type: e.target.value })} />
        <input className="input-field" placeholder="Commitment Level" value={form.commitment_level} onChange={(e) => setForm({ ...form, commitment_level: e.target.value })} />
        <input className="input-field md:col-span-2" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
      </div>
      <Button onClick={save}>{submitLabel}</Button>
      {message && <p className="text-sm text-[var(--accent)]">{message}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

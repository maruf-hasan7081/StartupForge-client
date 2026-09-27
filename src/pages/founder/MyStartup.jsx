import { useEffect, useState } from "react";
import api from "../../api/client";
import Button from "../../components/ui/Button";
import ImagePicker from "../../components/ui/ImagePicker";

const empty = {
  startup_name: "",
  logo: "",
  industry: "",
  description: "",
  funding_stage: "",
  team_size_needed: 1,
};

export default function MyStartup() {
  const [form, setForm] = useState(empty);
  const [startupId, setStartupId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/startups/mine").then((res) => {
      if (res.data.startup) {
        setForm(res.data.startup);
        setStartupId(res.data.startup._id);
      }
    });
  }, []);

  const save = async () => {
    if (!form.logo?.trim()) {
      setError("Startup logo URL or upload is required.");
      return;
    }
    setError("");
    if (startupId) {
      await api.patch(`/api/startups/${startupId}`, form);
      setMessage("Startup updated.");
    } else {
      const res = await api.post("/api/startups", form);
      setStartupId(res.data.startup._id);
      setMessage("Startup created.");
    }
  };

  const remove = async () => {
    if (!startupId) return;
    await api.delete(`/api/startups/${startupId}`);
    setStartupId(null);
    setForm(empty);
    setMessage("Startup removed.");
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">My Startup</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <input className="input-field" placeholder="Startup Name" value={form.startup_name} onChange={(e) => setForm({ ...form, startup_name: e.target.value })} />
        <input className="input-field" placeholder="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
        <input className="input-field" placeholder="Funding Stage" value={form.funding_stage} onChange={(e) => setForm({ ...form, funding_stage: e.target.value })} />
        <input className="input-field" type="number" placeholder="Team Size Needed" value={form.team_size_needed} onChange={(e) => setForm({ ...form, team_size_needed: Number(e.target.value) })} />
        <textarea className="input-field md:col-span-2" rows={4} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="md:col-span-2">
          <ImagePicker label="Startup logo" value={form.logo} onChange={(url) => setForm((prev) => ({ ...prev, logo: url }))} onError={setError} />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <Button onClick={save}>{startupId ? "Update Startup" : "Create Startup"}</Button>
        {startupId && <Button variant="danger" onClick={remove}>Delete Startup</Button>}
      </div>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      {message && <p className="mt-3 text-sm text-[var(--accent)]">{message}</p>}
    </div>
  );
}

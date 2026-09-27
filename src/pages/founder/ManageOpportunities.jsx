import { useEffect, useState } from "react";
import api from "../../api/client";
import Button from "../../components/ui/Button";

const empty = {
  role_title: "",
  required_skills: "",
  work_type: "Remote",
  commitment_level: "Full-time",
  deadline: "",
};

export default function ManageOpportunities() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const load = () => api.get("/api/opportunities/founder/mine").then((res) => setItems(res.data.opportunities || []));
  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      if (editingId) {
        await api.patch(`/api/opportunities/${editingId}`, form);
      } else {
        await api.post("/api/opportunities", form);
      }
      setForm(empty);
      setEditingId(null);
      setMessage("Saved.");
      load();
    } catch (error) {
      const data = error.response?.data;
      setMessage(data?.message || "Failed to save.");
      if (data?.requiresPremium) {
        const checkout = await api.post("/api/payments/checkout");
        if (checkout.data.url) window.location.href = checkout.data.url;
      }
    }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({
      role_title: item.role_title,
      required_skills: item.required_skills,
      work_type: item.work_type,
      commitment_level: item.commitment_level,
      deadline: item.deadline?.slice(0, 10) || "",
    });
  };

  const remove = async (id) => {
    await api.delete(`/api/opportunities/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Manage Opportunities</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <input className="rounded-xl border border-white/10 bg-black/20 px-3 py-2" placeholder="Role Title" value={form.role_title} onChange={(e) => setForm({ ...form, role_title: e.target.value })} />
        <input className="rounded-xl border border-white/10 bg-black/20 px-3 py-2" placeholder="Required Skills" value={form.required_skills} onChange={(e) => setForm({ ...form, required_skills: e.target.value })} />
        <input className="rounded-xl border border-white/10 bg-black/20 px-3 py-2" placeholder="Work Type" value={form.work_type} onChange={(e) => setForm({ ...form, work_type: e.target.value })} />
        <input className="rounded-xl border border-white/10 bg-black/20 px-3 py-2" placeholder="Commitment Level" value={form.commitment_level} onChange={(e) => setForm({ ...form, commitment_level: e.target.value })} />
        <input className="rounded-xl border border-white/10 bg-black/20 px-3 py-2" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
      </div>
      <Button className="mt-4" onClick={save}>{editingId ? "Update Opportunity" : "Add Opportunity"}</Button>
      {message && <p className="mt-2 text-sm text-[var(--color-accent)]">{message}</p>}

      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-xl border border-white/10 p-4">
            <p className="font-semibold">{item.role_title}</p>
            <p className="text-sm text-[var(--color-muted)]">{item.required_skills}</p>
            <div className="mt-2 flex gap-2">
              <Button variant="ghost" onClick={() => edit(item)}>Edit</Button>
              <Button variant="danger" onClick={() => remove(item._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../../api/client";
import Button from "../../components/ui/Button";

export default function ManageOpportunities() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    role_title: "",
    required_skills: "",
    work_type: "",
    commitment_level: "",
    deadline: "",
  });
  const [message, setMessage] = useState("");

  const load = () => api.get("/api/opportunities/founder/mine").then((res) => setItems(res.data.opportunities || []));
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editingId) return;
    await api.patch(`/api/opportunities/${editingId}`, form);
    setEditingId(null);
    setMessage("Opportunity updated.");
    load();
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
      <p className="mt-1 text-sm text-[var(--muted)]">Edit or remove your posted roles.</p>

      {editingId && (
        <div className="mt-6 space-y-3 rounded-2xl bg-[var(--bg-soft)] p-4">
          <input className="input-field" placeholder="Role Title" value={form.role_title} onChange={(e) => setForm({ ...form, role_title: e.target.value })} />
          <input className="input-field" placeholder="Required Skills" value={form.required_skills} onChange={(e) => setForm({ ...form, required_skills: e.target.value })} />
          <input className="input-field" placeholder="Work Type" value={form.work_type} onChange={(e) => setForm({ ...form, work_type: e.target.value })} />
          <input className="input-field" placeholder="Commitment Level" value={form.commitment_level} onChange={(e) => setForm({ ...form, commitment_level: e.target.value })} />
          <input className="input-field" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
          <Button onClick={save}>Update Opportunity</Button>
        </div>
      )}

      {message && <p className="mt-3 text-sm text-[var(--accent)]">{message}</p>}

      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <div key={item._id} className="panel-row">
            <p className="font-semibold">{item.role_title}</p>
            <p className="text-sm text-[var(--muted)]">{item.required_skills}</p>
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

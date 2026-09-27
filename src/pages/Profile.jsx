import { useEffect, useState } from "react";
import api from "../api/client";
import Button from "../components/ui/Button";
import ImagePicker from "../components/ui/ImagePicker";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({ name: "", image: "", skills: "", bio: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name || "",
      image: user.image || "",
      skills: user.skills || "",
      bio: user.bio || "",
    });
  }, [user]);

  const save = async () => {
    setError("");
    try {
      await api.patch("/api/users/profile", form);
      await refreshUser();
      setMessage("Profile updated.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update profile.");
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Profile</h1>
      <div className="mt-6 space-y-3">
        <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input-field" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="Skills" />
        <textarea className="input-field" rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Bio" />
        <ImagePicker label="Profile image" value={form.image} onChange={(url) => setForm((prev) => ({ ...prev, image: url }))} onError={setError} />
        <Button onClick={save}>Save Profile</Button>
        {message && <p className="text-sm text-[var(--accent)]">{message}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { defaultAvatarUrl } from "../utils/defaultAvatar";
import { isValidPassword } from "../utils/validation";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "collaborator",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isValidPassword(form.password)) {
      setError("Password must be 6+ chars with upper and lower case.");
      return;
    }
    try {
      await register({
        ...form,
        image: defaultAvatarUrl(form.name),
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="glass-panel rounded-3xl p-8">
        <h1 className="font-display text-3xl font-bold">Create account</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Add a profile photo anytime from your dashboard.</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input className="input-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input-field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <select className="input-field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="founder">Founder</option>
            <option value="collaborator">Collaborator</option>
          </select>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full">Register</Button>
        </form>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Already have an account? <Link className="text-[var(--accent)]" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

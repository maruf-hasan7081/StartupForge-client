import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleEnabled, setGoogleEnabled] = useState(false);

  useEffect(() => {
    api.get("/api/config/public").then((res) => {
      setGoogleEnabled(Boolean(res.data.googleEnabled));
    }).catch(() => setGoogleEnabled(false));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate(location.state?.from?.pathname || "/dashboard");
    } catch (err) {
      const msg = err.message || "Login failed";
      if (msg.toLowerCase().includes("fetch")) {
        setError(
          "Cannot reach the API. Start the server (cd server && npm run dev) and refresh. Use one client tab on the port shown by Vite.",
        );
        return;
      }
      setError(
        msg.toLowerCase().includes("not found")
          ? "No account with this email. Register first, or use admin after npm run seed."
          : msg,
      );
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="glass-panel rounded-3xl p-8">
        <h1 className="font-display text-3xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Sign in to your StartupForge account</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full">Login</Button>
        </form>
        {googleEnabled && (
          <Button variant="ghost" className="mt-3 w-full" onClick={loginWithGoogle}>
            Continue with Google
          </Button>
        )}
        <p className="mt-4 text-sm text-[var(--muted)]">
          No account? <Link className="text-[var(--accent)]" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

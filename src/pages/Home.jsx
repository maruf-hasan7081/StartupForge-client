import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import api from "../api/client";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function AnimatedStat({ value, suffix = "" }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const numeric = parseInt(String(value).replace(/\D/g, ""), 10) || 0;
    const controls = animate(count, numeric, { duration: 1.2 });
    return controls.stop;
  }, [value, count]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(String(v)));
    return unsub;
  }, [rounded]);

  const prefix = String(value).match(/^\+/) ? "+" : "";
  const endSuffix = String(value).includes("%") ? "%" : suffix;
  return <>{prefix}{display}{endSuffix}</>;
}

export default function Home() {
  const [startups, setStartups] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/api/startups/featured"),
      api.get("/api/opportunities/featured"),
    ]).then(([s, o]) => {
      setStartups(s.data.startups || []);
      setOpportunities(o.data.opportunities || []);
    });
  }, []);

  return (
    <div className="pb-10">
      <section className="page-container grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-xs text-[var(--muted)]">
            <Sparkles size={14} className="text-[var(--accent-2)]" />
            Build teams. Launch faster.
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
            The modern platform for
            <span className="block bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
              startup collaboration
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[var(--muted)]">
            Founders publish ideas and recruit talent. Collaborators discover roles that match their skills and join high-impact teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/opportunities"><Button className="gap-2">Browse Opportunities <ArrowRight size={16} /></Button></Link>
            <Link to="/register"><Button variant="ghost">Create account</Button></Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel rounded-3xl p-8">
          <p className="text-sm text-[var(--muted)]">Join the community</p>
          <p className="mt-2 text-lg font-semibold">Start building your dream team today.</p>
        </motion.div>
      </section>

      <section className="page-container py-8">
        <h2 className="font-display text-2xl font-bold">Featured Startups</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {startups.map((startup) => (
            <Card key={startup._id}>
              <img src={startup.logo} alt="" className="h-14 w-14 rounded-2xl object-cover ring-2 ring-[var(--border)]" />
              <h3 className="mt-4 font-semibold">{startup.startup_name}</h3>
              <p className="text-sm text-[var(--muted)]">{startup.founder_name} · {startup.industry}</p>
              <p className="mt-3 text-sm">Team needed: {startup.team_size_needed}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-container py-8">
        <h2 className="font-display text-2xl font-bold">Featured Opportunities</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {opportunities.map((item) => (
            <Card key={item._id}>
              <h3 className="font-semibold">{item.role_title}</h3>
              <p className="text-sm text-[var(--muted)]">{item.startup_name}</p>
              <p className="mt-3 text-sm">{item.required_skills}</p>
              <p className="mt-2 text-xs text-[var(--muted)]">Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-container py-8">
        <h2 className="font-display text-2xl font-bold">Why Join StartupForge</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Curated Teams", "Connect with founders and builders aligned with your mission."],
            ["Faster Hiring", "Post roles, review applicants, and onboard in one workflow."],
            ["Skill Matching", "Discover opportunities ranked by your profile skills."],
          ].map(([title, text]) => (
            <Card key={title}>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <motion.section
        className="page-container py-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl font-bold">Startup Statistics</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["120", "Active Startups"],
            ["450", "Collaborators"],
            ["85%", "Match Success"],
            ["32", "Countries"],
          ].map(([value, label]) => (
            <div key={label} className="stat-card text-center">
              <p className="font-display text-3xl font-bold text-[var(--accent)]">
                <AnimatedStat value={value} />
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{label}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

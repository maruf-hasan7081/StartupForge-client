import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

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
    <div>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Build your startup team with confidence
          </h1>
          <p className="mt-4 text-[var(--color-muted)]">
            StartupForge connects visionary founders with developers, designers, and marketers ready to ship.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/opportunities"><Button>Browse Opportunities</Button></Link>
            <Link to="/register"><Button variant="ghost">Join Now</Button></Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a2a3f] to-[#0f1722] p-8"
        >
          <p className="text-sm text-[var(--color-muted)]">Live platform stats</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              ["120+", "Startups"],
              ["450+", "Collaborators"],
              ["85%", "Match Success"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold text-[var(--color-accent)]">{value}</p>
                <p className="text-xs text-[var(--color-muted)]">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="font-display text-2xl font-semibold">Featured Startups</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {startups.map((startup) => (
            <Card key={startup._id}>
              <img src={startup.logo} alt="" className="h-14 w-14 rounded-xl object-cover" />
              <h3 className="mt-3 font-semibold">{startup.startup_name}</h3>
              <p className="text-sm text-[var(--color-muted)]">{startup.founder_name}</p>
              <p className="text-sm text-[var(--color-muted)]">{startup.industry}</p>
              <p className="mt-2 text-sm">Team needed: {startup.team_size_needed}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="font-display text-2xl font-semibold">Featured Opportunities</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {opportunities.map((item) => (
            <Card key={item._id}>
              <h3 className="font-semibold">{item.role_title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{item.startup_name}</p>
              <p className="mt-2 text-sm">{item.required_skills}</p>
              <p className="mt-2 text-xs text-[var(--color-muted)]">
                Deadline: {new Date(item.deadline).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="font-display text-2xl font-semibold">Why Join StartupForge</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Curated Teams", "Find collaborators aligned with your mission and stage."],
            ["Fast Hiring", "Post opportunities and review applications in one place."],
            ["Founder Tools", "Manage startup profile, roles, and applicants easily."],
          ].map(([title, text]) => (
            <Card key={title}>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{text}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

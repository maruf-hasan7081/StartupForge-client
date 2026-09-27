import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

export default function BrowseStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/startups").then((res) => {
      setStartups(res.data.startups || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Browse Startups</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {startups.map((startup) => (
          <Link key={startup._id} to={`/startups/${startup._id}`}>
            <Card>
              <img src={startup.logo} alt="" className="h-16 w-16 rounded-xl object-cover" />
              <h2 className="mt-3 font-semibold">{startup.startup_name}</h2>
              <p className="text-sm text-[var(--color-muted)]">{startup.industry}</p>
              <p className="mt-2 line-clamp-3 text-sm text-[var(--color-muted)]">{startup.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

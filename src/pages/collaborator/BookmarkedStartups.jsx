import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/client";
import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";

export default function BookmarkedStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/bookmarks").then((res) => {
      setStartups(res.data.startups || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Bookmarked startups</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">Save startups you want to follow or join later.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {startups.length === 0 && (
          <p className="text-sm text-[var(--muted)]">No bookmarks yet. Browse startups and tap the bookmark icon.</p>
        )}
        {startups.map((startup) => (
          <Link key={startup._id} to={`/startups/${startup._id}`}>
            <Card>
              <h2 className="font-semibold">{startup.startup_name}</h2>
              <p className="text-sm text-[var(--muted)]">{startup.industry}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

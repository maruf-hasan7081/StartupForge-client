import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import BookmarkButton from "../components/ui/BookmarkButton";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import { useAuth } from "../contexts/AuthContext";

export default function BrowseStartups() {
  const { user } = useAuth();
  const [startups, setStartups] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = () => {
    if (!user) return;
    api.get("/api/bookmarks/ids").then((res) => setBookmarkIds(res.data.ids || []));
  };

  useEffect(() => {
    api.get("/api/startups").then((res) => {
      setStartups(res.data.startups || []);
      setLoading(false);
    });
    loadBookmarks();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold">Discover startups</h1>
      <p className="mt-2 text-[var(--muted)]">Explore teams building the next big thing.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {startups.map((startup) => (
          <Card key={startup._id}>
            <div className="flex items-start justify-between gap-2">
              <img src={startup.logo} alt="" className="h-16 w-16 rounded-2xl object-cover" />
              <BookmarkButton
                startupId={startup._id}
                bookmarked={bookmarkIds.includes(String(startup._id))}
                onToggle={loadBookmarks}
              />
            </div>
            <Link to={`/startups/${startup._id}`}>
              <h2 className="mt-4 font-semibold hover:text-[var(--accent)]">{startup.startup_name}</h2>
              <p className="text-sm text-[var(--muted)]">{startup.industry}</p>
              <p className="mt-3 line-clamp-3 text-sm text-[var(--muted)]">{startup.description}</p>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

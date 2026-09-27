import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import BookmarkButton from "../components/ui/BookmarkButton";
import Loader from "../components/ui/Loader";
import { useAuth } from "../contexts/AuthContext";

export default function StartupDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [startup, setStartup] = useState(null);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = () => {
    if (!user) return;
    api.get("/api/bookmarks/ids").then((res) => setBookmarkIds(res.data.ids || []));
  };

  useEffect(() => {
    api.get(`/api/startups/${id}`).then((res) => {
      setStartup(res.data.startup);
      setLoading(false);
    }).catch(() => setLoading(false));
    loadBookmarks();
  }, [id, user]);

  if (loading) return <Loader />;
  if (!startup) return <p className="p-8 text-center">Startup not found.</p>;

  return (
    <div className="page-container max-w-4xl">
      <div className="glass-panel rounded-3xl p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={startup.logo} alt="" className="h-20 w-20 rounded-2xl object-cover ring-2 ring-[var(--border)]" />
            <div>
              <h1 className="page-title">{startup.startup_name}</h1>
              <p className="text-[var(--muted)]">{startup.industry} · {startup.funding_stage}</p>
            </div>
          </div>
          <BookmarkButton
            startupId={String(startup._id)}
            bookmarked={bookmarkIds.includes(String(startup._id))}
            onToggle={loadBookmarks}
          />
        </div>
        <p className="mt-6 text-[var(--muted)]">{startup.description}</p>
        <p className="mt-4 text-sm">Founder: {startup.founder_name || startup.founder_email}</p>
      </div>
    </div>
  );
}

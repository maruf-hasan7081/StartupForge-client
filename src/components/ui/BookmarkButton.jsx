import { Bookmark } from "lucide-react";
import api from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function BookmarkButton({ startupId, bookmarked, onToggle }) {
  const { user } = useAuth();

  if (!user) return null;

  const toggle = async () => {
    if (bookmarked) {
      await api.delete(`/api/bookmarks/${startupId}`);
    } else {
      await api.post(`/api/bookmarks/${startupId}`);
    }
    onToggle?.();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`rounded-xl border border-[var(--border)] p-2 transition ${
        bookmarked ? "bg-[var(--accent)] text-white" : "bg-[var(--panel)] text-[var(--text)]"
      }`}
      aria-label="Bookmark startup"
    >
      <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
    </button>
  );
}

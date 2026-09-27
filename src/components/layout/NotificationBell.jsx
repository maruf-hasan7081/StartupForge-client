import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import api from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function NotificationBell() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const load = () => {
    if (!user) return;
    api.get("/api/notifications").then((res) => setItems(res.data.notifications || []));
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, [user]);

  if (!user) return null;

  const unread = items.filter((n) => !n.read).length;

  const markAll = async () => {
    await api.patch("/api/notifications/read-all");
    load();
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="relative rounded-xl border border-[var(--border)] bg-[var(--panel)] p-2 text-[var(--text)]"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold">Notifications</p>
            <button type="button" className="text-xs text-[var(--accent)]" onClick={markAll}>
              Mark all read
            </button>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {items.length === 0 && (
              <p className="text-xs text-[var(--muted)]">No notifications yet.</p>
            )}
            {items.map((n) => (
              <div
                key={n._id}
                className={`rounded-xl p-2 text-xs ${n.read ? "opacity-60" : "bg-[var(--bg-soft)]"}`}
              >
                {n.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

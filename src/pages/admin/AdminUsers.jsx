import { useEffect, useState } from "react";
import api from "../../api/client";
import Button from "../../components/ui/Button";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const load = () => api.get("/api/admin/users").then((res) => setUsers(res.data.users || []));
  useEffect(() => { load(); }, []);

  const block = async (id, blocked) => {
    await api.patch(`/api/admin/users/${id}/${blocked ? "block" : "unblock"}`);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Manage Users</h1>
      <div className="mt-6 space-y-3">
        {users.map((user) => (
          <div key={user._id} className="panel-row flex items-center justify-between">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-[var(--muted)]">{user.email} · {user.role}</p>
            </div>
            <Button variant="ghost" onClick={() => block(user._id, !user.isBlocked)}>
              {user.isBlocked ? "Unblock" : "Block"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

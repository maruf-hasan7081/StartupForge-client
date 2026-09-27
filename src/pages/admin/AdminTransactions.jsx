import { useEffect, useState } from "react";
import api from "../../api/client";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get("/api/admin/transactions").then((res) => setTransactions(res.data.transactions || []));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Transactions</h1>
      <div className="mt-6 space-y-3">
        {transactions.map((tx) => (
          <div key={tx._id} className="rounded-xl border border-white/10 p-4">
            <p className="font-semibold">{tx.user_email}</p>
            <p className="text-sm text-[var(--color-muted)]">${tx.amount} · {tx.payment_status}</p>
            <p className="text-xs text-[var(--color-muted)]">{new Date(tx.paid_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

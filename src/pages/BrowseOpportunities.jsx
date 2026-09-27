import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

export default function BrowseOpportunities() {
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("");
  const [industry, setIndustry] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ opportunities: [], pagination: { totalPages: 1 } });
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/api/opportunities", {
        params: {
          page,
          search,
          work_type: workType,
          industry,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, [page]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Browse Opportunities</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <input
          className="rounded-xl border border-white/10 bg-[var(--color-panel)] px-3 py-2"
          placeholder="Search role or skills"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="rounded-xl border border-white/10 bg-[var(--color-panel)] px-3 py-2" value={workType} onChange={(e) => setWorkType(e.target.value)}>
          <option value="">All work types</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>
        <select className="rounded-xl border border-white/10 bg-[var(--color-panel)] px-3 py-2" value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="">All industries</option>
          <option value="Fintech">Fintech</option>
          <option value="Climate">Climate</option>
          <option value="Health">Health</option>
        </select>
        <Button onClick={() => { setPage(1); load(); }}>Apply Filters</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {data.opportunities.map((item) => (
              <Card key={item._id}>
                <h2 className="font-semibold">{item.role_title}</h2>
                <p className="text-sm text-[var(--color-muted)]">{item.startup_name}</p>
                <p className="mt-2 text-sm">{item.required_skills}</p>
                <Link className="mt-4 text-sm text-[var(--color-accent)]" to={`/opportunities/${item._id}`}>
                  View details
                </Link>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
            <span className="text-sm">Page {page} / {data.pagination.totalPages}</span>
            <Button variant="ghost" disabled={page >= data.pagination.totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
}

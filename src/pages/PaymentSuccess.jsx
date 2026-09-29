import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { useAuth } from "../contexts/AuthContext";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setMessage("Missing payment session.");
      setLoading(false);
      return;
    }

    api
      .get("/api/payments/success", { params: { session_id: sessionId } })
      .then(async (res) => {
        setMessage(res.data.message);
        await refreshUser();
      })
      .catch((err) => setMessage(err.response?.data?.message || "Payment verification failed"))
      .finally(() => setLoading(false));
  }, [params, refreshUser]);

  if (loading) return <Loader label="Confirming payment..." />;

  return (
    <div className="page-container max-w-lg text-center">
      <div className="glass-panel rounded-3xl p-8">
        <h1 className="page-title">Payment Successful</h1>
        <p className="mt-3 text-[var(--muted)]">{message}</p>
        <Link to="/dashboard/founder" className="mt-6 inline-block">
          <Button>Go to Founder Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/client";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sessionId = params.get("session_id");
    api.get("/api/payments/success", { params: { session_id: sessionId } })
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage(err.response?.data?.message || "Payment verification failed"))
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) return <Loader label="Confirming payment..." />;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-bold">Payment Successful</h1>
      <p className="mt-3 text-[var(--color-muted)]">{message}</p>
      <Link to="/dashboard/founder" className="mt-6 inline-block">
        <Button>Go to Founder Dashboard</Button>
      </Link>
    </div>
  );
}

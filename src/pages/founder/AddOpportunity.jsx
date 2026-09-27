import OpportunityForm from "../../components/founder/OpportunityForm";

export default function AddOpportunity() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Add Opportunity</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">Post a new role for your startup team.</p>
      <div className="mt-6">
        <OpportunityForm />
      </div>
    </div>
  );
}

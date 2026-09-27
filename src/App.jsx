import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import BrowseStartups from "./pages/BrowseStartups";
import StartupDetails from "./pages/StartupDetails";
import BrowseOpportunities from "./pages/BrowseOpportunities";
import OpportunityDetails from "./pages/OpportunityDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import DashboardRedirect from "./pages/DashboardRedirect";
import PaymentSuccess from "./pages/PaymentSuccess";
import FounderOverview from "./pages/founder/FounderOverview";
import MyStartup from "./pages/founder/MyStartup";
import ManageOpportunities from "./pages/founder/ManageOpportunities";
import FounderApplications from "./pages/founder/FounderApplications";
import CollaboratorOverview from "./pages/collaborator/CollaboratorOverview";
import MyApplications from "./pages/collaborator/MyApplications";
import BookmarkedStartups from "./pages/collaborator/BookmarkedStartups";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminStartups from "./pages/admin/AdminStartups";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AddOpportunity from "./pages/founder/AddOpportunity";
import CompleteRole from "./pages/CompleteRole";
import RoleGuard from "./routes/RoleGuard";

const founderLinks = [
  { to: "/dashboard/founder", label: "Overview", end: true },
  { to: "/dashboard/founder/startup", label: "My Startup" },
  { to: "/dashboard/founder/add-opportunity", label: "Add Opportunity" },
  { to: "/dashboard/founder/opportunities", label: "Manage Opportunities" },
  { to: "/dashboard/founder/applications", label: "Applications" },
  { to: "/profile", label: "Profile" },
];

const collaboratorLinks = [
  { to: "/dashboard/collaborator", label: "Overview", end: true },
  { to: "/dashboard/collaborator/applications", label: "My Applications" },
  { to: "/dashboard/collaborator/bookmarks", label: "Bookmarks" },
  { to: "/profile", label: "Profile" },
];

const adminLinks = [
  { to: "/dashboard/admin", label: "Overview", end: true },
  { to: "/dashboard/admin/users", label: "Manage Users" },
  { to: "/dashboard/admin/startups", label: "Manage Startups" },
  { to: "/dashboard/admin/transactions", label: "Transactions" },
];

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoleGuard>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/startups" element={<BrowseStartups />} />
            <Route path="/startups/:id" element={<StartupDetails />} />
            <Route path="/opportunities" element={<BrowseOpportunities />} />
            <Route path="/opportunities/:id" element={<OpportunityDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/complete-role" element={<PrivateRoute><CompleteRole /></PrivateRoute>} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <div className="mx-auto max-w-3xl px-4 py-10">
                    <Profile />
                  </div>
                </PrivateRoute>
              }
            />
            <Route path="/dashboard" element={<PrivateRoute><DashboardRedirect /></PrivateRoute>} />

            <Route
              path="/dashboard/founder"
              element={
                <PrivateRoute roles={["founder"]}>
                  <DashboardLayout links={founderLinks} />
                </PrivateRoute>
              }
            >
              <Route index element={<FounderOverview />} />
              <Route path="startup" element={<MyStartup />} />
              <Route path="add-opportunity" element={<AddOpportunity />} />
              <Route path="opportunities" element={<ManageOpportunities />} />
              <Route path="applications" element={<FounderApplications />} />
            </Route>

            <Route
              path="/dashboard/collaborator"
              element={
                <PrivateRoute roles={["collaborator"]}>
                  <DashboardLayout links={collaboratorLinks} />
                </PrivateRoute>
              }
            >
              <Route index element={<CollaboratorOverview />} />
              <Route path="applications" element={<MyApplications />} />
              <Route path="bookmarks" element={<BookmarkedStartups />} />
            </Route>

            <Route
              path="/dashboard/admin"
              element={
                <PrivateRoute roles={["admin"]}>
                  <DashboardLayout links={adminLinks} />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="startups" element={<AdminStartups />} />
              <Route path="transactions" element={<AdminTransactions />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </RoleGuard>
      </BrowserRouter>
    </AuthProvider>
  );
}

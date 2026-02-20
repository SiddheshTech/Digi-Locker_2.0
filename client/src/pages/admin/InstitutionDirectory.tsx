import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { LayoutDashboard, Building2, Search, AlertTriangle, Settings, Activity, MapPin, CheckCircle2, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "National Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Institutions", path: "/admin/institutions", icon: <Building2 className="w-4 h-4" /> },
  { label: "On-Chain Explorer", path: "/admin/explorer", icon: <Search className="w-4 h-4" /> },
  { label: "Fraud Analytics", path: "/admin/fraud", icon: <AlertTriangle className="w-4 h-4" /> },
  { label: "Policy Controls", path: "/admin/policies", icon: <Settings className="w-4 h-4" /> },
  { label: "Governance Log", path: "/admin/governance", icon: <Activity className="w-4 h-4" /> },
];

const institutions = [
  { name: "IIT Delhi", location: "New Delhi", type: "IIT", status: "Compliant", credentials: "24,891", onboarded: "Jan 2025" },
  { name: "IIT Bombay", location: "Mumbai", type: "IIT", status: "Compliant", credentials: "22,456", onboarded: "Jan 2025" },
  { name: "Delhi University", location: "New Delhi", type: "Central University", status: "Under Review", credentials: "18,234", onboarded: "Mar 2025" },
  { name: "IIT Madras", location: "Chennai", type: "IIT", status: "Compliant", credentials: "15,789", onboarded: "Feb 2025" },
  { name: "BITS Pilani", location: "Pilani, Rajasthan", type: "Deemed", status: "Compliant", credentials: "12,345", onboarded: "Apr 2025" },
  { name: "Anna University", location: "Chennai", type: "State University", status: "Onboarding", credentials: "0", onboarded: "Pending" },
];

const InstitutionDirectory = () => {
  const [search, setSearch] = useState("");
  const filtered = institutions.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout role="admin" roleLabel="Admin / Auditor" navItems={navItems}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Institution Directory</h2>
            <p className="text-sm text-muted-foreground mt-1">{institutions.length} institutions registered</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search institutions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((inst) => (
            <div key={inst.name} className="dashboard-card hover:border-accent/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <span className={
                  inst.status === "Compliant" ? "badge-verified" :
                  inst.status === "Under Review" ? "badge-pending" :
                  "px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground"
                }>
                  {inst.status === "Compliant" && <CheckCircle2 className="w-3 h-3" />}
                  {inst.status === "Under Review" && <Clock className="w-3 h-3" />}
                  {inst.status}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">{inst.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{inst.location}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex justify-between text-xs text-muted-foreground">
                <span>Type: {inst.type}</span>
                <span>{inst.credentials} creds</span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Onboarded: {inst.onboarded}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstitutionDirectory;

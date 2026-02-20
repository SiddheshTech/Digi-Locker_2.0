import DashboardLayout from "@/components/layout/DashboardLayout";
import { LayoutDashboard, Building2, Search, AlertTriangle, Settings, Activity, ExternalLink } from "lucide-react";
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

const events = [
  { type: "CredentialIssued", issuer: "IIT Delhi", tx: "0x7f3a8b2c...e91b", block: "19,847,293", time: "Feb 19, 2026 — 2:34 PM" },
  { type: "CredentialIssued", issuer: "IIT Bombay", tx: "0x8b2c1d3e...f43d", block: "19,847,291", time: "Feb 19, 2026 — 2:30 PM" },
  { type: "CredentialRevoked", issuer: "Delhi University", tx: "0x1a5e6f7a...b72f", block: "19,847,280", time: "Feb 19, 2026 — 1:45 PM" },
  { type: "MerkleRootAnchored", issuer: "BITS Pilani", tx: "0x9d4f5e6a...a18c", block: "19,847,250", time: "Feb 19, 2026 — 12:00 PM" },
  { type: "CredentialIssued", issuer: "IIT Madras", tx: "0x3c6b7d8e...d95e", block: "19,847,220", time: "Feb 19, 2026 — 10:30 AM" },
  { type: "KeyRotated", issuer: "Anna University", tx: "0x5e7a8b9c...c12d", block: "19,847,200", time: "Feb 19, 2026 — 9:00 AM" },
];

const OnChainExplorer = () => {
  return (
    <DashboardLayout role="admin" roleLabel="Admin / Auditor" navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">On-Chain Explorer</h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time view of credential events on the blockchain.</p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by tx hash, issuer, or event type..." className="pl-9" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issuer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tx Hash</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Block</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timestamp</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Link</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        event.type === "CredentialRevoked" ? "bg-destructive/10 text-destructive" :
                        event.type === "MerkleRootAnchored" ? "bg-accent/10 text-accent" :
                        event.type === "KeyRotated" ? "bg-yellow-500/10 text-yellow-600" :
                        "bg-accent/10 text-accent"
                      }`}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{event.issuer}</td>
                    <td className="px-4 py-3"><code className="text-xs text-accent font-mono">{event.tx}</code></td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{event.block}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{event.time}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="w-3.5 h-3.5" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OnChainExplorer;

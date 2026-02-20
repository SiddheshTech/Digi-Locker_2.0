import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle, Upload, Search, Copy, Share2, XCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Dashboard", path: "/issuer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Issue Credential", path: "/issuer/issue", icon: <FilePlus className="w-4 h-4" /> },
  { label: "Issued Records", path: "/issuer/records", icon: <FileText className="w-4 h-4" /> },
  { label: "Key Management", path: "/issuer/keys", icon: <KeyRound className="w-4 h-4" /> },
  { label: "Batch Issuance", path: "/issuer/batch", icon: <Upload className="w-4 h-4" /> },
  { label: "Fraud Alerts", path: "/issuer/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
];

const records = [
  { id: "IITD/2026/BTCS/001", name: "Rahul Sharma", degree: "B.Tech CS", year: "2026", status: "active", tx: "0x7f3a...e91b", date: "2026-01-15" },
  { id: "IITD/2026/BTCS/002", name: "Priya Patel", degree: "B.Tech CS", year: "2026", status: "active", tx: "0x8b2c...f43d", date: "2026-01-15" },
  { id: "IITD/2025/MSC/108", name: "Amit Kumar", degree: "M.Sc Physics", year: "2025", status: "revoked", tx: "0x1a5e...b72f", date: "2025-06-20" },
  { id: "IITD/2026/BCOM/044", name: "Neha Singh", degree: "B.Com", year: "2026", status: "active", tx: "0x9d4f...a18c", date: "2026-02-01" },
  { id: "IITD/2025/PHD/012", name: "Dr. Vikram Rao", degree: "Ph.D Mathematics", year: "2025", status: "active", tx: "0x3c6b...d95e", date: "2025-12-10" },
  { id: "IITD/2024/BTCS/199", name: "Sanya Gupta", degree: "B.Tech CS", year: "2024", status: "active", tx: "0x5e7a...c12d", date: "2024-07-08" },
];

const IssuerRecords = () => {
  const [search, setSearch] = useState("");

  const filtered = records.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="issuer" roleLabel="Institution / Issuer" navItems={navItems}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Issued Records</h2>
            <p className="text-sm text-muted-foreground mt-1">{records.length} credentials issued</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or serial..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Serial</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Degree</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tx Hash</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((record) => (
                  <tr key={record.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-foreground">{record.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{record.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{record.degree}</td>
                    <td className="px-4 py-3">
                      <span className={record.status === "active" ? "badge-verified" : "badge-revoked"}>
                        {record.status === "active" ? "Active" : "Revoked"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs text-accent font-mono">{record.tx}</code>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{record.date}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Copy className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Share2 className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="w-3.5 h-3.5" /></Button>
                        {record.status === "active" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <XCircle className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
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

export default IssuerRecords;

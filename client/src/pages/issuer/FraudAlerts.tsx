import DashboardLayout from "@/components/layout/DashboardLayout";
import { LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle, Upload, Eye, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/issuer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Issue Credential", path: "/issuer/issue", icon: <FilePlus className="w-4 h-4" /> },
  { label: "Issued Records", path: "/issuer/records", icon: <FileText className="w-4 h-4" /> },
  { label: "Key Management", path: "/issuer/keys", icon: <KeyRound className="w-4 h-4" /> },
  { label: "Batch Issuance", path: "/issuer/batch", icon: <Upload className="w-4 h-4" /> },
  { label: "Fraud Alerts", path: "/issuer/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
];

const alerts = [
  { severity: "high", title: "Duplicate hash detected", desc: "Document hash matches an already-issued credential from a different student.", confidence: 94, action: "Review & Revoke", time: "2 hours ago" },
  { severity: "medium", title: "Unusual issuance pattern", desc: "47 credentials issued in 3 minutes — deviates from normal batch timing.", confidence: 78, action: "Investigate", time: "1 day ago" },
  { severity: "low", title: "Metadata mismatch", desc: "Student name on document doesn't match enrollment records.", confidence: 62, action: "Manual Review", time: "3 days ago" },
];

const FraudAlerts = () => {
  return (
    <DashboardLayout role="issuer" roleLabel="Institution / Issuer" navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Fraud & Anomaly Alerts</h2>
          <p className="text-sm text-muted-foreground mt-1">AI-powered detection of suspicious issuance patterns.</p>
        </div>

        <div className="space-y-4">
          {alerts.map((alert, i) => (
            <div key={i} className={`dashboard-card border-l-4 ${
              alert.severity === "high" ? "border-l-destructive" :
              alert.severity === "medium" ? "border-l-yellow-500" :
              "border-l-accent"
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alert.severity === "high" ? "text-destructive" :
                    alert.severity === "medium" ? "text-yellow-500" :
                    "text-accent"
                  }`} />
                  <div>
                    <h3 className="font-semibold text-foreground">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{alert.desc}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-muted-foreground">Confidence: <strong className="text-foreground">{alert.confidence}%</strong></span>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1"><Eye className="w-3.5 h-3.5" /> {alert.action}</Button>
                  <Button variant="ghost" size="sm"><XCircle className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FraudAlerts;

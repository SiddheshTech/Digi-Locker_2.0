import DashboardLayout from "@/components/layout/DashboardLayout";
import { LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle, Upload, Eye, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const navItems = [
  { label: "Dashboard", path: "/issuer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Issue Credential", path: "/issuer/issue", icon: <FilePlus className="w-4 h-4" /> },
  { label: "Issued Records", path: "/issuer/records", icon: <FileText className="w-4 h-4" /> },
  { label: "Key Management", path: "/issuer/keys", icon: <KeyRound className="w-4 h-4" /> },
  { label: "Batch Issuance", path: "/issuer/batch", icon: <Upload className="w-4 h-4" /> },
  { label: "Fraud Alerts", path: "/issuer/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
];

const FraudAlerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get(`${API}/api/alerts?resolved=false`);
        setAlerts(res.data.alerts || []);
      } catch (err) {
        console.error("Failed to fetch alerts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const handleResolve = async (index: number) => {
    try {
      await axios.post(`${API}/api/alerts/${index}/resolve`, { resolvedBy: 'Issuer Portal' });
      setAlerts(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Resolve failed", err);
    }
  };

  return (
    <DashboardLayout role="issuer" roleLabel="Institution / Issuer" navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Fraud & Anomaly Alerts</h2>
          <p className="text-sm text-muted-foreground mt-1">AI-powered detection of suspicious issuance patterns.</p>
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          )}
          {!loading && alerts.length === 0 && (
            <div className="p-12 text-center text-muted-foreground bg-card rounded-xl border border-border">
              No security alerts detected. System integrity verified.
            </div>
          )}
          {alerts.map((alert, i) => (
            <div key={i} className={`dashboard-card border-l-4 ${alert.severity === "HIGH" || alert.severity === "CRITICAL" ? "border-l-destructive" :
              alert.severity === "MEDIUM" ? "border-l-yellow-500" :
                "border-l-accent"
              }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${alert.severity === "HIGH" || alert.severity === "CRITICAL" ? "text-destructive" :
                    alert.severity === "MEDIUM" ? "text-yellow-500" :
                      "text-accent"
                    }`} />
                  <div>
                    <h3 className="font-semibold text-foreground uppercase text-xs tracking-wider">{alert.type || "System Alert"}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-muted-foreground">Risk: <strong className="text-foreground">{alert.severity || "MEDIUM"}</strong></span>
                      <span className="text-xs text-muted-foreground">{alert.timestamp ? new Date(alert.timestamp).toLocaleString() : "Recently"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => window.alert(alert.message)}><Eye className="w-3.5 h-3.5" /> View</Button>
                  <Button variant="ghost" size="sm" title="Resolve" onClick={() => handleResolve(i)}><XCircle className="w-3.5 h-3.5" /></Button>
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

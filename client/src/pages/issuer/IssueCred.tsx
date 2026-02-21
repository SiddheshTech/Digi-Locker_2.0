/**
 * IssueCred.tsx — Real MetaMask-powered credential issuance
 * Flow: Upload file → SHA-256 hash → Fill metadata → MetaMask sign → POST to backend
 */
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle,
  Upload, Hash, FileUp, CheckCircle2, Eye, Loader2, Wallet, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWallet } from "@/context/WalletContext";
import { ethers } from "ethers";
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

// Real SHA-256 hash using Web Crypto API
async function sha256File(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

interface FormState {
  studentName: string;
  rollNo: string;
  degree: string;
  year: string;
  serialNo: string;
  notes: string;
}

type IssueStep = "idle" | "hashing" | "ready" | "prepare" | "sign" | "finalize" | "done" | "error";

const IssueCred = () => {
  const { isConnected, address, connect, getSigner } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState("");
  const [form, setForm] = useState<FormState>({ studentName: "", rollNo: "", degree: "", year: "", serialNo: "", notes: "" });
  const [step, setStep] = useState<IssueStep>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ txHash: string; payloadHash: string; credentialId: string } | null>(null);
  const [payload, setPayload] = useState<Record<string, unknown> | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setStep("hashing");
    setFileHash("");
    try {
      const hash = await sha256File(f);
      setFileHash(hash);
      setStep("ready");
    } catch {
      setError("Failed to hash file.");
      setStep("error");
    }
  };

  const handleField = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const canIssue = isConnected && fileHash && form.studentName && form.rollNo && form.degree && form.year;

  const handleIssue = async () => {
    if (!canIssue) return;
    setError("");
    try {
      // Step 1 — Prepare (server builds canonical payload + hash)
      setStep("prepare");
      const prepRes = await axios.post(`${API}/api/issue/prepare`, {
        studentName: form.studentName,
        rollNo: form.rollNo,
        degree: form.degree,
        year: form.year,
        serialNo: form.serialNo,
        fileHash,
      }, {
        headers: {
          "x-issuer-address": address || "0xMOCK_ISSUER"
        }
      });
      const { payloadHash, canonical, payload: serverPayload } = prepRes.data;

      let currentPayload = serverPayload;
      if (!currentPayload && canonical && canonical !== "undefined") {
        try {
          currentPayload = JSON.parse(canonical);
        } catch (e) {
          console.error("Failed to parse canonical payload:", e);
        }
      }

      if (currentPayload) {
        setPayload(currentPayload);
      } else {
        console.warn("No payload or canonical data received from server");
      }

      // Step 2 — MetaMask sign
      setStep("sign");
      const signer = await getSigner();
      if (!signer) throw new Error("No signer available");
      const signature = await signer.signMessage(ethers.getBytes(payloadHash));

      console.log("Finalizing issuance with:", { payload: currentPayload, payloadHash, signature, issuerId: address });

      // Step 3 — Finalize (server anchors on-chain)
      setStep("finalize");
      const finalRes = await axios.post(`${API}/api/issue/finalize`, {
        payload: currentPayload, // Send payload to server
        payloadHash,
        signature,
        issuerId: address,
      });

      setResult({ txHash: finalRes.data.txHash, payloadHash, credentialId: finalRes.data.credentialId });
      setStep("done");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } }; message?: string })?.response?.data?.error || (err as Error).message || "Issuance failed";
      setError(msg);
      setStep("error");
    }
  };

  const stepLabel: Record<IssueStep, string> = {
    idle: "Issue Credential (MetaMask)",
    hashing: "Hashing file...",
    ready: "Issue Credential (MetaMask)",
    prepare: "Preparing payload...",
    sign: "Sign in MetaMask...",
    finalize: "Anchoring on blockchain...",
    done: "Issued Successfully!",
    error: "Retry",
  };

  return (
    <DashboardLayout role="issuer" roleLabel="Institution / Issuer" navItems={navItems}>
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Issue New Credential</h2>
          <p className="text-sm text-muted-foreground mt-1">Upload a document and anchor its hash on the blockchain with your MetaMask wallet.</p>
        </div>

        {/* Wallet Gate */}
        {!isConnected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-semibold text-foreground">Connect MetaMask to issue credentials</p>
                <p className="text-xs text-muted-foreground">Your wallet signs each issuance — cryptographic proof of identity</p>
              </div>
            </div>
            <Button size="sm" className="accent-gradient text-accent-foreground border-0 shrink-0" onClick={connect}>Connect Wallet</Button>
          </motion.div>
        )}

        {/* File Upload */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="dashboard-card">
          <h3 className="font-display font-semibold text-foreground mb-4">1. Upload Document</h3>
          <div
            className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-accent/40 transition-colors cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            {step === "hashing"
              ? <Loader2 className="w-10 h-10 text-accent mx-auto mb-3 animate-spin" />
              : <FileUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            }
            <p className="text-sm text-foreground font-medium">{file ? file.name : "Drag & drop or click to upload"}</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or image (max 10 MB)</p>
            <input ref={fileRef} id="file-input" type="file" className="hidden" onChange={handleFile} />
          </div>
          {fileHash && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">SHA-256 Hash (real)</span>
                <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
              </div>
              <code className="text-xs text-accent font-mono break-all">{fileHash}</code>
            </div>
          )}
        </motion.div>

        {/* Metadata */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="dashboard-card">
          <h3 className="font-display font-semibold text-foreground mb-4">2. Credential Metadata</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Student Name</Label><Input placeholder="Rahul Sharma" className="mt-1.5" value={form.studentName} onChange={handleField("studentName")} /></div>
            <div><Label>Roll Number</Label><Input placeholder="2023BTCS001" className="mt-1.5" value={form.rollNo} onChange={handleField("rollNo")} /></div>
            <div><Label>Degree / Certificate</Label><Input placeholder="B.Tech Computer Science" className="mt-1.5" value={form.degree} onChange={handleField("degree")} /></div>
            <div><Label>Year of Completion</Label><Input placeholder="2026" className="mt-1.5" value={form.year} onChange={handleField("year")} /></div>
            <div><Label>Serial Number</Label><Input placeholder="IITD/2026/BTCS/001" className="mt-1.5" value={form.serialNo} onChange={handleField("serialNo")} /></div>
            <div><Label>Issuer (MetaMask)</Label><Input readOnly value={address || "Not connected"} className="mt-1.5 font-mono text-xs bg-muted" /></div>
          </div>
          <div className="mt-4">
            <Label>Additional Notes</Label>
            <Textarea placeholder="Any additional remarks..." className="mt-1.5" rows={2} value={form.notes} onChange={handleField("notes")} />
          </div>
        </motion.div>

        {/* On-chain info banner */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="p-4 rounded-xl bg-accent/5 border border-accent/20">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">What will be recorded on-chain:</p>
              <p className="text-xs text-muted-foreground mt-1">
                Issuer Wallet Address · Document SHA-256 Hash · Timestamp · Revocation Flag.{" "}
                <strong>No personal information (PII) is stored on-chain.</strong>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            ⚠ {error}
          </div>
        )}

        {/* Success Result */}
        {step === "done" && result && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="dashboard-card border-green-500/20 bg-green-500/5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <h3 className="font-display font-semibold text-foreground">Credential Issued Successfully!</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Credential ID</span><code className="text-xs font-mono text-accent">{result.credentialId}</code></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payload Hash</span><code className="text-xs font-mono text-accent truncate max-w-[200px]">{result.payloadHash}</code></div>
              <div className="flex justify-between"><span className="text-muted-foreground">TX Hash</span><code className="text-xs font-mono text-accent truncate max-w-[200px]">{result.txHash}</code></div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <Button variant="outline" className="gap-2" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-4 h-4" /> {showPreview ? "Hide" : "Preview"} Payload
          </Button>
          <Button
            className="accent-gradient text-accent-foreground border-0 hover:opacity-90 gap-2"
            disabled={!canIssue || ["hashing", "prepare", "sign", "finalize"].includes(step)}
            onClick={handleIssue}
          >
            {["prepare", "sign", "finalize"].includes(step) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
            {stepLabel[step]}
          </Button>
        </div>

        {/* Payload Preview */}
        {showPreview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-card">
            <h3 className="font-display font-semibold text-foreground mb-3">On-Chain Payload Preview</h3>
            <pre className="bg-muted rounded-lg p-4 text-xs font-mono text-foreground overflow-x-auto">
              {JSON.stringify(payload || {
                issuerId: address || "0x… (connect wallet)",
                documentHash: fileHash || "pending…",
                timestamp: new Date().toISOString(),
                revoked: false,
                credentialType: "DEGREE_CERTIFICATE",
                version: "2.0",
              }, null, 2)}
            </pre>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IssueCred;

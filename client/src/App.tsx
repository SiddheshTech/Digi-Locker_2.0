import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Issuer pages
import IssuerDashboard from "./pages/issuer/IssuerDashboard";
import IssueCred from "./pages/issuer/IssueCred";
import IssuerRecords from "./pages/issuer/IssuerRecords";
import KeyManagement from "./pages/issuer/KeyManagement";
import BatchIssuance from "./pages/issuer/BatchIssuance";
import FraudAlerts from "./pages/issuer/FraudAlerts";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCredentials from "./pages/student/StudentCredentials";
import ConsentLog from "./pages/student/ConsentLog";
import SkillChain from "./pages/student/SkillChain";

// Verifier pages
import VerifyPage from "./pages/verifier/VerifyPage";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import InstitutionDirectory from "./pages/admin/InstitutionDirectory";
import OnChainExplorer from "./pages/admin/OnChainExplorer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify" element={<VerifyPage />} />

          {/* Issuer routes */}
          <Route path="/issuer/dashboard" element={<IssuerDashboard />} />
          <Route path="/issuer/issue" element={<IssueCred />} />
          <Route path="/issuer/records" element={<IssuerRecords />} />
          <Route path="/issuer/keys" element={<KeyManagement />} />
          <Route path="/issuer/batch" element={<BatchIssuance />} />
          <Route path="/issuer/alerts" element={<FraudAlerts />} />

          {/* Student routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/credentials" element={<StudentCredentials />} />
          <Route path="/student/consents" element={<ConsentLog />} />
          <Route path="/student/skills" element={<SkillChain />} />
          <Route path="/student/share" element={<StudentCredentials />} />
          <Route path="/student/analytics" element={<StudentDashboard />} />

          {/* Verifier routes */}
          <Route path="/verifier/verify" element={<VerifyPage />} />
          <Route path="/verifier/saved" element={<VerifyPage />} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/institutions" element={<InstitutionDirectory />} />
          <Route path="/admin/explorer" element={<OnChainExplorer />} />
          <Route path="/admin/fraud" element={<AdminDashboard />} />
          <Route path="/admin/policies" element={<AdminDashboard />} />
          <Route path="/admin/governance" element={<AdminDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

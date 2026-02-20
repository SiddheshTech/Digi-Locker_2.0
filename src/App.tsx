import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Security from './pages/Security';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

// Solutions Subpages
import ForUniversities from './pages/solutions/ForUniversities';
import ForStudents from './pages/solutions/ForStudents';
import ForEmployers from './pages/solutions/ForEmployers';
import ForGovernment from './pages/solutions/ForGovernment';

// Features Subpages
import CredentialIssuance from './pages/features/CredentialIssuance';
import CredentialVerification from './pages/features/CredentialVerification';
import DocumentStorage from './pages/features/DocumentStorage';
import ApiIntegration from './pages/features/ApiIntegration';

// Resources
import Documentation from './pages/resources/Documentation';
import Blog from './pages/resources/Blog';
import CaseStudies from './pages/resources/CaseStudies';
import Faq from './pages/resources/Faq';

// Special Pages
import DashboardPreview from './pages/DashboardPreview';
import VerificationPortal from './pages/VerificationPortal';
import InstitutionPortal from './pages/InstitutionPortal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Issuer Components
import IssuerLayout from './layouts/IssuerLayout';
import Dashboard from './pages/issuer/Dashboard';
import IssueCredential from './pages/issuer/IssueCredential';
import RecordsList from './pages/issuer/RecordsList';
import BatchIssue from './pages/issuer/BatchIssue';
import KeyManagement from './pages/issuer/KeyManagement';
import Templates from './pages/issuer/Templates';
import Alerts from './pages/issuer/Alerts';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/animations/PageTransition';
import FloatingParticles from './components/animations/FloatingParticles';

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <FloatingParticles />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
          <Route path="/features" element={<PageTransition><Features /></PageTransition>} />
          <Route path="/features/credential-issuance" element={<PageTransition><CredentialIssuance /></PageTransition>} />
          <Route path="/features/credential-verification" element={<PageTransition><CredentialVerification /></PageTransition>} />
          <Route path="/features/document-storage" element={<PageTransition><DocumentStorage /></PageTransition>} />
          <Route path="/features/api-integration" element={<PageTransition><ApiIntegration /></PageTransition>} />
          <Route path="/solutions" element={<PageTransition><Solutions /></PageTransition>} />
          <Route path="/solutions/universities" element={<PageTransition><ForUniversities /></PageTransition>} />
          <Route path="/solutions/students" element={<PageTransition><ForStudents /></PageTransition>} />
          <Route path="/solutions/employers" element={<PageTransition><ForEmployers /></PageTransition>} />
          <Route path="/solutions/government" element={<PageTransition><ForGovernment /></PageTransition>} />
          <Route path="/security" element={<PageTransition><Security /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/resources/documentation" element={<PageTransition><Documentation /></PageTransition>} />
          <Route path="/resources/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/resources/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
          <Route path="/resources/faq" element={<PageTransition><Faq /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><DashboardPreview /></PageTransition>} />
          <Route path="/verify" element={<PageTransition><VerificationPortal /></PageTransition>} />
          <Route path="/institution-portal" element={<PageTransition><InstitutionPortal /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />

          {/* Issuer Routes */}
          <Route path="/issuer" element={<IssuerLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="issue" element={<IssueCredential />} />
            <Route path="records" element={<RecordsList />} />
            <Route path="batch" element={<BatchIssue />} />
            <Route path="keys" element={<KeyManagement />} />
            <Route path="templates" element={<Templates />} />
            <Route path="alerts" element={<Alerts />} />
          </Route>
        </Routes>
      </AnimatePresence >
      <Footer />
    </>
  );
}

export default App;

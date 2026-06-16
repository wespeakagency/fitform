import React, { useEffect, useState } from 'react';
import { HashRouter as Router, useLocation } from 'react-router-dom';
import { Layout } from '@/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { InstructorsPage } from '@/pages/InstructorsPage';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { trackTikTokPageView } from '@/lib/tiktokPixel';

// Keep-alive routing: both pages stay mounted across navigations and only
// their visibility flips. This preserves the BSport widgets' DOM and internal
// state when leaving and returning to '/', avoiding the multi-second
// re-bootstrap that <Routes> caused by unmounting HomePage on every change.
const PageSwitcher: React.FC = () => {
  const { pathname } = useLocation();
  const isInstructors = pathname === '/instructors';

  return (
    <>
      <div hidden={isInstructors}>
        <HomePage />
      </div>
      <div hidden={!isInstructors}>
        <InstructorsPage />
      </div>
    </>
  );
};

const TikTokPageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackTikTokPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
};

const App: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TikTokPageTracker />
        <Layout
          isPrivacyOpen={isPrivacyOpen}
          setIsPrivacyOpen={setIsPrivacyOpen}
          isTermsOpen={isTermsOpen}
          setIsTermsOpen={setIsTermsOpen}
        >
          <PageSwitcher />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;

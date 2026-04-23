import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { InstructorsPage } from '@/pages/InstructorsPage';
import { ThemeProvider } from '@/contexts/ThemeContext';

const App: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Layout
          isPrivacyOpen={isPrivacyOpen}
          setIsPrivacyOpen={setIsPrivacyOpen}
          isTermsOpen={isTermsOpen}
          setIsTermsOpen={setIsTermsOpen}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/instructors" element={<InstructorsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { InstructorsPage } from '@/pages/InstructorsPage';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <Layout 
        isDark={isDark} 
        toggleTheme={toggleTheme}
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
  );
};

export default App;
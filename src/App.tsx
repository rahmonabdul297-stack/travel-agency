import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import ServiceDetail from '@/pages/ServiceDetail';
import NotFound from '@/pages/NotFound';
import Admin from '@/pages/Admin';
import { fetchSiteSettings } from '@/lib/data';
import type { SiteSettings } from '@/lib/supabase';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.4,
  ease: 'easeOut',
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();
  const { theme } = useTheme();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetchSiteSettings().then(setSettings).catch(console.error);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-light'}`}>
      <Navbar settings={settings} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={<PageWrapper><Home settings={settings} /></PageWrapper>}
            />
            <Route
              path="/about"
              element={<PageWrapper><About settings={settings} /></PageWrapper>}
            />
            <Route
              path="/contact"
              element={<PageWrapper><Contact settings={settings} /></PageWrapper>}
            />
            <Route
              path="/services/:slug"
              element={<PageWrapper><ServiceDetail /></PageWrapper>}
            />
            <Route
              path="/admin"
              element={<PageWrapper><Admin /></PageWrapper>}
            />
            <Route
              path="*"
              element={<PageWrapper><NotFound /></PageWrapper>}
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

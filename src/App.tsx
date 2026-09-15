import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Services from "@/pages/ServiceDetail"; // Uses static Services component
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";
import { fetchSiteSettings } from "@/lib/data";
import type { SiteSettings } from "@/lib/supabase";
import { FaWhatsapp } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeOut",
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
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-surface-dark" : "bg-surface-light"
      }`}
    >
      <ToastContainer
        theme={theme === "dark" ? "dark" : "light"}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home settings={settings} />
                </PageWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <About settings={settings} />
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Contact settings={settings} />
                </PageWrapper>
              }
            />
            
            {/* Catch both /services and /services/:slug */}
            <Route
              path="/services"
              element={
                <PageWrapper>
                  <Services />
                </PageWrapper>
              }
            />
            <Route
              path="/services/:slug"
              element={
                <PageWrapper>
                  <Services />
                </PageWrapper>
              }
            />

            <Route
              path="/admin"
              element={
                <PageWrapper>
                  <Admin />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <NotFound />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Always-visible Floating WhatsApp Button */}
      <div className="flex flex-col items-center gap-1 fixed bottom-[10%] right-6 z-50">
        <MdKeyboardDoubleArrowUp
          className="text-yellow-500 animate-bounce"
          size={24}
        />
        <a
          href="https://wa.me/93789785320"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110 border border-yellow-600 bg-green-600"
          aria-label="Contact us on WhatsApp p-1"
        >
          <FaWhatsapp className="h-7 w-7 animate-pulse" />
        </a>
      </div>

      <Footer />
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
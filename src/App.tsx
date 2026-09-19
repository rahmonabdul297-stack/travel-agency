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
import { FaWhatsapp } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

// Splash Screen Component
function SplashScreen() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none ${
        theme === "dark" ? "bg-surface-dark" : "bg-surface-light"
      }`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-brand-gradient/10 blur-3xl rounded-full scale-150 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative mb-6"
        >
          {/* Pulsing glow around logo */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-4 rounded-3xl bg-brand-gradient/20 blur-md"
          />

          <img
            src={theme === "dark" ? "/images/logo2.png" : "/images/logo.png"}
            alt="Excellent Travel Agency Logo"
            className="w-28 h-28 sm:w-36 sm:h-36 object-contain relative z-10 drop-shadow-xl"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-2xl sm:text-3xl font-bold brand-text-gradient mb-2 tracking-wide"
        >
          Excellent Travel Agency
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`text-xs sm:text-sm font-medium tracking-wider uppercase ${
            theme === "dark"
              ? "text-ink-dark-secondary"
              : "text-ink-light-secondary"
          }`}
        >
          A Reliable Way Towards a Brighter Future
        </motion.p>

        {/* Loading Progress Bar - Smoothly fills over 9.2 seconds (10s total duration) */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "160px", opacity: 1 }}
          transition={{ delay: 0.4, duration: 9.2, ease: "easeInOut" }}
          className="h-1 bg-brand-gradient rounded-full mt-8 shadow-brand-glow"
        />
      </div>
    </motion.div>
  );
}

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

  // Check sessionStorage to see if the splash screen has already been shown during this session
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("hasSeenSplash");
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        // Save flag in sessionStorage so it doesn't show again on reload/navigation
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 10000); // 10000ms = 10 seconds

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash-screen" />}
      </AnimatePresence>

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
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path="/about"
                element={
                  <PageWrapper>
                    <About />
                  </PageWrapper>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageWrapper>
                    <Contact />
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
            href="https://wa.me/+93789785320"
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
    </>
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
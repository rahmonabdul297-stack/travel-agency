import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSun,
  FaMoon,
  FaWhatsapp,
  FaPhone,
  FaArrowRight,
  HiMenuAlt3,
  HiX,
  FaPlane,
} from "@/lib/icons";
import { useTheme } from "@/context/ThemeContext";
import type { SiteSettings } from "@/lib/supabase";
import { Logo } from "./Logo";

type NavbarProps = {
  settings: SiteSettings | null;
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ settings }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? theme === "dark"
              ? "bg-surface-dark/90 backdrop-blur-xl shadow-card-dark border-b border-border-dark"
              : "bg-white/90 backdrop-blur-xl shadow-card-light border-b border-border-light"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
           <Logo/>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 font-medium text-sm transition-colors duration-300 ${
                      isActive
                        ? "text-brand-red-orange"
                        : theme === "dark"
                          ? "text-ink-dark-secondary hover:text-ink-dark-primary"
                          : "text-ink-light-secondary hover:text-ink-light-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-gradient"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <NavLink
                to="/services/flight-tickets"
                className={({ isActive }) =>
                  `relative px-4 py-2 font-medium text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-brand-red-orange"
                      : theme === "dark"
                        ? "text-ink-dark-secondary hover:text-ink-dark-primary"
                        : "text-ink-light-secondary hover:text-ink-light-primary"
                  }`
                }
              >
                Services
              </NavLink>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Theme toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-surface-dark-hover text-brand-gold hover:bg-surface-dark-card"
                    : "bg-gray-100 text-brand-amber hover:bg-gray-200"
                }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <FaSun />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <FaMoon />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Contact buttons - desktop */}
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-300 hover:bg-brand-gradient hover:text-white"
                  style={{
                    color:
                      theme === "dark"
                        ? "var(--tw-color-ink-dark-secondary)"
                        : undefined,
                  }}
                >
                  <FaPhone className="text-brand-red-orange group-hover:text-white" />
                  <span
                    className={
                      theme === "dark"
                        ? "text-ink-dark-secondary"
                        : "text-ink-light-secondary"
                    }
                  >
                    {settings.phone}
                  </span>
                </a>
              )}

             

              <Link
                to="/contact"
                className="hidden sm:flex btn-brand text-sm items-center gap-2"
              >
                Quick Inquiry <FaArrowRight className="text-xs" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-surface-dark-hover text-ink-dark-primary"
                    : "bg-gray-100 text-ink-light-primary"
                }`}
              >
                {mobileOpen ? (
                  <HiX className="text-xl" />
                ) : (
                  <HiMenuAlt3 className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-50 lg:hidden overflow-y-auto ${
                theme === "dark"
                  ? "bg-surface-dark-card border-l border-border-dark"
                  : "bg-white border-l border-border-light"
              }`}
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `block px-4 py-3 rounded-xl font-medium transition-colors ${
                            isActive
                              ? "bg-brand-gradient text-white"
                              : theme === "dark"
                                ? "text-ink-dark-primary hover:bg-surface-dark-hover"
                                : "text-ink-light-primary hover:bg-gray-100"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <NavLink
                      to="/services/flight-tickets"
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl font-medium transition-colors ${
                          isActive
                            ? "bg-brand-gradient text-white"
                            : theme === "dark"
                              ? "text-ink-dark-primary hover:bg-surface-dark-hover"
                              : "text-ink-light-primary hover:bg-gray-100"
                        }`
                      }
                    >
                      Services
                    </NavLink>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 pt-6 border-t border-border-light dark:border-border-dark space-y-3"
                >
                  {settings?.phone && (
                    <a
                      href={`tel:${settings.phone}`}
                      className="flex items-center gap-3 text-sm"
                    >
                      <FaPhone className="text-brand-red-orange" />
                      <span
                        className={
                          theme === "dark"
                            ? "text-ink-dark-secondary"
                            : "text-ink-light-secondary"
                        }
                      >
                        {settings.phone}
                      </span>
                    </a>
                  )}
                  {settings?.whatsapp && (
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm"
                    >
                      <FaWhatsapp className="text-green-500" />
                      <span
                        className={
                          theme === "dark"
                            ? "text-ink-dark-secondary"
                            : "text-ink-light-secondary"
                        }
                      >
                        WhatsApp
                      </span>
                    </a>
                  )}
                  <Link
                    to="/contact"
                    className="btn-brand w-full text-center mt-4"
                  >
                    Quick Inquiry
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

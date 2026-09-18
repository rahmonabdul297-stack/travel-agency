import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaSun, FaMoon, FaArrowRight, HiMenuAlt3, HiX, TbWorld } from "@/lib/icons";
import { useTheme } from "@/context/ThemeContext";
import { Logo, Logo2 } from "./Logo";

const languages = [
  { code: "en", name: "English" },
  { code: "prs", name: "دری (Dari)" },
  { code: "pus", name: "پښتو (Pashto)" },
];

function DesktopLanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative hidden lg:block" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
          theme === "dark"
            ? "bg-surface-dark-hover text-ink-dark-primary hover:bg-surface-dark-card"
            : "bg-gray-100 text-ink-light-primary hover:bg-gray-200"
        }`}
        aria-label="Select language"
      >
        <TbWorld className="text-xl" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 mt-2 w-40 rounded-2xl p-2 shadow-2xl border z-50 ${
              theme === "dark"
                ? "bg-surface-dark-card border-border-dark text-white"
                : "bg-white border-border-light text-ink-light-primary"
            }`}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-start px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  i18n.language === lang.code
                    ? "bg-brand-gradient text-white"
                    : theme === "dark"
                    ? "hover:bg-surface-dark-hover"
                    : "hover:bg-gray-100"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-light-secondary dark:text-ink-dark-secondary px-2">
        <TbWorld className="text-base" />
        <span>{t("nav.select_language", "Select Language")}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`py-2 px-1 text-center rounded-xl text-xs font-medium transition-colors ${
              i18n.language === lang.code
                ? "bg-brand-gradient text-white"
                : theme === "dark"
                ? "bg-surface-dark-hover text-white"
                : "bg-gray-100 text-ink-light-primary"
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: t("nav.home", "Home") },
    { to: "/about", label: t("nav.about", "About Us") },
    { to: "/contact", label: t("nav.contact", "Contact") },
  ];

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
            {scrolled ? <Logo /> : <Logo2 />}

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
                to="/services"
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
                {t("nav.services", "Services")}
              </NavLink>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Desktop Language Switcher Icon */}
              <DesktopLanguageSwitcher />

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

              <Link
                to="/contact"
                className="hidden sm:flex btn-brand text-sm items-center gap-2"
              >
                {t("nav.quick_inquiry", "Quick Inquiry")} <FaArrowRight className="text-xs rtl:rotate-180" />
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
              className={`fixed top-0 right-0 bottom-0 w-80 max-w-[80vw] z-50 lg:hidden overflow-y-auto ${
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
                      to="/services"
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
                      {t("nav.services", "Services")}
                    </NavLink>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 pt-6 border-t border-border-light dark:border-border-dark space-y-4"
                >
                  <MobileLanguageSwitcher />

                  <Link
                    to="/contact"
                    className="btn-brand w-full text-center block mt-4"
                  >
                    {t("nav.quick_inquiry", "Quick Inquiry")}
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
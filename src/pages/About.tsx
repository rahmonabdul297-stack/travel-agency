import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaUsers,
  FaAward,
  FaShieldAlt,
  FaHeadset,
  FaPlane,
  FaHandshake,
  FaRocket,
  FaStar,
  FaPlay,
  FaTimes,
  FaGlobeAmericas,
  FaPassport,
  FaBuilding,
} from "@/lib/icons";
import { useTheme } from "@/context/ThemeContext";
import { fetchSiteSettings } from "@/lib/data";
import type { SiteSettings } from "@/lib/supabase";

type AboutProps = {
  settings: SiteSettings | null;
};

const values = [
  {
    icon: FaShieldAlt,
    title: "Reliability",
    text: "We deliver on our promises, ensuring every trip is handled with the utmost care and professionalism.",
  },
  {
    icon: FaHandshake,
    title: "Trust",
    text: "Building long-term relationships with our clients through honest, transparent service.",
  },
  {
    icon: FaAward,
    title: "Quality",
    text: "We partner with the best airlines, hotels, and service providers to ensure premium experiences.",
  },
  {
    icon: FaHeadset,
    title: "Support",
    text: "Our team is available 24/7 to assist you before, during, and after your journey.",
  },
];

const milestones = [
  {
    year: "2010",
    title: "Founded",
    text: "Excellent Travel Agency was established with a vision to simplify travel.",
  },
  {
    year: "2015",
    title: "Expanded Services",
    text: "Added Umrah packages and student visa services to our portfolio.",
  },
  {
    year: "2020",
    title: "10,000+ Travelers",
    text: "Surpassed 10,000 satisfied travelers across all our services.",
  },
  {
    year: "2025",
    title: "Global Reach",
    text: "Now serving 50+ destinations worldwide with a dedicated team.",
  },
];

const capabilities = [
  {
    icon: FaGlobeAmericas,
    title: "Global Air Ticketing",
    desc: "Direct access to major worldwide and regional flight routes with flexible fares.",
  },
  {
    icon: FaPassport,
    title: "Visa Consultancy",
    desc: "Specialized visa guidance for international educational pathways and pilgrimages.",
  },
  {
    icon: FaBuilding,
    title: "Direct Hotel Bookings",
    desc: "Partnered accommodations ranging from luxury suites to close-to-Haram stays.",
  },
];

export default function About({ settings }: AboutProps) {
  const { theme } = useTheme();
  const [localSettings, setLocalSettings] = useState<SiteSettings | null>(
    settings,
  );
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (!settings) {
      fetchSiteSettings().then(setLocalSettings).catch(console.error);
    }
  }, [settings]);

  return (
    <div className={theme === "dark" ? "bg-surface-dark" : "bg-surface-light"}>
      {/* Hero Section with 100% Crisp & Original Video Background */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Clean Video Background (Overlays completely removed) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/video/Vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-black/40 border border-white/20 text-brand-gold text-sm font-semibold mb-4"
          >
            About Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
          >
            Excellence in{" "}
            <span className="brand-text-gradient">Travel Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl leading-relaxed text-white max-w-3xl mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mb-8"
          >
            {localSettings?.about_text ||
              "Excellent Travel Agency is a professional travel and pilgrimage agency dedicated to providing reliable, convenient, and high-quality travel services."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          />
        </div>
      </section>

      {/* Core Capabilities (Clean Solid Cards without backdrop blur) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl transition-all ${
                theme === "dark"
                  ? "bg-surface-dark-card border border-border-dark shadow-xl"
                  : "bg-white border border-border-light shadow-card-light"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-gradient/10 text-brand-red-orange flex items-center justify-center mb-4">
                <cap.icon className="text-xl" />
              </div>
              <h3
                className={`font-display font-bold text-lg mb-2 ${
                  theme === "dark"
                    ? "text-ink-dark-primary"
                    : "text-ink-light-primary"
                }`}
              >
                {cap.title}
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  theme === "dark"
                    ? "text-ink-dark-secondary"
                    : "text-ink-light-secondary"
                }`}
              >
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 ${
                theme === "dark"
                  ? "bg-surface-dark-card border border-border-dark"
                  : "bg-white border border-border-light shadow-card-light"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center mb-4">
                <FaRocket className="text-white text-xl" />
              </div>
              <h2
                className={`font-display text-xl font-bold mb-3 ${
                  theme === "dark"
                    ? "text-ink-dark-primary"
                    : "text-ink-light-primary"
                }`}
              >
                Our Mission
              </h2>
              <p
                className={`text-sm leading-relaxed ${
                  theme === "dark"
                    ? "text-ink-dark-secondary"
                    : "text-ink-light-secondary"
                }`}
              >
                To make travel planning easier, smoother, and more comfortable
                for our customers by providing reliable, convenient, and
                high-quality travel services tailored to their needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 ${
                theme === "dark"
                  ? "bg-surface-dark-card border border-border-dark"
                  : "bg-white border border-border-light shadow-card-light"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center mb-4">
                <FaStar className="text-white text-xl" />
              </div>
              <h2
                className={`font-display text-xl font-bold mb-3 ${
                  theme === "dark"
                    ? "text-ink-dark-primary"
                    : "text-ink-light-primary"
                }`}
              >
                Our Vision
              </h2>
              <p
                className={`text-sm leading-relaxed ${
                  theme === "dark"
                    ? "text-ink-dark-secondary"
                    : "text-ink-light-secondary"
                }`}
              >
                To be the most trusted travel agency, recognized for excellence
                in pilgrimage services, student visa assistance, and global
                travel solutions — a reliable way towards a brighter future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className={`py-16 lg:py-20 ${
          theme === "dark" ? "bg-surface-dark-card" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className={`font-display text-2xl lg:text-3xl font-bold mb-4 ${
                theme === "dark"
                  ? "text-ink-dark-primary"
                  : "text-ink-light-primary"
              }`}
            >
              Our Core Values
            </h2>
            <p
              className={`text-base ${
                theme === "dark"
                  ? "text-ink-dark-secondary"
                  : "text-ink-light-secondary"
              }`}
            >
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`rounded-2xl p-6 text-center ${
                  theme === "dark"
                    ? "bg-surface-dark-hover border border-border-dark hover:border-brand-red-orange/40"
                    : "bg-gray-50 border border-border-light hover:border-brand-red-orange/30"
                }`}
              >
                <div className="inline-flex w-14 h-14 rounded-2xl bg-brand-gradient items-center justify-center mb-4">
                  <val.icon className="text-white text-xl" />
                </div>
                <h3
                  className={`font-display font-bold mb-2 ${
                    theme === "dark"
                      ? "text-ink-dark-primary"
                      : "text-ink-light-primary"
                  }`}
                >
                  {val.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark"
                      ? "text-ink-dark-secondary"
                      : "text-ink-light-secondary"
                  }`}
                >
                  {val.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className={`font-display text-2xl lg:text-3xl font-bold mb-4 ${
                theme === "dark"
                  ? "text-ink-dark-primary"
                  : "text-ink-light-primary"
              }`}
            >
              Our Journey
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-brand-gradient" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center gap-6 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="lg:w-1/2 lg:px-8">
                    <div
                      className={`rounded-2xl p-6 ${
                        theme === "dark"
                          ? "bg-surface-dark-card border border-border-dark"
                          : "bg-white border border-border-light shadow-card-light"
                      }`}
                    >
                      <span className="text-brand-gradient bg-clip-text font-display text-2xl font-bold">
                        {m.year}
                      </span>
                      <h3
                        className={`font-display font-bold mt-2 mb-1 ${
                          theme === "dark"
                            ? "text-ink-dark-primary"
                            : "text-ink-light-primary"
                        }`}
                      >
                        {m.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          theme === "dark"
                            ? "text-ink-dark-secondary"
                            : "text-ink-light-secondary"
                        }`}
                      >
                        {m.text}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-gradient ring-4 ring-surface-light dark:ring-surface-dark-card z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className={`py-16 ${
          theme === "dark" ? "bg-surface-dark-card" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaUsers, value: "10,000+", label: "Happy Travelers" },
              { icon: FaAward, value: "15+", label: "Years Experience" },
              { icon: FaPlane, value: "50+", label: "Destinations" },
              { icon: FaShieldAlt, value: "100%", label: "Secure Booking" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex w-14 h-14 rounded-2xl bg-brand-gradient items-center justify-center mb-3">
                  <stat.icon className="text-white text-xl" />
                </div>
                <div
                  className={`font-display text-2xl lg:text-3xl font-bold ${
                    theme === "dark"
                      ? "text-ink-dark-primary"
                      : "text-ink-light-primary"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-ink-dark-secondary"
                      : "text-ink-light-secondary"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Player using Local Video */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center  p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.01, opacity: 0 }}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              >
                <FaTimes />
              </button>
              <div className="relative pt-[56.25%] bg-black">
                <video
                  controls
                  autoPlay
                  className="absolute inset-0 w-full h-full object-contain"
                >
                  <source src="/video/Vid.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
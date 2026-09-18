import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "@/lib/icons";
import { useTheme } from "@/context/ThemeContext";
import { Logo } from "./Logo";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaTiktok,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function Footer() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const siteLinks = [
    { to: "/", label: t("footer.links.home", "Home") },
    { to: "/about", label: t("footer.links.about", "About Us") },
    { to: "/services/flight-tickets", label: t("footer.links.flight_tickets", "Flight Tickets") },
    { to: "/services/hotel-reservations", label: t("footer.links.hotel_reservations", "Hotel Reservations") },
    { to: "/services/umrah-packages", label: t("footer.links.umrah_packages", "Umrah Packages") },
    { to: "/services/student-visas", label: t("footer.links.student_visas", "Student Visas") },
    { to: "/contact", label: t("footer.links.contact", "Contact") },
  ];

  const serviceLinks = [
    { to: "/services/flight-tickets", label: t("footer.links.flight_tickets", "Flight Tickets") },
    { to: "/services", label: t("footer.links.hotel_reservations", "Hotel Reservations") },
    { to: "/services/travel-services", label: t("footer.links.travel_services", "Travel Services") },
    { to: "/services/umrah-packages", label: t("footer.links.umrah_packages", "Umrah Packages") },
    { to: "/services/student-visas", label: t("footer.links.student_visas", "Student Visas") },
  ];

  return (
    <footer
      className={`relative overflow-hidden ${
        theme === "dark"
          ? "bg-surface-dark-card border-t border-border-dark"
          : "bg-white border-t border-border-light"
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Logo />
            <p
              className={`text-sm leading-relaxed ${
                theme === "dark"
                  ? "text-ink-dark-secondary"
                  : "text-ink-light-secondary"
              }`}
            >
              {t(
                "footer.brand_description",
                "Professional travel and pilgrimage agency providing reliable, convenient, and high-quality travel services."
              )}
            </p>
            <div
              className={`py-8 ${
                theme === "dark"
                  ? "text-ink-dark-secondary"
                  : "text-ink-light-secondary"
              } flex gap-2`}
            >
              <Link
                to="https://web.facebook.com/profile.php?id=100092668025297"
                target="_blank"
              >
                <FaFacebook />
              </Link>
              <Link to="/">
                <FaInstagram />
              </Link>
              <Link to="/">
                <FaX />
              </Link>
              <Link to="/">
                <FaTiktok />
              </Link>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4
              className={`font-display font-semibold mb-4 ${
                theme === "dark"
                  ? "text-ink-dark-primary"
                  : "text-ink-light-primary"
              }`}
            >
              {t("footer.quick_links", "Quick Links")}
            </h4>
            <ul className="space-y-2">
              {siteLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className={`text-sm flex items-center gap-1 group transition-colors ${
                      theme === "dark"
                        ? "text-ink-dark-secondary hover:text-brand-gold"
                        : "text-ink-light-secondary hover:text-brand-red-orange"
                    }`}
                  >
                    <FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 group-hover:mr-1 transition-all rtl:rotate-180" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4
              className={`font-display font-semibold mb-4 ${
                theme === "dark"
                  ? "text-ink-dark-primary"
                  : "text-ink-light-primary"
              }`}
            >
              {t("footer.our_services", "Our Services")}
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className={`text-sm transition-colors ${
                      theme === "dark"
                        ? "text-ink-dark-secondary hover:text-brand-gold"
                        : "text-ink-light-secondary hover:text-brand-red-orange"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4
              className={`font-display font-semibold text-base tracking-wide ${
                theme === "dark"
                  ? "text-ink-dark-primary"
                  : "text-ink-light-primary"
              }`}
            >
              {t("footer.contact_us", "Contact Us")}
            </h4>

            <div className="space-y-2.5 text-sm">
              {/* Email Link */}
              <a
                href="mailto:excellent.kbl.travel@gmail.com"
                className={`group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 border ${
                  theme === "dark"
                    ? "bg-surface-dark-card/40 hover:bg-surface-dark-card border-border-dark/60 hover:border-brand-gold/40"
                    : "bg-white/50 hover:bg-white border-border-light/80 hover:border-brand-red-orange/30 shadow-card-light"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    theme === "dark"
                      ? "bg-brand-amber/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-black"
                      : "bg-brand-red-orange/10 text-brand-red-orange group-hover:bg-brand-gradient group-hover:text-white"
                  }`}
                >
                  <FaEnvelope className="text-xs" />
                </div>
                <span
                  className={`text-xs font-medium truncate transition-colors ${
                    theme === "dark"
                      ? "text-ink-dark-secondary group-hover:text-ink-dark-primary"
                      : "text-ink-light-secondary group-hover:text-ink-light-primary"
                  }`}
                >
                  {t("footer.send_mail", "Send Mail")}
                </span>
              </a>

              {/* Phone Numbers Group */}
              <div
                className={`p-3 rounded-2xl border space-y-2 ${
                  theme === "dark"
                    ? "bg-surface-dark-card/30 border-border-dark/50"
                    : "bg-white/40 border-border-light/60"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <FaPhoneAlt
                    className={`text-xs ${
                      theme === "dark"
                        ? "text-brand-gold"
                        : "text-brand-red-orange"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-semibold tracking-wider uppercase ${
                      theme === "dark"
                        ? "text-ink-dark-secondary/70"
                        : "text-ink-light-secondary/70"
                    }`}
                  >
                    {t("footer.phone_support", "Phone Support")}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 pl-5 rtl:pl-0 rtl:pr-5">
                  {["+93 789785320", "+93 794560560", "+93 785790647"].map(
                    (phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className={`group flex items-center justify-between text-xs font-medium transition-colors ${
                          theme === "dark"
                            ? "text-ink-dark-secondary hover:text-brand-gold"
                            : "text-ink-light-secondary hover:text-brand-red-orange"
                        }`}
                      >
                        <span>{phone}</span>
                        <FaArrowRight className="text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 rtl:rotate-180" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            theme === "dark" ? "border-border-dark" : "border-border-light"
          }`}
        >
          <p
            className={`text-xs ${
              theme === "dark"
                ? "text-ink-dark-secondary"
                : "text-ink-light-secondary"
            }`}
          >
            &copy; {new Date().getFullYear()} {t("footer.rights_reserved", "Excellent Travel Agency. All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
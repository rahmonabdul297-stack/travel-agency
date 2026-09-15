import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaPlane, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaArrowRight,
} from '@/lib/icons';
import { useTheme } from '@/context/ThemeContext';
import type { SiteSettings } from '@/lib/supabase';

type FooterProps = {
  settings: SiteSettings | null;
};

export default function Footer({ settings }: FooterProps) {
  const { theme } = useTheme();

  const socials = [
    { url: settings?.facebook, icon: FaFacebookF, label: 'Facebook' },
    { url: settings?.instagram, icon: FaInstagram, label: 'Instagram' },
    { url: settings?.twitter, icon: FaTwitter, label: 'Twitter' },
    { url: settings?.youtube, icon: FaYoutube, label: 'YouTube' },
  ].filter((s) => s.url);

  const siteLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services/flight-tickets', label: 'Flight Tickets' },
    { to: '/services/hotel-reservations', label: 'Hotel Reservations' },
    { to: '/services/umrah-packages', label: 'Umrah Packages' },
    { to: '/services/student-visas', label: 'Student Visas' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <footer className={`relative overflow-hidden ${theme === 'dark' ? 'bg-surface-dark-card border-t border-border-dark' : 'bg-white border-t border-border-light'}`}>
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
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center">
                <FaPlane className="text-white text-lg" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`font-display font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                  Excellent Travel
                </span>
                <span className="text-[10px] bg-brand-gradient bg-clip-text text-transparent font-semibold">
                  {settings?.tagline || 'A Reliable Way Towards a Brighter Future'}
                </span>
              </div>
            </Link>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
              {settings?.about_text?.split('.').slice(0, 2).join('.') || 'Professional travel and pilgrimage agency providing reliable, convenient, and high-quality travel services.'}
            </p>
            {socials.length > 0 && (
              <div className="flex gap-2 mt-4">
                {socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-dark-hover text-ink-dark-secondary hover:bg-brand-gradient hover:text-white'
                        : 'bg-gray-100 text-ink-light-secondary hover:bg-brand-gradient hover:text-white'
                    }`}
                  >
                    <social.icon className="text-sm" />
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className={`font-display font-semibold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {siteLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className={`text-sm flex items-center gap-1 group transition-colors ${
                      theme === 'dark' ? 'text-ink-dark-secondary hover:text-brand-gold' : 'text-ink-light-secondary hover:text-brand-red-orange'
                    }`}
                  >
                    <FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 group-hover:mr-1 transition-all" />
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
            <h4 className={`font-display font-semibold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Our Services
            </h4>
            <ul className="space-y-2">
              <li><Link to="/services/flight-tickets" className={`text-sm transition-colors ${theme === 'dark' ? 'text-ink-dark-secondary hover:text-brand-gold' : 'text-ink-light-secondary hover:text-brand-red-orange'}`}>Flight Tickets</Link></li>
              <li><Link to="/services/hotel-reservations" className={`text-sm transition-colors ${theme === 'dark' ? 'text-ink-dark-secondary hover:text-brand-gold' : 'text-ink-light-secondary hover:text-brand-red-orange'}`}>Hotel Reservations</Link></li>
              <li><Link to="/services/travel-services" className={`text-sm transition-colors ${theme === 'dark' ? 'text-ink-dark-secondary hover:text-brand-gold' : 'text-ink-light-secondary hover:text-brand-red-orange'}`}>Travel Services</Link></li>
              <li><Link to="/services/umrah-packages" className={`text-sm transition-colors ${theme === 'dark' ? 'text-ink-dark-secondary hover:text-brand-gold' : 'text-ink-light-secondary hover:text-brand-red-orange'}`}>Umrah Packages</Link></li>
              <li><Link to="/services/student-visas" className={`text-sm transition-colors ${theme === 'dark' ? 'text-ink-dark-secondary hover:text-brand-gold' : 'text-ink-light-secondary hover:text-brand-red-orange'}`}>Student Visas</Link></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className={`font-display font-semibold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Contact Us
            </h4>
            <ul className="space-y-3">
              {settings?.phone && (
                <li>
                  <a href={`tel:${settings.phone}`} className="flex items-start gap-3 text-sm group">
                    <FaPhone className="text-brand-red-orange mt-0.5 shrink-0" />
                    <span className={theme === 'dark' ? 'text-ink-dark-secondary group-hover:text-brand-gold' : 'text-ink-light-secondary group-hover:text-brand-red-orange'}>
                      {settings.phone}
                    </span>
                  </a>
                </li>
              )}
              {settings?.whatsapp && (
                <li>
                  <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm group">
                    <FaWhatsapp className="text-green-500 mt-0.5 shrink-0" />
                    <span className={theme === 'dark' ? 'text-ink-dark-secondary group-hover:text-brand-gold' : 'text-ink-light-secondary group-hover:text-brand-red-orange'}>
                      WhatsApp
                    </span>
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-start gap-3 text-sm group">
                    <FaEnvelope className="text-brand-amber mt-0.5 shrink-0" />
                    <span className={`break-all ${theme === 'dark' ? 'text-ink-dark-secondary group-hover:text-brand-gold' : 'text-ink-light-secondary group-hover:text-brand-red-orange'}`}>
                      {settings.email}
                    </span>
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-3 text-sm">
                  <FaMapMarkerAlt className="text-brand-red-orange mt-0.5 shrink-0" />
                  <span className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}>
                    {settings.address}
                  </span>
                </li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${theme === 'dark' ? 'border-border-dark' : 'border-border-light'}`}>
          <p className={`text-xs ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
            (c) {new Date().getFullYear()} {settings?.agency_name || 'Excellent Travel Agency'}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/admin" className={`text-xs transition-colors ${theme === 'dark' ? 'text-ink-dark-secondary hover:text-brand-gold' : 'text-ink-light-secondary hover:text-brand-red-orange'}`}>
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt,
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube,
  FaClock, FaArrowRight,
} from '@/lib/icons';
import { useTheme } from '@/context/ThemeContext';
import { fetchServices, fetchSiteSettings } from '@/lib/data';
import type { Service, SiteSettings } from '@/lib/supabase';
import LeadForm from '@/components/LeadForm';

type ContactProps = {
  settings: SiteSettings | null;
};

export default function Contact({ settings }: ContactProps) {
  const { theme } = useTheme();
  const [services, setServices] = useState<Service[]>([]);
  const [localSettings, setLocalSettings] = useState<SiteSettings | null>(settings);

  useEffect(() => {
    fetchServices().then(setServices).catch(console.error);
    if (!settings) {
      fetchSiteSettings().then(setLocalSettings).catch(console.error);
    }
  }, [settings]);

  const contactCards = [
    { icon: FaPhone, label: 'Phone', value: localSettings?.phone || '', href: `tel:${localSettings?.phone || ''}`, color: 'bg-blue-500' },
    { icon: FaWhatsapp, label: 'WhatsApp', value: localSettings?.whatsapp || '', href: `https://wa.me/${(localSettings?.whatsapp || '').replace(/[^0-9]/g, '')}`, color: 'bg-green-500' },
    { icon: FaEnvelope, label: 'Email', value: localSettings?.email || '', href: `mailto:${localSettings?.email || ''}`, color: 'bg-brand-red-orange' },
    { icon: FaMapMarkerAlt, label: 'Address', value: localSettings?.address || '', href: '#', color: 'bg-brand-amber' },
  ];

  const socials = [
    { url: localSettings?.facebook, icon: FaFacebookF, label: 'Facebook' },
    { url: localSettings?.instagram, icon: FaInstagram, label: 'Instagram' },
    { url: localSettings?.twitter, icon: FaTwitter, label: 'Twitter' },
    { url: localSettings?.youtube, icon: FaYoutube, label: 'YouTube' },
  ].filter((s) => s.url);

  return (
    <div className={theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-light'}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dark-glow" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-gradient/10 text-brand-red-orange text-sm font-semibold mb-4"
          >
            Contact Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className={theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}>Get in </span>
            <span className="brand-text-gradient">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}
          >
            We are here to help you plan your next journey. Reach out through any of the channels below.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, i) => (
              <motion.a
                key={i}
                href={card.href}
                target={card.icon === FaWhatsapp ? '_blank' : undefined}
                rel={card.icon === FaWhatsapp ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`rounded-2xl p-6 text-center transition-all ${
                  theme === 'dark'
                    ? 'bg-surface-dark-card border border-border-dark hover:border-brand-red-orange/40 hover:shadow-brand-glow'
                    : 'bg-white border border-border-light hover:border-brand-red-orange/30 hover:shadow-card-light'
                }`}
              >
                <div className={`inline-flex w-14 h-14 rounded-2xl ${card.color} items-center justify-center mb-4`}>
                  <card.icon className="text-white text-xl" />
                </div>
                <h3 className={`font-display font-bold mb-1 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                  {card.label}
                </h3>
                <p className={`text-sm break-words ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                  {card.value}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 ${
                theme === 'dark'
                  ? 'bg-surface-dark-card border border-border-dark'
                  : 'bg-white border border-border-light shadow-card-light'
              }`}
            >
              <h2 className={`font-display text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                Send Us a Message
              </h2>
              <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                Fill out the form and we will get back to you within 24 hours.
              </p>
              <LeadForm services={services} />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light shadow-card-light'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-brand-red-orange text-xl" />
                  <h3 className={`font-display font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                    Business Hours
                  </h3>
                </div>
                <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light shadow-card-light'}`}>
                <h3 className={`font-display font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socials.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        theme === 'dark'
                          ? 'bg-surface-dark-hover text-ink-dark-secondary hover:bg-brand-gradient hover:text-white'
                          : 'bg-gray-100 text-ink-light-secondary hover:bg-brand-gradient hover:text-white'
                      }`}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light shadow-card-light'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="text-brand-red-orange text-xl" />
                  <h3 className={`font-display font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                    Visit Our Office
                  </h3>
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden bg-brand-gradient/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-4xl text-brand-red-orange mb-2 mx-auto" />
                      <p className={`text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                        {localSettings?.address}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,94,54,0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,184,0,0.3), transparent 50%)'
                  }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt,
  FaFacebookF, FaInstagram, FaClock,
} from '@/lib/icons';
import { useTheme } from '@/context/ThemeContext';
import LeadForm from '@/components/LeadForm';
import { FaTiktok } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

export default function Contact() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const contactCards = [
    {
      icon: FaPhone,
      label: t('contact_page.cards.phone', 'Phone Support'),
      value: '+93789785320',
      href: 'tel:+93789785320',
      color: 'bg-blue-500',
    },
    {
      icon: FaWhatsapp,
      label: t('contact_page.cards.whatsapp', 'WhatsApp'),
      value: '+93789785320',
      href: 'https://wa.me/93789785320',
      color: 'bg-green-500',
    },
    {
      icon: FaEnvelope,
      label: t('contact_page.cards.email', 'Email Us'),
      value: 'excellent.kbl.travel@gmail.com',
      href: 'mailto:excellent.kbl.travel@gmail.com',
      color: 'bg-brand-red-orange',
    },
    {
      icon: FaMapMarkerAlt,
      label: t('contact_page.cards.office', 'Visit Office'),
      value: t('contact_page.cards.location', 'Kabul, Afghanistan'),
      href: '#office-map',
      color: 'bg-brand-amber',
    },
  ];
  
  const socials = [
    { url: 'https://facebook.com', icon: FaFacebookF, label: 'Facebook' },
    { url: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
    { url: 'https://twitter.com', icon: FaX, label: 'X' },
    { url: 'https://tiktok.com', icon: FaTiktok, label: 'TikTok' },
  ];

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
            {t('contact_page.badge', 'Contact Us')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className={theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}>
              {t('contact_page.hero_title_1', 'Get in')}{' '}
            </span>
            <span className="brand-text-gradient">
              {t('contact_page.hero_title_2', 'Touch')}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}
          >
            {t('contact_page.hero_subtitle', 'We are here to help you plan your next journey. Reach out through any of the channels below.')}
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
                {t('contact_page.form.title', 'Send Us a Message')}
              </h2>
              <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                {t('contact_page.form.subtitle', 'Fill out the form and we will get back to you within 24 hours.')}
              </p>
              <LeadForm />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Business Hours */}
              <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light shadow-card-light'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-brand-red-orange text-xl" />
                  <h3 className={`font-display font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                    {t('contact_page.hours.title', 'Business Hours')}
                  </h3>
                </div>
                <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                  <div className="flex justify-between">
                    <span>{t('contact_page.hours.always_open', 'Always Open')}</span>
                    <span className="font-medium">{t('contact_page.hours.twenty_four_seven', '24/7')}</span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light shadow-card-light'}`}>
                <h3 className={`font-display font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                  {t('contact_page.socials.title', 'Follow Us')}
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

              {/* Office Map */}
              <div id="office-map" className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light shadow-card-light'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="text-brand-red-orange text-xl" />
                  <h3 className={`font-display font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                    {t('contact_page.office.title', 'Visit Our Office')}
                  </h3>
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden bg-brand-gradient/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-4xl text-brand-red-orange mb-2 mx-auto" />
                      <p className={`text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                        {t('contact_page.office.address', 'Dawoodzai Commercial Center, Kabul, Afghanistan')}
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
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight, FaArrowLeft, FaCheckCircle, FaChevronDown,
  FaWhatsapp, FaPhone, FaQuestionCircle, FaStar,
} from '@/lib/icons';
import { useTheme } from '@/context/ThemeContext';
import { getIcon } from '@/lib/icons';
import { fetchServiceBySlug, fetchPackagesByService, fetchSiteSettings } from '@/lib/data';
import type { Service, Package, SiteSettings } from '@/lib/supabase';
import LeadForm from '@/components/LeadForm';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const [service, setService] = useState<Service | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);
    Promise.all([
      fetchServiceBySlug(slug),
      fetchSiteSettings(),
    ]).then(async ([svc, stgs]) => {
      if (!svc) {
        setError(true);
        setLoading(false);
        return;
      }
      setService(svc);
      setSettings(stgs);
      const pkgs = await fetchPackagesByService(svc.id);
      setPackages(pkgs);
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-brand-red-orange/20 border-t-brand-red-orange rounded-full"
        />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center">
          <h2 className={`font-display text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
            Service Not Found
          </h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
            The service you are looking for does not exist or has been removed.
          </p>
          <Link to="/" className="btn-brand inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = getIcon(service.icon_name);
  const gallery = [service.hero_image, ...service.gallery_images].filter(Boolean);

  const accordionItems = [
    { title: 'Overview', content: service.long_description },
    { title: 'Features & Benefits', content: service.features.map(f => `- ${f}`).join('\n') },
    ...(packages.length > 0 ? [{ title: 'Available Packages', content: packages.map(p => `${p.title} (${p.duration}) - ${p.price}`).join('\n') }] : []),
    { title: 'How to Apply', content: '1. Fill out the application form below\n2. Upload your documents\n3. Our team will contact you within 24 hours\n4. Complete your booking with our guidance' },
  ];

  return (
    <div className={theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-light'}>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={service.hero_image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="inline-flex w-16 h-16 rounded-2xl bg-brand-gradient items-center justify-center mb-6 shadow-brand-glow-lg"
          >
            <Icon className="text-white text-2xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            {service.short_description}
          </motion.p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ${theme === 'dark' ? 'border-b border-border-dark' : 'border-b border-border-light'}`}>
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className={theme === 'dark' ? 'text-ink-dark-secondary hover:text-brand-gold' : 'text-ink-light-secondary hover:text-brand-red-orange'}>
            Home
          </Link>
          <FaArrowRight className="text-xs text-brand-red-orange" />
          <span className="text-brand-red-orange font-medium">{service.title}</span>
        </div>
      </div>

      {/* Gallery + Description */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative rounded-2xl overflow-hidden h-80 lg:h-96 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeGallery}
                    src={gallery[activeGallery]}
                    alt={`${service.title} ${activeGallery + 1}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {gallery.slice(0, 4).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveGallery(i)}
                      className={`rounded-xl overflow-hidden h-20 transition-all ${
                        i === activeGallery
                          ? 'ring-2 ring-brand-red-orange ring-offset-2'
                          : theme === 'dark' ? 'ring-1 ring-border-dark opacity-60 hover:opacity-100' : 'ring-1 ring-border-light opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Description + Accordion */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className={`font-display text-2xl lg:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                About This Service
              </h2>
              <p className={`text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                {service.long_description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-gradient/10 flex items-center justify-center shrink-0">
                      <FaCheckCircle className="text-brand-red-orange text-xs" />
                    </div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Accordion */}
              <div className="space-y-2">
                {accordionItems.map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-xl overflow-hidden border transition-colors ${
                      openAccordion === i
                        ? theme === 'dark' ? 'border-brand-red-orange/40' : 'border-brand-red-orange/30'
                        : theme === 'dark' ? 'border-border-dark' : 'border-border-light'
                    }`}
                  >
                    <button
                      onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left ${
                        theme === 'dark' ? 'bg-surface-dark-card hover:bg-surface-dark-hover' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                        {item.title}
                      </span>
                      <motion.div animate={{ rotate: openAccordion === i ? 180 : 0 }}>
                        <FaChevronDown className={`text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openAccordion === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className={`px-4 py-3 text-sm whitespace-pre-line ${theme === 'dark' ? 'text-ink-dark-secondary bg-surface-dark-hover' : 'text-ink-light-secondary bg-gray-50'}`}>
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages */}
      {packages.length > 0 && (
        <section className={`py-16 lg:py-20 ${theme === 'dark' ? 'bg-surface-dark-card' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className={`font-display text-2xl lg:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                Available Packages
              </h2>
              <p className={`text-base ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                Choose the package that best suits your needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`rounded-2xl p-6 ${
                    theme === 'dark'
                      ? 'bg-surface-dark-hover border border-border-dark hover:border-brand-red-orange/40 hover:shadow-brand-glow'
                      : 'bg-gray-50 border border-border-light hover:border-brand-red-orange/30 hover:shadow-card-light'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`font-display text-lg font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                      {pkg.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-brand-gradient/10 text-brand-red-orange font-semibold">
                      {pkg.duration}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                    {pkg.description}
                  </p>
                  <div className={`text-2xl font-bold mb-4 bg-brand-gradient bg-clip-text text-transparent`}>
                    {pkg.price}
                  </div>
                  {pkg.itinerary.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {pkg.itinerary.map((step, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs">
                          <span className="w-5 h-5 rounded-full bg-brand-gradient/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-brand-red-orange font-bold text-[10px]">{j + 1}</span>
                          </span>
                          <span className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}>
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {pkg.gallery_images.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {pkg.gallery_images.slice(0, 3).map((img, j) => (
                        <img key={j} src={img} alt="" className="w-16 h-16 rounded-lg object-cover" />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Form */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-8 lg:p-12 ${
              theme === 'dark'
                ? 'bg-surface-dark-card border border-border-dark'
                : 'bg-white border border-border-light shadow-card-light'
            }`}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gradient/10 text-brand-red-orange text-sm font-semibold mb-4">
                Apply Now
              </span>
              <h2 className={`font-display text-2xl lg:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                {service.title} Application
              </h2>
              <p className={`text-base ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                Fill out the form below to apply or request more information.
              </p>
            </div>
            <LeadForm services={[service]} defaultService={service.title} />
          </motion.div>
        </div>
      </section>

      {/* Ask a Question */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-surface-dark-card' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex w-16 h-16 rounded-2xl bg-brand-gradient items-center justify-center mb-6 shadow-brand-glow"
          >
            <FaQuestionCircle className="text-white text-2xl" />
          </motion.div>
          <h2 className={`font-display text-2xl lg:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
            Have a Question?
          </h2>
          <p className={`text-base mb-8 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
            Reach out to us directly via phone or WhatsApp for instant assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {settings?.phone && (
              <a href={`tel:${settings.phone}`} className="btn-brand flex items-center gap-2">
                <FaPhone /> Call Us
              </a>
            )}
            {settings?.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:scale-105 transition-transform"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            )}
            <Link to="/contact" className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
              theme === 'dark' ? 'bg-surface-dark-hover text-ink-dark-primary hover:bg-surface-dark-card' : 'bg-gray-100 text-ink-light-primary hover:bg-gray-200'
            }`}>
              Contact Form <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight, FaCheckCircle, FaStar, FaQuoteLeft,
  FaPlane, FaUsers, FaShieldAlt, FaHeadset, FaAward,
  FaWhatsapp, FaPhone, FaTimes, FaPaperPlane,
} from '@/lib/icons';
import { useTheme } from '@/context/ThemeContext';
import { getIcon } from '@/lib/icons';
import { fetchServices, fetchSiteSettings, submitLead } from '@/lib/data';
import type { Service, SiteSettings } from '@/lib/supabase';
import LeadForm from '@/components/LeadForm';

type HomeProps = {
  settings: SiteSettings | null;
};

const heroSlides = [
  'https://images.pexels.com/photos/5410501/pexels-photo-5410501.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/6910147/pexels-photo-6910147.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/8106840/pexels-photo-8106840.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

const stats = [
  { icon: FaUsers, value: '10,000+', label: 'Happy Travelers' },
  { icon: FaAward, value: '15+', label: 'Years Experience' },
  { icon: FaPlane, value: '50+', label: 'Destinations' },
  { icon: FaShieldAlt, value: '100%', label: 'Secure Booking' },
];

const testimonials = [
  { name: 'Ahmed Hassan', text: 'Excellent Travel Agency made our Umrah trip absolutely seamless. From visa to hotel near the Haram, everything was perfect.', role: 'Umrah Pilgrim', rating: 5 },
  { name: 'Fatima Noor', text: 'They helped me get my student visa for Turkey. The team was supportive at every step, from university selection to visa filing.', role: 'Student, Turkey', rating: 5 },
  { name: 'Bilal Khan', text: 'Best travel agency I have worked with. Their flight ticket prices are unbeatable and the service is always professional.', role: 'Business Traveler', rating: 5 },
];

export default function Home({ settings }: HomeProps) {
  const { theme } = useTheme();
  const [services, setServices] = useState<Service[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuickInquiry, setShowQuickInquiry] = useState(false);
  const [quickStatus, setQuickStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [quickForm, setQuickForm] = useState({ name: '', phone: '', service: '' });
  const leadFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchServices().then(setServices).catch(console.error);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToLeadForm = () => {
    leadFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.phone) return;
    setQuickStatus('submitting');
    try {
      await submitLead({
        full_name: quickForm.name,
        phone: quickForm.phone,
        email: '',
        service: quickForm.service,
        destination: '',
        travel_date: '',
        message: 'Quick inquiry from homepage',
        document_url: '',
      });
      setQuickStatus('success');
      setQuickForm({ name: '', phone: '', service: '' });
      setTimeout(() => {
        setShowQuickInquiry(false);
        setQuickStatus('idle');
      }, 2500);
    } catch {
      setQuickStatus('idle');
    }
  };

  return (
    <div className={theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-light'}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background slider */}
        <div className="absolute inset-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[currentSlide]})` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <FaStar className="text-brand-gold text-sm" />
            <span className="text-white/90 text-sm font-medium">Trusted by 10,000+ travelers worldwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 text-balance"
          >
            A Reliable Way Towards
            <br />
            <span className="brand-text-gradient">a Brighter Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            {settings?.agency_name || 'Excellent Travel Agency'} — Your trusted partner for flights, hotels, Umrah packages, and student visas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setShowQuickInquiry(true)}
              className="btn-brand text-base px-8 py-4 flex items-center gap-2"
            >
              Quick Inquiry <FaArrowRight />
            </button>
            <Link
              to="/about"
              className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Slide indicators */}
          <div className="flex gap-2 justify-center mt-12">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-8 bg-brand-gradient' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-surface-dark-card border-y border-border-dark' : 'bg-white border-y border-border-light'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
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
                <div className={`font-display text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gradient/10 text-brand-red-orange text-sm font-semibold mb-4">
                About Us
              </span>
              <h2 className={`font-display text-3xl lg:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                Your Trusted Travel Partner
              </h2>
              <p className={`text-base leading-relaxed mb-4 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                {settings?.about_text || 'Excellent Travel Agency is a professional travel and pilgrimage agency dedicated to providing reliable, convenient, and high-quality travel services. Our goal is to make travel planning easier, smoother, and more comfortable for our customers.'}
              </p>
              <p className={`text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                Our services include domestic and international flight tickets, hotel reservations, travel services, Umrah visa and packages, and student visa services.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { icon: FaCheckCircle, text: 'Reliable & Professional Service' },
                  { icon: FaCheckCircle, text: 'Competitive Pricing' },
                  { icon: FaCheckCircle, text: '24/7 Customer Support' },
                  { icon: FaCheckCircle, text: 'Experienced Travel Experts' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="text-brand-red-orange shrink-0" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-brand inline-flex items-center gap-2">
                Read More <FaArrowRight className="text-xs" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg?auto=compress&cs=tinysrgb&h=400&w=300"
                    alt="Kaaba"
                    className="rounded-2xl w-full h-48 object-cover shadow-lg"
                  />
                  <img
                    src="https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&h=300&w=300"
                    alt="Hotel"
                    className="rounded-2xl w-full h-36 object-cover shadow-lg"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.pexels.com/photos/5410501/pexels-photo-5410501.jpeg?auto=compress&cs=tinysrgb&h=300&w=300"
                    alt="Airplane"
                    className="rounded-2xl w-full h-36 object-cover shadow-lg"
                  />
                  <img
                    src="https://images.pexels.com/photos/7972324/pexels-photo-7972324.jpeg?auto=compress&cs=tinysrgb&h=400&w=300"
                    alt="Students"
                    className="rounded-2xl w-full h-48 object-cover shadow-lg"
                  />
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 px-6 py-4 rounded-2xl bg-brand-gradient text-white shadow-brand-glow-lg"
              >
                <div className="flex items-center gap-3">
                  <FaHeadset className="text-2xl" />
                  <div>
                    <div className="font-bold text-lg">24/7</div>
                    <div className="text-xs text-white/80">Support Available</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`py-20 lg:py-28 ${theme === 'dark' ? 'bg-surface-dark-card' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gradient/10 text-brand-red-orange text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className={`font-display text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              What We Offer
            </h2>
            <p className={`text-base max-w-2xl mx-auto ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
              Comprehensive travel services designed to make your journey smooth and memorable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = getIcon(service.icon_name);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                    theme === 'dark'
                      ? 'bg-surface-dark-hover border border-border-dark hover:border-brand-red-orange/40 hover:shadow-brand-glow'
                      : 'bg-white border border-border-light hover:border-brand-red-orange/30 hover:shadow-card-light'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.hero_image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-lg">
                      <Icon className="text-white text-lg" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`font-display text-lg font-bold mb-2 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                      {service.short_description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      {service.features.slice(0, 3).map((f, j) => (
                        <span
                          key={j}
                          className={`text-[11px] px-2 py-1 rounded-full ${
                            theme === 'dark' ? 'bg-surface-dark text-brand-gold' : 'bg-gray-100 text-brand-red-orange'
                          }`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red-orange hover:gap-3 transition-all"
                    >
                      Learn More <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section ref={leadFormRef} className="py-20 lg:py-28">
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
                Get In Touch
              </span>
              <h2 className={`font-display text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                Plan Your Journey With Us
              </h2>
              <p className={`text-base ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>
            <LeadForm services={services} />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 lg:py-28 ${theme === 'dark' ? 'bg-surface-dark-card' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gradient/10 text-brand-red-orange text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className={`font-display text-3xl lg:text-4xl font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 ${
                  theme === 'dark'
                    ? 'bg-surface-dark-hover border border-border-dark'
                    : 'bg-gray-50 border border-border-light'
                }`}
              >
                <FaQuoteLeft className="text-2xl text-brand-red-orange/30 mb-4" />
                <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                  "{t.text}"
                </p>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FaStar key={j} className="text-brand-gold text-sm" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                      {t.name}
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-8 lg:p-12 text-center"
          >
            <div className="absolute inset-0 bg-brand-gradient" />
            <div className="absolute inset-0 bg-dark-glow opacity-50" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/90 text-base mb-8 max-w-2xl mx-auto">
                Contact us today and let Excellent Travel Agency handle all your travel needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {settings?.phone && (
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-red-orange font-semibold hover:scale-105 transition-transform"
                  >
                    <FaPhone /> {settings.phone}
                  </a>
                )}
                {settings?.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:scale-105 transition-transform"
                  >
                    <FaWhatsapp /> WhatsApp Us
                  </a>
                )}
                <Link to="/contact" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/20 transition-colors">
                  Contact Form <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Inquiry Modal */}
      <AnimatePresence>
        {showQuickInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuickInquiry(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className={`relative max-w-md w-full rounded-2xl p-6 ${
                theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQuickInquiry(false)}
                className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  theme === 'dark' ? 'hover:bg-surface-dark-hover' : 'hover:bg-gray-100'
                }`}
              >
                <FaTimes className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'} />
              </button>

              {quickStatus === 'success' ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center"
                  >
                    <FaCheckCircle className="text-3xl text-green-500" />
                  </motion.div>
                  <h3 className={`font-display text-lg font-bold mb-2 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                    Thank You!
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                    We will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className={`font-display text-xl font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                    Quick Inquiry
                  </h3>
                  <form onSubmit={handleQuickSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={quickForm.name}
                      onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                      className={`input-field ${theme === 'dark' ? 'input-field-dark' : 'input-field-light'}`}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={quickForm.phone}
                      onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                      className={`input-field ${theme === 'dark' ? 'input-field-dark' : 'input-field-light'}`}
                      required
                    />
                    <select
                      value={quickForm.service}
                      onChange={(e) => setQuickForm({ ...quickForm, service: e.target.value })}
                      className={`input-field ${theme === 'dark' ? 'input-field-dark' : 'input-field-light'}`}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                    <button type="submit" disabled={quickStatus === 'submitting'} className="btn-brand w-full flex items-center justify-center gap-2">
                      {quickStatus === 'submitting' ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane /> Send
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

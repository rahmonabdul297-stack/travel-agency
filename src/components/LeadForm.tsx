import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaUser, FaPhone, FaEnvelope, FaPaperPlane, FaCheckCircle,
  FaTimes, FaArrowRight,
} from '@/lib/icons';
import { useTheme } from '@/context/ThemeContext';

type ServiceOption = {
  id?: string;
  title: string;
};

type LeadFormProps = {
  services?: ServiceOption[];
  defaultService?: string;
  compact?: boolean;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function LeadForm({ services = [], defaultService = '', compact = false }: LeadFormProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    service: defaultService,
    departure: '',
    destination: '',
    travel_date: '',
    return_date: '',
    message: '',
  });

  const inputCls = `input-field ${theme === 'dark' ? 'input-field-dark' : 'input-field-light'}`;

  // Default services list mapped to translation keys
  const defaultServices = [
    { title: t('footer.links.flight_tickets', 'Flight Tickets') },
    { title: t('footer.links.hotel_reservations', 'Hotel Reservations') },
    { title: t('footer.links.travel_services', 'Travel Services') },
    { title: t('footer.links.umrah_packages', 'Umrah Packages') },
    { title: t('footer.links.student_visas', 'Student Visas') },
  ];

  const availableServices = services.length > 0 ? services : defaultServices;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.phone) {
      setErrorMsg(t('lead_form.required_error', 'Please provide your name and phone number.'));
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const formData = new FormData();
      
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY_HERE';
      formData.append('access_key', accessKey);
      formData.append('subject', `New Lead: ${form.service || 'Travel'} Inquiry from ${form.full_name}`);
      formData.append('from_name', 'Excellent Travel Agency Website');
      
      formData.append('Full Name', form.full_name);
      formData.append('Phone / WhatsApp', form.phone);
      formData.append('Email', form.email || 'Not provided');
      formData.append('Service Interested In', form.service || 'General Inquiry');
      formData.append('Departure', form.departure || 'Not specified');
      formData.append('Destination', form.destination || 'Not specified');
      formData.append('Travel Date', form.travel_date || 'Not specified');
      formData.append('Return Date', form.return_date || 'Not specified');
      formData.append('Message', form.message || 'No additional message');

      if (selectedFile) {
        formData.append('attachment', selectedFile);
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setForm({ full_name: '', phone: '', email: '', service: defaultService, destination: '', travel_date: '', message: '', departure: '', return_date: '' });
        setSelectedFile(null);
      } else {
        setStatus('error');
        setErrorMsg(data.message || t('lead_form.general_error', 'Something went wrong while submitting. Please try again.'));
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('lead_form.general_error', 'Something went wrong. Please try again.'));
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
          {/* Full Name */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              {t('lead_form.full_name_label', 'Full Name')} *
            </label>
            <div className="relative">
              <FaUser className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm rtl:left-auto rtl:right-3 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
              <input
                type="text"
                required
                value={form.full_name}
                onChange={(e) => handleChange('full_name', e.target.value)}
                placeholder={t('lead_form.full_name_placeholder', 'Enter your full name')}
                className={`${inputCls} pl-10 rtl:pl-4 rtl:pr-10`}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              {t('lead_form.phone_label', 'Phone / WhatsApp')} *
            </label>
            <div className="relative">
              <FaPhone className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm rtl:left-auto rtl:right-3 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder={t('lead_form.phone_placeholder', '+93....')}
                className={`${inputCls} pl-10 rtl:pl-4 rtl:pr-10`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              {t('lead_form.email_label', 'Email')}
            </label>
            <div className="relative">
              <FaEnvelope className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm rtl:left-auto rtl:right-3 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder={t('lead_form.email_placeholder', 'Enter your email')}
                className={`${inputCls} pl-10 rtl:pl-4 rtl:pr-10`}
              />
            </div>
          </div>

          {/* Select Service */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              {t('lead_form.service_label', 'Select Service')}
            </label>
            <select
              value={form.service}
              onChange={(e) => handleChange('service', e.target.value)}
              className={`${inputCls} pr-10 rtl:pr-4 rtl:pl-10`}
            >
              <option value="">{t('lead_form.choose_service_placeholder', 'Choose a service...')}</option>
              {availableServices.map((s, idx) => (
                <option key={s.id || idx} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          {/* Departure */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              {t('lead_form.departure_label', 'Departure')}
            </label>
            <input
              type="text"
              value={form.departure}
              onChange={(e) => handleChange('departure', e.target.value)}
              placeholder={t('lead_form.departure_placeholder', 'e.g. From Kabul, Makkah')}
              className={inputCls}
            />
          </div>

          {/* Destination */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              {t('lead_form.destination_label', 'Destination')}
            </label>
            <input
              type="text"
              value={form.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              placeholder={t('lead_form.destination_placeholder', 'e.g. To Beijing, Dubai')}
              className={inputCls}
            />
          </div>

          {/* Travel Date */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              {t('lead_form.travel_date_label', 'Travel Date')}
            </label>
            <input
              type="date"
              value={form.travel_date}
              onChange={(e) => handleChange('travel_date', e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Return Date */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              {t('lead_form.return_date_label', 'Return Date')}
            </label>
            <input
              type="date"
              value={form.return_date}
              onChange={(e) => handleChange('return_date', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
            {t('lead_form.message_label', 'Message')}
          </label>
          <textarea
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={compact ? 3 : 4}
            placeholder={t('lead_form.message_placeholder', 'Tell us about your travel plans...')}
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-brand w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              {t('lead_form.sending', 'Sending...')}
            </>
          ) : (
            <>
              <FaPaperPlane className="rtl:rotate-180" /> {t('lead_form.submit_btn', 'Submit Inquiry')}
            </>
          )}
        </motion.button>

        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 text-center"
          >
            {errorMsg}
          </motion.p>
        )}
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setStatus('idle')}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`relative max-w-md w-full rounded-2xl p-8 text-center ${
                theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setStatus('idle')}
                className={`absolute top-4 right-4 rtl:right-auto rtl:left-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  theme === 'dark' ? 'hover:bg-surface-dark-hover' : 'hover:bg-gray-100'
                }`}
              >
                <FaTimes className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'} />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', damping: 12 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center"
              >
                <FaCheckCircle className="text-4xl text-green-500" />
              </motion.div>

              <h3 className={`font-display text-xl font-bold mb-2 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                {t('lead_form.success_title', 'Inquiry Submitted!')}
              </h3>
              <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                {t('lead_form.success_desc', 'Thank you for reaching out to Excellent Travel Agency. Our team will review your message and get in touch shortly.')}
              </p>

              <button
                onClick={() => setStatus('idle')}
                className="btn-brand inline-flex items-center gap-2"
              >
                {t('lead_form.done_btn', 'Done')} <FaArrowRight className="text-xs rtl:rotate-180" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
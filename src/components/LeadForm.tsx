import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaPhone, FaEnvelope, FaPaperPlane, FaCheckCircle,
  FaFileUpload, FaTimes, FaArrowRight,
} from '@/lib/icons';
import { useTheme } from '@/context/ThemeContext';
import { submitLead } from '@/lib/data';
import type { Service } from '@/lib/supabase';

type LeadFormProps = {
  services?: Service[];
  defaultService?: string;
  compact?: boolean;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function LeadForm({ services = [], defaultService = '', compact = false }: LeadFormProps) {
  const { theme } = useTheme();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    service: defaultService,
    destination: '',
    travel_date: '',
    message: '',
  });

  const inputCls = `input-field ${theme === 'dark' ? 'input-field-dark' : 'input-field-light'}`;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.phone) {
      setErrorMsg('Please provide your name and phone number.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');
    try {
      await submitLead({
        ...form,
        document_url: '',
      });
      setStatus('success');
      setForm({ full_name: '', phone: '', email: '', service: defaultService, destination: '', travel_date: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Full Name *
            </label>
            <div className="relative">
              <FaUser className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => handleChange('full_name', e.target.value)}
                placeholder="John Doe"
                className={`${inputCls} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Phone / WhatsApp *
            </label>
            <div className="relative">
              <FaPhone className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 555 123 4567"
                className={`${inputCls} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Email
            </label>
            <div className="relative">
              <FaEnvelope className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                className={`${inputCls} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Select Service
            </label>
            <select
              value={form.service}
              onChange={(e) => handleChange('service', e.target.value)}
              className={`${inputCls} pr-10`}
            >
              <option value="">Choose a service...</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Destination
            </label>
            <input
              type="text"
              value={form.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              placeholder="e.g. Makkah, Istanbul, Beijing"
              className={inputCls}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Travel Date
            </label>
            <input
              type="date"
              value={form.travel_date}
              onChange={(e) => handleChange('travel_date', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={compact ? 3 : 4}
            placeholder="Tell us about your travel plans..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Document upload (visual only) */}
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
            Document Upload (Optional)
          </label>
          <div className={`border-2 border-dashed rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors ${
            theme === 'dark' ? 'border-border-dark hover:border-brand-red-orange' : 'border-border-light hover:border-brand-red-orange'
          }`}>
            <FaFileUpload className={`text-xl ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
              Click to upload passport, documents, etc.
            </span>
          </div>
        </div>

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
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane /> Submit Inquiry
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

      {/* Success modal */}
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
                className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
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
                Inquiry Submitted!
              </h3>
              <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                Thank you for reaching out to Excellent Travel Agency. Our team will contact you within 24 hours.
              </p>

              <button
                onClick={() => setStatus('idle')}
                className="btn-brand inline-flex items-center gap-2"
              >
                Done <FaArrowRight className="text-xs" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

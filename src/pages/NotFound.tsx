import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHome } from '@/lib/icons';
import { useTheme } from '@/context/ThemeContext';

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-light'}`}>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="relative inline-block mb-8"
        >
          <h1 className="font-display text-8xl lg:text-9xl font-bold brand-text-gradient">
            404
          </h1>
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-brand-glow-lg"
          >
            <FaHome className="text-white text-2xl" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`font-display text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}
        >
          Page Not Found
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-base mb-8 max-w-md mx-auto ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/" className="btn-brand inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

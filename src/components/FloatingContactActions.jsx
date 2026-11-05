import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { company } from '../config/company.js';

export default function FloatingContactActions() {
  return (
    <div className="floating-actions" aria-label="Quick contact options">
      <motion.a
        className="floating-action floating-call"
        href="tel:+919158030333"
        aria-label="Call +91 91580 30333"
        title="Call +91 91580 30333"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      >
        <span className="floating-pulse" aria-hidden="true" />
        <Phone size={21} aria-hidden="true" />
      </motion.a>
      <motion.a
        className="floating-action floating-whatsapp"
        href={company.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.08 }}
      >
        <span className="floating-pulse" aria-hidden="true" />
        <MessageCircle size={22} aria-hidden="true" />
      </motion.a>
    </div>
  );
}

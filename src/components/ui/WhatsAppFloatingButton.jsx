import { useAdmin } from '@/context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function WhatsAppFloatingButton() {
  const { company } = useAdmin();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip briefly after 4 seconds
    const timer = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!company || !company.whatsapp) return null;

  // Clean phone number (digits only)
  const cleanNumber = company.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hello%20${encodeURIComponent(company.name)}!%20I%20visited%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20architectural%20and%20construction%20services.`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex items-center gap-2.5 pointer-events-auto">
      {/* Tooltip Message - desktop and tablet only to prevent mobile content overlap */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:flex bg-[#0B1530]/95 backdrop-blur-md text-[#F5F7FA] text-xs font-medium px-3 py-1.5 rounded-xl shadow-xl border border-slate-700/60 items-center gap-2 max-w-[190px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
            <span className="truncate text-[11px]">Chat on WhatsApp</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white ml-auto text-sm leading-none p-0.5"
              aria-label="Close tooltip"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="w-11 h-11 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-950/40 hover:bg-[#20bd5a] transition-colors duration-200 relative group cursor-pointer"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5.5 h-5.5 sm:w-6 sm:h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 12c0 2.457.683 4.757 1.867 6.72L1.517 22.5l3.89-1.802A10.457 10.457 0 0 0 12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12Zm15.897 3.32c-.274.582-1.077 1.096-1.684 1.2-1.12.193-2.617-.674-4.802-3.158-2.228-2.531-3.21-4.815-3.08-5.96.115-.99.742-1.572 1.348-1.745.183-.053.37-.08.558-.08h.565c.16 0 .348.01.52.4.218.497.744 1.81.808 1.943.064.133.107.288.01.477-.097.19-.144.31-.288.476-.145.166-.305.37-.436.496-.144.138-.295.288-.128.574.167.287.744 1.226 1.597 1.986 1.097.978 2.023 1.282 2.31 1.425.287.144.453.122.62-.066.166-.188.72-.84.91-1.127.189-.288.377-.243.637-.144.26.1.1.808 1.637 1.574.631.31 1.05.51 1.157.687.106.177.106.774-.168 1.356Z"
            clipRule="evenodd"
          />
        </svg>
      </motion.a>
    </div>
  );
}

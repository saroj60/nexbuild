import { motion, animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * StatCounter — animated number with illuminated icon badge, glowing numerals, and micro-bar.
 */
export default function StatCounter({
  value,
  label,
  sublabel,
  icon: Icon,
  light = true,
  index = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // Parse numeric value and suffix (e.g. "150+" -> numeric: 150, suffix: "+")
  const numeric = parseInt(String(value).replace(/\D/g, ''), 10) || 0;
  const suffix = String(value).replace(/\d/g, '') || '+';

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, numeric, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // Smooth cubic bezier
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, numeric]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center relative z-10 w-full"
    >
      {/* Illuminated Floating Icon Container */}
      {Icon && (
        <motion.div
          className="relative mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Ambient Glow behind icon */}
          <div className="absolute -inset-1.5 rounded-2xl bg-blue-500/30 blur-md group-hover:bg-orange-500/30 transition-colors duration-500" />
          
          <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-600/30 to-blue-900/40 backdrop-blur-md border border-blue-400/40 flex items-center justify-center text-white shadow-inner">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-200 group-hover:text-orange-400 transition-colors duration-300" aria-hidden="true" />
          </div>
        </motion.div>
      )}

      {/* Main Counter Numeral with Gradient Text */}
      <div className="flex items-baseline justify-center tracking-tight">
        <span className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
          {display}
        </span>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-orange-400 ml-1 drop-shadow-[0_2px_10px_rgba(251,146,60,0.3)]">
          {suffix}
        </span>
      </div>

      {/* Animated Micro Progress Accent Line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: '36px', opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
        className="h-0.5 bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400 rounded-full my-2.5"
      />

      {/* Label */}
      <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-slate-200 group-hover:text-white transition-colors">
        {label}
      </span>

      {/* Optional Sublabel */}
      {sublabel && (
        <span className="text-[11px] text-slate-400 font-medium mt-1">
          {sublabel}
        </span>
      )}
    </div>
  );
}

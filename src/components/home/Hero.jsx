import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ShieldCheck, Award, Users } from 'lucide-react';

const DEFAULT_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=1920&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
];

export default function Hero() {
  const { company } = useAdmin();
  const heroImages = (company.heroImages && company.heroImages.length > 0)
    ? company.heroImages
    : DEFAULT_HERO_IMAGES;

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950"
      aria-label="Hero section"
    >
      {/* Background Sliding Carousel */}
      <div className="absolute inset-0 z-0 select-none">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIdx}
            src={heroImages[currentIdx]}
            alt="Zeta Construction Projects"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom w-full text-white py-28 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-0.5 bg-orange-400 rounded-full" />
            <span className="text-orange-400 text-xs font-bold uppercase tracking-[0.2em]">
              Construction company in Pokhara, Nepal
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Building Dreams.
            <br />
            <span className="text-orange-400">Creating Landmarks.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base md:text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl"
          >
            {company.name} delivers premium residential and commercial construction
            services across Pokhara and Gandaki Province, Nepal — with integrity,
            craftsmanship, and a commitment to quality that stands the test of time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <Link
              to="/contact"
              className="btn-primary text-base px-7 py-4"
              aria-label="Request a free construction quote"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              to="/projects"
              className="btn-secondary text-base px-7 py-4"
              aria-label="View our construction projects"
            >
              View Our Projects
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-6"
          >
            {[
              { icon: ShieldCheck, text: 'NBC Compliant Construction' },
              { icon: Award, text: '15+ Years of Excellence' },
              { icon: Users, text: '200+ Happy Clients' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-orange-400" aria-hidden="true" />
                <span className="text-sm text-gray-200 font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIdx ? 'bg-orange-500 scale-120' : 'bg-white/40 hover:bg-white/70'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#stats"
        aria-label="Scroll to statistics section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </section>
  );
}

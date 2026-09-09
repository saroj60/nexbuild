import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_HERO_SLIDES = [
  {
    id: 'maitidevi-commercial-building',
    image: '/projects/maitidevi-1.png',
    title: 'MAITIDEVI COMMERCIAL BUILDING',
    location: 'Maitidevi, Kathmandu',
  },
  {
    id: 'radhe-radhe-commercial-building',
    image: '/projects/radhe-radhe-1.png',
    title: 'RADHE RADHE COMMERCIAL BUILDING',
    location: 'Radhe Radhe Chowk, Bhaktapur',
  },
  {
    id: 'tinchuli-commercial-building',
    image: '/projects/tinchuli-1.png',
    title: 'TINCHULI COMMERCIAL BUILDING',
    location: 'Tinchuli, Kathmandu',
  },
  {
    id: 'budhanilkantha-residence',
    image: '/projects/budhanilkantha-1.png',
    title: 'BUDHANILKANTHA RESIDENCE',
    location: 'Budhanilkantha, Kathmandu',
  },
  {
    id: 'chitwan-residence',
    image: '/projects/chitwan-1.png',
    title: 'CHITWAN RESIDENCE',
    location: 'Bharatpur, Chitwan',
  },
  {
    id: 'raniban-neo-classical-residence',
    image: '/projects/raniban-1.png',
    title: 'RANIBAN NEO-CLASSICAL RESIDENCE',
    location: 'Raniban, Kathmandu',
  },
];

export default function Hero() {
  const { company, projects } = useAdmin();

  // Dynamically collect real project hero slides from projects with custom uploaded images
  const customProjectSlides = (projects || [])
    .filter((p) => p.image && !p.image.includes('unsplash.com'))
    .map((p) => ({
      id: p.id,
      image: p.image,
      title: p.title.toUpperCase(),
      location: p.location,
    }));

  const slides = customProjectSlides.length > 0 ? customProjectSlides : DEFAULT_HERO_SLIDES;

  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-advance slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      className="relative min-h-[75vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#050A18] text-[#F5F7FA]"
      aria-label="Hero section"
    >
      {/* Engineers Working on Site - Architectural Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <img
          src={company?.heroBgImage || "/hero-home-construction.jpg"}
          alt="Home Construction Company - Building Construction on Site"
          className="w-full h-full object-cover object-center opacity-65 scale-105 transition-transform duration-1000"
          loading="eager"
        />
        {/* Layered Architectural Gradients for Enhanced Visibility & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050A18]/85 via-[#050A18]/50 to-[#050A18]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A18]/60 via-transparent to-[#050A18]/80" />
      </div>

      {/* Subtle Architectural Blueprint Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_10%,#000_70%,transparent_100%)] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Lighting */}
      <div
        className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#4FD1C5]/10 rounded-full blur-[130px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Vertical Brand Architectural Signature (Desktop Only) */}
      <div
        className="hidden xl:flex absolute left-0 top-0 bottom-0 w-14 border-r border-slate-800/40 flex-col items-center justify-center z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="rotate-270 text-[8.5px] font-semibold uppercase tracking-[0.45em] text-[#AAB4C5]/50 whitespace-nowrap select-none">
          N E X B U I L D &nbsp;&bull;&nbsp; A R C H I T E C T S
        </div>
      </div>

      {/* Main Content Layout Container */}
      <div className="relative z-10 container-custom w-full pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 md:px-8 xl:pl-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-14 items-center">

          {/* Left Column: Headline, Copy, CTAs, Statistics (55% / 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Eyebrow Badge with animated color dot and gradient text */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 xs:px-3.5 xs:py-1.5 rounded-full bg-[#0B1530]/85 border border-[#3B82F6]/35 backdrop-blur-md shadow-sm mb-4 sm:mb-6 w-fit max-w-full group"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 shrink-0 animate-dot-ping" />
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-bold uppercase tracking-[1.5px] xs:tracking-[2px] bg-gradient-to-r from-blue-300 via-cyan-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent animate-gradient-flow whitespace-nowrap truncate">
                ARCHITECTURE &bull; INTERIOR &bull; CONSTRUCTION
              </span>
            </motion.div>

            {/* Main Headline with Smooth Color-Changing Animated Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[35px] xs:text-[42px] sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] 2xl:text-[84px] font-extrabold font-display leading-[1.0] sm:leading-[0.96] tracking-tight mb-4 sm:mb-6 text-[#F5F7FA] drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
            >
              Architecture<br />
              That Defines<br />
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] via-[#6366F1] via-[#EC4899] via-[#F59E0B] via-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent animate-gradient-flow drop-shadow-[0_4px_25px_rgba(59,130,246,0.5)]">
                How You Live.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-[#CBD5E1] font-normal max-w-xl mb-6 sm:mb-8 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            >
              From concept to completion, we create thoughtfully designed residences, interiors, and commercial spaces built around your vision.
            </motion.p>

            {/* CTA Buttons with animated gradient sheen and glowing aura */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-[14px] bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 animate-gradient-btn animate-pulse-glow text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 group text-center border border-white/10"
                aria-label="Start Your Project"
              >
                <span>Start Your Project</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-[14px] bg-[#0B1530]/60 hover:bg-[#0B1530] text-[#F5F7FA] border border-slate-700/80 hover:border-cyan-500/50 font-semibold text-sm sm:text-base transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 text-center hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                aria-label="Explore Our Work"
              >
                Explore Our Work
              </Link>
            </motion.div>

            {/* Clean Statistics Row with Color-Cycling Metric Accent */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-5 sm:pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-2 xs:gap-3 sm:gap-6 items-center max-w-[580px]"
            >
              <div>
                <p className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#F5F7FA] tracking-tight">
                  {company?.stats?.projectsCompleted || '15+'}
                </p>
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#AAB4C5] font-medium tracking-wide mt-0.5 leading-snug">Projects Completed</p>
              </div>
              <div className="border-l border-slate-800/80 pl-2 xs:pl-3 sm:pl-6">
                <p className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#F5F7FA] tracking-tight">
                  {company?.stats?.yearsExperience || '6+'}
                </p>
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#AAB4C5] font-medium tracking-wide mt-0.5 leading-snug">Years Experience</p>
              </div>
              <div className="border-l border-slate-800/80 pl-2 xs:pl-3 sm:pl-6">
                <p className="text-[15px] xs:text-lg sm:text-2xl lg:text-[28px] font-extrabold bg-gradient-to-r from-[#4FD1C5] via-[#3B82F6] via-[#818CF8] via-[#06B6D4] to-[#4FD1C5] bg-clip-text text-transparent animate-gradient-flow tracking-tight whitespace-nowrap">
                  Vastu + NBC
                </p>
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#AAB4C5] font-medium tracking-wide mt-0.5 leading-snug">Compliant Designs</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Architectural Showcase Frame (45% / 5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative mt-6 lg:mt-0"
          >
            {/* Subtle soft backdrop glow */}
            <div
              className="absolute -inset-4 bg-gradient-to-tr from-[#3B82F6]/15 via-[#4FD1C5]/10 to-transparent rounded-[32px] blur-2xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Showcase Container - Responsive height on mobile */}
            <Link
              to={slides[currentIdx]?.id ? `/projects/${slides[currentIdx].id}` : '/projects'}
              className="relative block w-full h-[280px] xs:h-[340px] sm:h-[420px] lg:h-[540px] xl:h-[580px] rounded-[20px] sm:rounded-[26px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(5,10,24,0.7)] bg-[#0B1530] group cursor-pointer"
              aria-label={`View ${slides[currentIdx]?.title || 'project'}`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIdx}
                  src={slides[currentIdx]?.image}
                  alt={`${slides[currentIdx]?.title || 'Nexbuild Architects'} - ${slides[currentIdx]?.location || 'Kathmandu, Nepal'}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </AnimatePresence>

              {/* Subtle Gradient Overlay only where bottom text sits */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#050A18]/90 via-[#050A18]/25 to-transparent pointer-events-none z-10"
                aria-hidden="true"
              />

              {/* Bottom Showcase Overlay Info */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 z-20 flex items-end justify-between gap-3 pointer-events-none">
                {/* Bottom Left: Title & Location */}
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#F5F7FA]">
                    {slides[currentIdx]?.title || 'MODERN RESIDENCE'}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#AAB4C5] tracking-wide mt-0.5">
                    {slides[currentIdx]?.location || 'Kathmandu, Nepal'}
                  </span>
                </div>

                {/* Bottom Right: Slide Counter */}
                <div className="text-[11px] sm:text-sm font-semibold tracking-wider text-[#F5F7FA]/90 bg-[#050A18]/65 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-white/10 shrink-0">
                  {currentIdx + 1 < 10 ? '0' : ''}{currentIdx + 1} / {slides.length < 10 ? '0' : ''}{slides.length}
                </div>
              </div>
            </Link>

            {/* Slider Navigation Dots */}
            <div className="flex justify-center items-center gap-2 mt-4 sm:mt-5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIdx
                      ? 'w-7 bg-[#3B82F6]'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

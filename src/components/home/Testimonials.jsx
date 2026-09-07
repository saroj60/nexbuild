import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useAdmin } from '@/context/AdminContext';
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from '@/utils/youtube';
import { fadeUp, viewportOnce } from '@/utils/animations';

export default function Testimonials() {
  const { testimonials, processVideo } = useAdmin();

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);

  // Testimonials Slider State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide every 2.5 seconds (pauses on mouse hover)
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % testimonials.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [testimonials, isHovered]);

  // Video data resolution
  const videoUrl = processVideo?.youtubeUrl || 'https://www.youtube.com/watch?v=wnuiJNXbfYM';
  const embedUrl = getYouTubeEmbedUrl(videoUrl, true);
  const thumbnailUrl = processVideo?.thumbnail || getYouTubeThumbnailUrl(videoUrl) || '/hero-nepal-construction.jpg';
  const videoTitle = processVideo?.title || 'See How We Build in Kathmandu';
  const videoSubtitle = processVideo?.subtitle || 'From foundation excavation to luxury interior finishing';
  const videoBadge = processVideo?.badge || 'Live On-Site Process';

  const currentTestimonial = (testimonials && testimonials.length > 0)
    ? testimonials[currentIdx]
    : null;

  return (
    <section
      className="section-padding bg-[#f1f5f9] overflow-hidden"
      aria-label="Construction process video and client testimonials"
      id="testimonials"
    >
      <div className="container-custom">
        <SectionHeader
          label="Our Track Record & Client Trust"
          title={<>Real Results. <span className="text-[#3B82F6]">Verified Work.</span></>}
          subtitle="Watch how our engineering teams execute construction projects on site in Kathmandu, and see what our clients say."
          center
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mt-4">

          {/* ============================================================ */}
          {/* LEFT COLUMN: Construction Process Video (Click to Play)      */}
          {/* ============================================================ */}
          <motion.div
            className="lg:col-span-6 flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div className="relative w-full h-[320px] xs:h-[360px] sm:h-[400px] lg:h-full min-h-[340px] rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-sm bg-slate-950 group flex flex-col justify-end">
              {isPlaying && embedUrl ? (
                <div className="relative w-full h-full bg-black">
                  <iframe
                    src={embedUrl}
                    title={videoTitle}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  {/* Close / Return to preview button */}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                    aria-label="Close video player"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-between p-5 sm:p-7"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsPlaying(true); }}
                  aria-label="Play construction process video"
                >
                  {/* Video Thumbnail Background */}
                  <img
                    src={thumbnailUrl}
                    alt={videoTitle}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* High-Contrast Gradient Overlays */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#050A18]/95 via-[#050A18]/50 to-[#050A18]/30 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Top Row: Live Indicator Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#050A18]/80 backdrop-blur-md text-white border border-white/15 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      {videoBadge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-300 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      HD 1080p
                    </span>
                  </div>

                  {/* Center: Pulsing Modern Play Button */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute -inset-3 rounded-full bg-blue-500/25 animate-ping" />
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-all duration-300">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <span className="mt-3 text-xs sm:text-sm font-bold text-white tracking-wider uppercase bg-[#050A18]/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10">
                      Click to Watch Process
                    </span>
                  </div>

                  {/* Bottom: Video Title & Info */}
                  <div className="relative z-10">
                    <h3 className="text-base sm:text-xl font-bold text-white mb-1 drop-shadow-md">
                      {videoTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 drop-shadow">
                      {videoSubtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Testimonials Slider (Auto-slides every 2s)    */}
          {/* ============================================================ */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {currentTestimonial && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 md:p-8 border-2 border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between h-full min-h-[340px] sm:min-h-[380px]">
                {/* Top Subtle Gradient Accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3B82F6] via-blue-500 to-[#4FD1C5]"
                  aria-hidden="true"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial.id || currentIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Card Header: Quote Icon + Rating + Verified Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                            <Quote className="w-5 h-5 fill-blue-600" aria-hidden="true" />
                          </div>
                          <div className="flex gap-1" aria-label={`${currentTestimonial.rating} of 5 stars`}>
                            {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                        </div>

                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified Client
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-sm sm:text-base md:text-[17px] text-slate-700 leading-relaxed font-normal italic mb-6">
                        &ldquo;{currentTestimonial.text}&rdquo;
                      </p>
                    </div>

                    {/* Review Author Profile */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-extrabold shadow-sm flex-shrink-0"
                          style={{
                            backgroundColor: currentIdx % 2 === 0 ? '#1e40af' : '#0284c7'
                          }}
                          aria-hidden="true"
                        >
                          {currentTestimonial.avatar || currentTestimonial.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                            {currentTestimonial.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {currentTestimonial.designation}
                          </p>
                          <p className="text-xs text-blue-600 font-semibold mt-0.5">
                            {currentTestimonial.location}
                          </p>
                        </div>
                      </div>

                      {/* Slide Index Counter */}
                      <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md shrink-0">
                        0{currentIdx + 1} / 0{testimonials.length}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Navigation & Controls */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  {/* Slider Progress Dots */}
                  <div className="flex items-center gap-1.5">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIdx
                            ? 'w-6 bg-blue-600'
                            : 'w-2 bg-slate-200 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Left / Right Chevron Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentIdx((prev) => (prev + 1) % testimonials.length)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import CostCalculator from '@/components/ui/CostCalculator';
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations';
import {
  ArrowLeft, Bed, Bath, Layers, Maximize, CheckCircle, ChevronLeft, ChevronRight, X,
  MessageCircle, Phone, Mail, MapPin, Grid
} from 'lucide-react';

export default function HouseDesignDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { houseDesigns, company } = useAdmin();
  const design = houseDesigns.find((d) => d.id === id);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!design) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Design Plan Not Found</h1>
          <p className="text-gray-500 mb-6">This architectural design doesn't exist or has been removed.</p>
          <Link to="/house-designs" className="btn-primary">← Back to Designs</Link>
        </div>
      </div>
    );
  }

  function normalizeUrl(url) {
    if (!url) return '';
    if (url.startsWith('data:')) return url;
    try {
      const parsed = new URL(url);
      return parsed.origin + parsed.pathname;
    } catch (e) {
      return url.split('?')[0];
    }
  }

  const coverImage = design.image;
  const galleryImages = design.gallery || [];
  const normalizedCover = normalizeUrl(coverImage);
  const uniqueGallery = galleryImages.filter((img) => normalizeUrl(img) !== normalizedCover);
  const allImages = coverImage ? [coverImage, ...uniqueGallery] : galleryImages;

  function openLightbox(i) {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  function prevImage() {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }

  function nextImage() {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }

  // Construct WhatsApp Link
  const rawWhatsApp = company.whatsapp || '9846740399';
  const cleanWhatsApp = rawWhatsApp.replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(
    `Hi ${company.name}, I am interested in your design: "${design.title}" (Style: ${design.style}, Area: ${design.area}). Could you please share more details and estimated construction costs?`
  );
  const waUrl = `https://wa.me/${cleanWhatsApp.startsWith('977') ? cleanWhatsApp : '977' + cleanWhatsApp}?text=${waMessage}`;

  return (
    <>
      <Helmet>
        <title>{design.title} | Architectural House Plan | {company.name}</title>
        <meta
          name="description"
          content={`${design.title} — a ${design.area} ${design.style.toLowerCase()} style residential house design in Nepal with ${design.bedrooms} bedrooms, ${design.bathrooms} bathrooms, and ${design.floors} floors. Complete architectural floor plans & 3D renders by ${company.name}.`}
        />
        <meta
          name="keywords"
          content={`${design.title}, ${design.style} house design Nepal, ${design.bedrooms} bedroom house plan Kathmandu, house floor plan Nepal, 3D house elevation`}
        />
        <link rel="canonical" href={`https://nexbuildarchitects.com.np/house-designs/${design.id}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://nexbuildarchitects.com.np/house-designs/${design.id}`} />
        <meta property="og:title" content={`${design.title} | ${company.name}`} />
        <meta property="og:description" content={`${design.area} ${design.style} architectural house plan with ${design.bedrooms} bedrooms by Nexbuild Architects.`} />
        <meta property="og:image" content={design.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${design.title} | ${company.name}`} />
        <meta name="twitter:description" content={`${design.area} ${design.style} architectural house plan with ${design.bedrooms} bedrooms.`} />
        <meta name="twitter:image" content={design.image} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": design.title,
            "image": design.image,
            "description": design.description,
            "brand": {
              "@type": "Brand",
              "name": company.name
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "NPR",
              "price": design.estimatedCost?.replace(/\D/g, '') || "5000000",
              "availability": "https://schema.org/InStock",
              "url": `https://nexbuildarchitects.com.np/house-designs/${design.id}`
            }
          })}
        </script>
      </Helmet>

      {/* Back navigation */}
      <div className="bg-gray-50 border-b border-gray-100 pt-20">
        <div className="container-custom py-4">
          <button
            onClick={() => navigate('/house-designs')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors font-medium"
            aria-label="Go back to designs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Designs
          </button>
        </div>
      </div>

      {/* Hero Elevation Image */}
      <section aria-label="Design hero image">
        <div className="relative h-64 sm:h-80 md:h-[28rem] overflow-hidden bg-slate-950 flex items-center justify-center">
          {/* Blurred Background to fill spaces */}
          <img
            src={allImages[0]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-md scale-105 opacity-25 pointer-events-none z-0"
          />
          {/* Main uncropped image */}
          <img
            src={allImages[0]}
            alt={`${design.title} — Main 3D Elevation View`}
            className="relative z-10 max-w-full max-h-full object-contain opacity-95"
            loading="eager"
          />
          {/* Gradients and texts */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-6 left-0 right-0 container-custom text-white z-30 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs bg-orange-500 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {design.style} Style
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold mt-2.5">{design.title}</h1>
              <p className="text-gray-300 text-sm md:text-base mt-1.5 font-medium flex items-center gap-2">
                <Grid className="w-4 h-4 text-orange-500" />
                Dimensions: {design.dimensions || 'Custom Fit'}
              </p>
            </div>
            {design.price && (
              <div className="bg-slate-900/80 backdrop-blur-md px-5 py-3 rounded-xl border border-slate-800 text-left self-start md:self-auto">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting Price</p>
                <p className="text-xl md:text-2xl font-black text-blue-400 mt-0.5">Rs. {parseInt(design.price).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="section-padding bg-[#f1f5f9]" aria-label="Design layout specifications">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left columns: Description & gallery plans */}
            <div className="lg:col-span-2 space-y-10">
              {/* Layout Specifications Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                {[
                  { label: 'Built Area', val: design.area, icon: Maximize },
                  { label: 'Floors', val: `${design.floors} Storeys`, icon: Layers },
                  { label: 'Bedrooms', val: `${design.bedrooms} BHK`, icon: Bed },
                  { label: 'Bathrooms', val: `${design.bathrooms} Baths`, icon: Bath },
                ].map(({ label, val, icon: Icon }) => (
                  <div key={label} className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-450 tracking-wider leading-none">{label}</p>
                      <p className="text-sm font-extrabold text-gray-900 mt-1">{val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Design overview */}
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Architectural Concept</h2>
                <p className="text-gray-600 leading-relaxed text-base">{design.description}</p>
              </motion.div>

              {/* Plans Gallery & Lightbox */}
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
                <h2 className="text-xl font-bold text-gray-900 mb-2">3D Renderings & Concepts (Interior & Exterior)</h2>
                <p className="text-xs text-gray-400 mb-4">Click on any rendering below to zoom and inspect 3D details.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {allImages.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => openLightbox(i)}
                      className="group relative h-28 sm:h-36 rounded-xl overflow-hidden border border-gray-150 shadow-sm focus:outline-none bg-gray-50 flex items-center justify-center"
                    >
                      <img
                        src={imgUrl}
                        alt={`Blueprint or render gallery view ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold bg-blue-800/80 px-3 py-1.5 rounded-full">Zoom Plan</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Highlights */}
              {design.features?.length > 0 && (
                <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Design Highlights & Facilities</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                    {design.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right column: CTA Sidebar Card */}
            <div>
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 sticky top-24 shadow-sm">
                <h3 className="font-extrabold text-gray-900 text-lg mb-2">Get Blueprints & 2D Floor Plans</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                  For complete Vastu-compliant 2D floor plans, structural drawings, and map approval blueprints, contact our engineering team directly on WhatsApp.
                </p>

                {design.price && (
                  <div className="bg-white border border-gray-150 rounded-xl p-4 mb-5 shadow-sm">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Starting Price (3D Design)</p>
                    <p className="text-xl font-black text-blue-800 mt-1">Rs. {parseInt(design.price).toLocaleString()}</p>
                  </div>
                )}

                <div className="space-y-4">
                  {/* WhatsApp */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-650 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Direct: {company.phone}</span>
                  </a>
                </div>

                {/* Info List */}
                <div className="mt-6 pt-6 border-t border-gray-200/60 space-y-3.5 text-xs text-gray-600 font-medium">
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="break-all">{company.email}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span>{company.addressShort || 'Kathmandu, Nepal'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Cost Calculator for this Plan */}
          <div className="mt-16">
            <CostCalculator 
              initialArea={parseInt(design.area?.replace(/\D/g, '')) || 2500} 
              initialFloors={design.floors || 2.5} 
            />
          </div>
        </div>
      </section>

      {/* Lightbox Slider (Portal style) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4"
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center text-white py-2">
              <span className="text-sm font-medium">
                {lightboxIndex + 1} / {allImages.length}
              </span>
              <button
                onClick={closeLightbox}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white focus:outline-none transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image View */}
            <div className="flex-1 flex items-center justify-center relative">
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus:outline-none transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus:outline-none transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              <img
                src={allImages[lightboxIndex]}
                alt={`Zoomed plan view ${lightboxIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg border border-white/5 shadow-2xl"
              />
            </div>

            {/* Bottom info bar */}
            <div className="text-center text-gray-400 text-xs py-4">
              {design.title} — Page {lightboxIndex + 1}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

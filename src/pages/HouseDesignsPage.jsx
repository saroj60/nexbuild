import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import SectionHeader from '../components/ui/SectionHeader';
import { staggerContainer, fadeUp, viewportOnce } from '@/utils/animations';
import { Home, Search, SlidersHorizontal, ArrowRight, Bed, Bath, Layers, Maximize } from 'lucide-react';

const STYLES = ['All', 'Modern', 'Minimalist', 'Traditional', 'Contemporary', 'Fusion'];

export default function HouseDesignsPage() {
  const { company, houseDesigns } = useAdmin();
  const [search, setSearch] = useState('');
  const [activeStyle, setActiveStyle] = useState('All');
  const [bedsFilter, setBedsFilter] = useState('All');
  const [floorsFilter, setFloorsFilter] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = houseDesigns.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || 
                          d.style.toLowerCase().includes(search.toLowerCase());
    
    const matchesStyle = activeStyle === 'All' || d.style === activeStyle;
    
    let matchesBeds = true;
    if (bedsFilter !== 'All') {
      const minBeds = parseInt(bedsFilter.replace('+', ''));
      matchesBeds = d.bedrooms >= minBeds;
    }

    let matchesFloors = true;
    if (floorsFilter !== 'All') {
      const targetFloors = parseFloat(floorsFilter);
      matchesFloors = d.floors === targetFloors;
    }

    return matchesSearch && matchesStyle && matchesBeds && matchesFloors;
  });

  return (
    <>
      <Helmet>
        <title>Designs & Plans | {company.name} — Pokhara, Nepal</title>
        <meta
          name="description"
          content={`Browse our collection of modern, traditional, and minimalist designs in Pokhara, Nepal by ${company.name}. Complete architectural floor plans and 3D elevations.`}
        />
        <link rel="canonical" href="https://zetaconstruction.com.np/house-designs" />
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gray-900 text-white"
        aria-label="Designs header"
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="Architectural designs and floor planning Pokhara"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="container-custom relative z-10 text-center max-w-3xl">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-wider bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            Design Catalog
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4 tracking-tight leading-tight">
            Designs & Floor Plans
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Explore our curated catalog of contemporary residential blueprints, elevations, and layout designs optimized for Nepalese land standards and building codes.
          </p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="section-padding bg-gray-50 min-h-screen" aria-label="Catalog search and filters">
        <div className="container-custom">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search designs..."
                className="w-full pl-9 pr-4 py-2 border border-gray-250 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Style filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase">Style:</span>
                <select
                  value={activeStyle}
                  onChange={(e) => setActiveStyle(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-medium text-gray-700 focus:outline-none"
                >
                  {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Bedrooms filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase">Bedrooms:</span>
                <select
                  value={bedsFilter}
                  onChange={(e) => setBedsFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-medium text-gray-700 focus:outline-none"
                >
                  <option value="All">All</option>
                  <option value="3+">3+ Bedrooms</option>
                  <option value="4+">4+ Bedrooms</option>
                  <option value="5+">5+ Bedrooms</option>
                </select>
              </div>

              {/* Floors filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase">Floors:</span>
                <select
                  value={floorsFilter}
                  onChange={(e) => setFloorsFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-medium text-gray-700 focus:outline-none"
                >
                  <option value="All">All</option>
                  <option value="2">2 Storeys</option>
                  <option value="2.5">2.5 Storeys</option>
                  <option value="3">3 Storeys</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-750 font-bold px-4 py-2 rounded-xl text-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-6 space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Style</label>
                    <select
                      value={activeStyle}
                      onChange={(e) => setActiveStyle(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-250 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none"
                    >
                      {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bedrooms</label>
                    <select
                      value={bedsFilter}
                      onChange={(e) => setBedsFilter(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-250 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none"
                    >
                      <option value="All">All</option>
                      <option value="3+">3+ Bedrooms</option>
                      <option value="4+">4+ Bedrooms</option>
                      <option value="5+">5+ Bedrooms</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Floors</label>
                    <select
                      value={floorsFilter}
                      onChange={(e) => setFloorsFilter(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-250 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none"
                    >
                      <option value="All">All</option>
                      <option value="2">2 Storeys</option>
                      <option value="2.5">2.5 Storeys</option>
                      <option value="3">3 Storeys</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((design) => (
              <motion.article
                key={design.id}
                variants={fadeUp}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 group hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {design.style}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-extrabold text-gray-905 text-lg group-hover:text-orange-500 transition-colors line-clamp-1 mb-2">
                      {design.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
                      {design.description}
                    </p>

                    {/* Specs List */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-t border-gray-100 pt-4 mb-5 text-gray-600">
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <Maximize className="w-4 h-4 text-orange-500" />
                        <span>{design.area} Area</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <Layers className="w-4 h-4 text-orange-500" />
                        <span>{design.floors} Floors</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <Bed className="w-4 h-4 text-orange-500" />
                        <span>{design.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <Bath className="w-4 h-4 text-orange-500" />
                        <span>{design.bathrooms} Bathrooms</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/house-designs/${design.id}`}
                    className="flex items-center justify-center gap-2 w-full text-center bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white font-bold py-2.5 rounded-xl text-sm transition-colors duration-300"
                  >
                    <span>View Plan Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xl mx-auto">
              <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">No Designs Found</h3>
              <p className="text-gray-500 text-sm">We couldn't find any house plans matching your filters or search terms. Try clearing your filters or testing other terms.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveStyle('All');
                  setBedsFilter('All');
                  setFloorsFilter('All');
                }}
                className="mt-4 text-xs font-bold bg-blue-800 text-white px-4 py-2.5 rounded-xl hover:bg-blue-900 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Tag, Play, ArrowRight, Search } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { useAdmin } from '@/context/AdminContext';
import { staggerContainer, scaleIn, fadeUp, viewportOnce } from '@/utils/animations';

export default function VlogsPage() {
  const { company, vlogs } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories list
  const categories = ['All', ...new Set(vlogs.map((v) => v.category || 'General'))];

  // Filtering
  const filteredVlogs = vlogs.filter((vlog) => {
    const matchesSearch =
      vlog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vlog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || vlog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Vlog & Articles | {company.name} — Kathmandu, Nepal</title>
        <meta
          name="description"
          content={`Watch our video construction vlogs and read helpful guides from ${company.name} on house construction, architectural designs, building codes, and safety in Nepal.`}
        />
        <meta
          name="keywords"
          content="construction vlogs Nepal, building tips Kathmandu, house design guides, civil engineering videos Nepal, building code compliance, builder blogs Kathmandu"
        />
        <link rel="canonical" href="https://nexbuildarchitects.com.np/vlogs" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexbuildarchitects.com.np/vlogs" />
        <meta property="og:title" content={`Vlog & Articles | ${company.name} — Kathmandu, Nepal`} />
        <meta property="og:description" content={`Watch video construction vlogs and read building guides on designs, permits, and engineering in Nepal by ${company.name}.`} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://nexbuildarchitects.com.np/vlogs" />
        <meta name="twitter:title" content={`Vlog & Articles | ${company.name} — Kathmandu, Nepal`} />
        <meta name="twitter:description" content={`Watch video construction vlogs and read building guides on designs, permits, and engineering in Nepal by ${company.name}.`} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80" />
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gray-900 text-white"
        aria-label="Vlog page header"
      >
        <img
          src="/hero-engineers-site.jpg"
          alt="Kathmandu building construction and engineering site"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> Watch & Learn
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            Construction Vlogs & Articles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-base md:text-lg"
          >
            Educational videos, site walk-throughs, and expert construction advice straight from our engineering team in Kathmandu.
          </motion.p>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <section className="bg-[#f1f5f9] border-b border-gray-200 py-6" aria-label="Search and filter vlogs">
        <div className="container-custom flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search vlogs or articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-250 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-blue-800 text-white border-blue-800 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500'
                }`}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vlog Grid */}
      <section className="section-padding bg-[#f1f5f9]" aria-label="Vlogs grid list">
        <div className="container-custom">
          {filteredVlogs.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
            >
              <AnimatePresence mode="popLayout">
                {filteredVlogs.map((vlog) => (
                  <motion.article
                    key={vlog.id}
                    variants={scaleIn}
                    layout
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden card-shadow group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
                  >
                    {/* Media container */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-150 flex-shrink-0">
                      <img
                        src={vlog.imageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'}
                        alt={vlog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />
                      
                      {/* Play Badge if Video */}
                      {vlog.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 bg-blue-800 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md">
                        {vlog.category || 'General'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {vlog.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {vlog.author}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                          {vlog.title}
                        </h2>

                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                          {vlog.description}
                        </p>
                      </div>

                      <Link
                        to={`/vlogs/${vlog.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-500 hover:text-orange-600 uppercase tracking-wider self-start group/link"
                        aria-label={`Read or watch ${vlog.title}`}
                      >
                        {vlog.videoUrl ? 'Watch Video' : 'Read Article'}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-semibold">No vlogs found</p>
              <p className="text-xs mt-1">Try resetting your search filters.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

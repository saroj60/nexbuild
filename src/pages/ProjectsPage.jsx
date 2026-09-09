import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ui/ProjectCard';
import { useAdmin } from '@/context/AdminContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/utils/animations';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Renovation', 'Ongoing', 'Completed'];

export default function ProjectsPage() {
  const { company, projects } = useAdmin();
  const [active, setActive] = useState('All');

  const filtered = projects.filter((p) => {
    if (active === 'All') return true;
    if (active === 'Ongoing') return p.status === 'Ongoing';
    if (active === 'Completed') return p.status === 'Completed';
    return p.category === active;
  });

  return (
    <>
      <Helmet>
        <title>Portfolio & Completed Projects in Kathmandu | {company.name}</title>
        <meta
          name="description"
          content={`Explore our portfolio of completed and ongoing construction projects in Kathmandu, Nepal by ${company.name} — residential villas, commercial complexes, Maitidevi, Radhe Radhe, Budhanilkantha, Dhapakhel, Chitwan.`}
        />
        <meta
          name="keywords"
          content="construction projects Kathmandu, best builders Nepal, luxury homes Kathmandu, completed buildings Kathmandu, commercial designs Nepal, top 10 construction company, Maitidevi building, Chitwan residence"
        />
        <link rel="canonical" href="https://nexbuildarchitects.com.np/projects" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexbuildarchitects.com.np/projects" />
        <meta property="og:title" content={`Portfolio & Completed Projects in Kathmandu | ${company.name}`} />
        <meta property="og:description" content={`Explore completed and ongoing construction projects in Kathmandu by ${company.name}. See our portfolio of villas, commercial complexes, and residences.`} />
        <meta property="og:image" content="https://nexbuildarchitects.com.np/projects/maitidevi-1.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://nexbuildarchitects.com.np/projects" />
        <meta name="twitter:title" content={`Portfolio & Completed Projects in Kathmandu | ${company.name}`} />
        <meta name="twitter:description" content={`Explore completed and ongoing construction projects in Kathmandu by ${company.name}.`} />
        <meta name="twitter:image" content="https://nexbuildarchitects.com.np/projects/maitidevi-1.png" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Construction Projects Portfolio",
            "itemListElement": (projects || []).map((p, idx) => ({
              "@type": "ListItem",
              "position": idx + 1,
              "item": {
                "@type": "CreativeWork",
                "name": p.title,
                "url": `https://nexbuildarchitects.com.np/projects/${p.id}`,
                "image": p.image,
                "locationCreated": p.location
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gray-900 text-white"
        aria-label="Projects page header"
      >
        <img
          src="/projects-banner-bg.jpg"
          alt="Portfolio of building construction projects in Kathmandu Nepal"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> Project Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            Our Work Speaks for Itself
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-base md:text-lg"
          >
            {company.stats.projectsCompleted} projects completed across Kathmandu and Bagmati Province — homes, commercial buildings, hotels, schools, and more.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding bg-[#f1f5f9]" aria-label="Project portfolio">
        <div className="container-custom">
          {/* Filter Tabs */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
            className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14"
            role="group"
            aria-label="Filter projects by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  active === cat
                    ? 'bg-blue-800 text-white border-blue-800 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500'
                }`}
                aria-pressed={active === cat}
              >
                {cat}
                {cat === 'All' && (
                  <span className="ml-2 text-xs opacity-70">({projects.length})</span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Count indicator */}
          <motion.p
            key={active}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            className="text-sm text-gray-500 mb-6 text-center"
            aria-live="polite"
          >
            Showing <strong className="text-gray-900">{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
            {active !== 'All' && <> in <strong className="text-orange-500">{active}</strong></>}
          </motion.p>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              variants={staggerContainer}
            >
              {filtered.length > 0 ? (
                filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <motion.div
                  variants={fadeUp}
                  className="col-span-full text-center py-16 text-gray-400"
                >
                  <p className="text-lg font-medium">No projects found in this category.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

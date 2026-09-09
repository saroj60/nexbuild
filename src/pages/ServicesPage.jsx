import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { useAdmin } from '@/context/AdminContext';
import { staggerContainer, scaleIn, fadeUp, viewportOnce } from '@/utils/animations';

export default function ServicesPage() {
  const { company, services } = useAdmin();
  return (
    <>
      <Helmet>
        <title>Construction & Architectural Services in Kathmandu | {company.name}</title>
        <meta
          name="description"
          content={`Explore the full range of engineering & construction services offered by ${company.name} in Kathmandu — residential construction, commercial complexes, house designing in Nepal, renovation, and structural auditing.`}
        />
        <meta
          name="keywords"
          content="House designing in Nepal, construction services Kathmandu, building design Nepal, best builder in Kathmandu, renovation contractors Kathmandu, commercial builders Nepal, structural engineering Kathmandu"
        />
        <link rel="canonical" href="https://nexbuildarchitects.com.np/services" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexbuildarchitects.com.np/services" />
        <meta property="og:title" content={`Construction & Architectural Services in Kathmandu | ${company.name}`} />
        <meta property="og:description" content={`Quality residential and commercial construction services, 3D designs, and structural work in Kathmandu, Nepal by ${company.name}.`} />
        <meta property="og:image" content="https://nexbuildarchitects.com.np/projects/budhanilkantha-1.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://nexbuildarchitects.com.np/services" />
        <meta name="twitter:title" content={`Construction & Architectural Services in Kathmandu | ${company.name}`} />
        <meta name="twitter:description" content={`Quality residential and commercial construction services, 3D designs, and structural work in Kathmandu, Nepal by ${company.name}.`} />
        <meta name="twitter:image" content="https://nexbuildarchitects.com.np/projects/budhanilkantha-1.png" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Engineering & Construction Services",
            "itemListElement": (services || []).map((s, idx) => ({
              "@type": "ListItem",
              "position": idx + 1,
              "item": {
                "@type": "Service",
                "name": s.title,
                "description": s.fullDesc || s.shortDesc,
                "provider": {
                  "@type": "Organization",
                  "name": company.name,
                  "url": "https://nexbuildarchitects.com.np"
                },
                "areaServed": "Kathmandu, Nepal"
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gray-900 text-white"
        aria-label="services page header"
      >
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
          alt="Architectural blueprints and design plans"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> Our services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            What We Build & Deliver
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-base md:text-lg"
          >
            Comprehensive construction solutions for residential, commercial, and institutional needs across Kathmandu and Bagmati Province.
          </motion.p>
        </div>
      </section>

      {/* services Grid */}
      <section className="section-padding bg-[#f1f5f9]" aria-label="Full services list">
        <div className="container-custom">
          <SectionHeader
            label="All services"
            title={<>Expert Construction <span className="text-orange-500">services</span> in Kathmandu</>}
            subtitle="From concept to completion, we offer the full spectrum of construction and engineering services you need to build with confidence."
            center
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {services.map((service, i) => {
              const IconComponent = Icons[service.icon] || Icons.Wrench;
              return (
                <motion.article
                  key={service.id}
                  variants={scaleIn}
                  className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl overflow-hidden card-shadow group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-28 xs:h-36 sm:h-52 flex-shrink-0 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {/* Icon Badge */}
                    <div className="absolute bottom-2 left-2 w-8 h-8 sm:bottom-4 sm:left-4 sm:w-12 sm:h-12 bg-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                      <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                    </div>
                    {/* Number */}
                    <span className="absolute top-2 right-2 text-white/50 text-lg sm:top-4 sm:right-4 sm:text-4xl font-extrabold leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-xs sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {service.title}
                      </h2>
                      <p className="text-[10px] sm:text-sm text-gray-600 leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                        {service.fullDesc}
                      </p>

                      {/* Features */}
                      <ul className="hidden sm:block space-y-1.5 mb-5" role="list">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" aria-hidden="true" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-sm font-bold text-orange-500 hover:text-orange-600 group/link"
                      aria-label={`Inquire about ${service.title}`}
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-blue-800 py-14" aria-label="Service inquiry CTA">
        <div className="container-custom text-center text-white">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-blue-200 mb-7 max-w-lg mx-auto">
              Our team will assess your project requirements and recommend the right services. Book a free consultation today.
            </p>
            <Link to="/contact" className="btn-primary" aria-label="Book a free consultation">
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

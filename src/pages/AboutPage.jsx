import { useAdmin } from '@/context/AdminContext';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle, Target, Eye, Heart, ArrowRight, Award, Users, Building2, Clock, Image as ImageIcon,
  GraduationCap, MapPin, Phone, MessageCircle, ShieldCheck
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import StatCounter from '../components/ui/StatCounter';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '@/utils/animations';

const values = [
  { icon: Award, title: 'Integrity', desc: 'We do what we say. Honest communication and transparent pricing are non-negotiable at every stage.' },
  { icon: CheckCircle, title: 'Quality', desc: 'We use only certified, high-grade materials and industry-best construction practices on every project.' },
  { icon: Clock, title: 'Punctuality', desc: 'Your time matters. We maintain strict project schedules and have a 95% on-time delivery record.' },
  { icon: Heart, title: 'Client-First', desc: 'Every decision we make is guided by our clients\' satisfaction, comfort, and long-term benefit.' },
];

const trustPoints = [
  'Licensed by Nepal Engineers Association (NEA)',
  'Full compliance with Nepal National Building Code (NBC)',
  'Earthquake-resistant construction for seismic Zone V',
  'Transparent pricing with detailed Bill of Quantities',
  'Dedicated project manager for every client',
  'Post-completion warranty and support',
  '100% locally owned and operated in Kathmandu',
  'Clean safety record across all project sites',
];

export default function AboutPage() {
  const { company, team } = useAdmin();

  const stats = [
    { value: company.stats.projectsCompleted, label: 'Projects Completed', icon: Building2 },
    { value: company.stats.yearsExperience, label: 'Years of Experience', icon: Clock },
    { value: company.stats.happyClients, label: 'Happy Clients', icon: Users },
    { value: company.stats.professionals, label: 'Professionals', icon: Award },
  ];
  return (
    <>
      <Helmet>
        <title>About Us | {company.name} — Kathmandu, Nepal</title>
        <meta
          name="description"
          content={`Learn about ${company.name} — a trusted construction company in Kathmandu, Nepal founded in ${company.foundedYear}. Meet our team of engineers and architects delivering structural excellence across Bagmati Province.`}
        />
        <meta
          name="keywords"
          content="Best construction company in Kathmandu, Top construction company in Nepal, builder in Nepal, structural engineers Kathmandu, architectural design Kathmandu, construction contractors Nepal"
        />
        <link rel="canonical" href="https://nexbuildarchitects.com.np/about" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexbuildarchitects.com.np/about" />
        <meta property="og:title" content={`About Us | ${company.name} — Kathmandu, Nepal`} />
        <meta property="og:description" content={`Learn about ${company.name} — a trusted construction company in Kathmandu, Nepal founded in ${company.foundedYear}. Meet our team of engineers and architects.`} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://nexbuildarchitects.com.np/about" />
        <meta name="twitter:title" content={`About Us | ${company.name} — Kathmandu, Nepal`} />
        <meta name="twitter:description" content={`Learn about ${company.name} — a trusted construction company in Kathmandu, Nepal founded in ${company.foundedYear}.`} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80" />
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gray-900 text-white overflow-hidden"
        aria-label="About page header"
      >
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80"
          alt="Construction team at work on a building project in Nepal"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            Who We Are
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-base md:text-lg"
          >
            Building trust, landmark structures, and lasting relationships across Kathmandu since {company.foundedYear}.
          </motion.p>
        </div>
      </section>

      {/* company Introduction */}
      <section className="section-padding bg-[#f1f5f9]" aria-label="company introduction">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Placeholder Section */}
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}>
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200/90 rounded-2xl border-2 border-dashed border-slate-300 shadow-sm flex flex-col items-center justify-center p-8 h-80 md:h-96 text-center group overflow-hidden">
                
                {/* Blueprint Grid Pattern */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b818_1px,transparent_1px),linear-gradient(to_bottom,#94a3b818_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/90 border border-slate-200 shadow-sm flex items-center justify-center mb-4 text-slate-400 group-hover:text-blue-600 group-hover:scale-105 transition-all duration-300">
                    <ImageIcon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Image Placeholder
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Company visual / official photo placeholder
                  </p>
                </div>

                {/* Founded Badge */}
                <div className="absolute -bottom-5 -left-5 bg-blue-800 text-white rounded-xl p-5 shadow-xl hidden md:block border-2 border-white z-20">
                  <span className="text-3xl font-extrabold block">{company.foundedYear}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide">Founded in<br />Kathmandu</span>
                </div>
              </div>
            </motion.div>

            {/* Story Content */}
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}>
              <SectionHeader label="Company Profile" title={<>Engineering & Construction <span className="text-orange-500">Excellence in Nepal</span></>} />
              <p className="font-bold text-gray-900 text-lg mb-3">
                {company.legalName || 'Nexbuild Architects And Construction Pvt. Ltd.'}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {company.description || `${company.legalName} is a Nepal-based engineering and construction company. The company delivers building construction, infrastructure development, land development, and technical consulting services for public and private sector clients.`}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Operating from our registered head office in Kathmandu, we maintain professional coordination with affiliated entities in Chitwan and Pokhara for the seamless execution of regional engineering and construction projects across Nepal.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded-r-xl">
                <p className="text-xs font-bold uppercase text-blue-900 tracking-wider mb-1">Regional Operations & Coordination</p>
                <p className="text-sm text-blue-800 font-medium">Registered Head Office: Babarmahal, Rajesh Marg, Kathmandu | Affiliated Operations: Chitwan & Pokhara</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-[#f1f5f9]" aria-label="Mission and vision">
        <div className="container-custom">
          <SectionHeader label="Our Direction" title={<>Mission, <span className="text-orange-500">Vision</span> & Core Competencies</>} center />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Mission */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}
              className="bg-blue-800 text-white rounded-2xl p-8 shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">1.1 Our Mission</h3>
              </div>
              <p className="text-blue-100 leading-relaxed text-base">
                "{company.mission || 'To provide reliable, high-quality engineering and construction services that meet client specifications, comply with regulatory standards, and promote sustainable development.'}"
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}
              className="bg-orange-500 text-white rounded-2xl p-8 shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">1.1 Our Vision</h3>
              </div>
              <p className="text-orange-50 leading-relaxed text-base">
                "{company.vision || 'To be recognized as the leading engineering and construction firm in Nepal, delivering projects that exemplify technical excellence and integrity.'}"
              </p>
            </motion.div>
          </div>

          {/* Core Competencies */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-14">
            <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-orange-500 rounded-full inline-block" />
              1.2 Core Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(company.coreCompetencies || [
                'Design-Build execution for residential, commercial, and infrastructure projects',
                'Structural design, civil works, and architectural coordination',
                'Land development, site planning, and drainage network implementation',
                'Project management, scheduling, and cost control',
                'Technical consulting and feasibility studies'
              ]).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
          >
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="bg-white rounded-xl p-6 card-shadow text-center group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                    <IconComp className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-[#050D24] text-white border-y border-blue-500/20 shadow-2xl" aria-label="company statistics">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-orange-500/15 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
          >
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                variants={{ hidden: { opacity: 0, y: 35, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } } }}
                className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-blue-400/50 rounded-2xl p-5 sm:p-7 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(30,64,175,0.35)] flex flex-col items-center justify-center relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                <StatCounter value={s.value} label={s.label} icon={s.icon} index={idx} light />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team & Key Leadership */}
      <section className="section-padding bg-[#f1f5f9]" aria-label="Our key leadership team">
        <div className="container-custom">
          <SectionHeader
            label="Key Leadership"
            title={<>Key <span className="text-orange-500">Personnel</span> & Leadership</>}
            subtitle="Meet the key engineering professionals and leaders guiding Nexbuild Architects And Construction Pvt. Ltd."
            center
          />

          {/* Featured Key Persons Profiles - Er. Karun Pandey & Er. Rajesh Yadav */}
          <div className="space-y-8 mb-12">
            {/* Er. Karun Pandey Card */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-600/15 to-transparent rounded-bl-full pointer-events-none" />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Photo Column */}
                <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center text-center">
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-md border-4 border-white ring-2 ring-blue-800/20 mb-4 bg-gray-100">
                    <img
                      src="/karun-pandey.png"
                      alt="Er. Karun Pandey - Executive Civil Engineer"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-blue-900/90 text-white text-[11px] font-bold py-1 px-2 rounded-md backdrop-blur-xs">
                      Managing Director
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5" /> Licensed Civil Engineer
                  </span>
                </div>

                {/* Details Column */}
                <div className="md:col-span-8 lg:col-span-9 space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Er. Karun Pandey</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-md">
                        TU 2073 B.S.
                      </span>
                    </div>
                    <p className="text-orange-500 font-bold text-base sm:text-lg">
                      Executive Civil Engineer & Managing Director
                    </p>
                  </div>

                  {/* Key Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <GraduationCap className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Education</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                          Bachelor’s Degree in Civil Engineering, TU (2073 B.S.)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <Phone className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Mobile Contact</p>
                        <a href="tel:9843604439" className="text-xs sm:text-sm font-bold text-blue-800 hover:underline">
                          +977 9843604439
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <MapPin className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Permanent Address</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                          Kakani-07, Nuwakot, Nepal
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Temporary Address</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                          Tarkeshwor-07, Kathmandu, Nepal
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="tel:9843604439"
                      className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                    >
                      <Phone className="w-4 h-4" />
                      Call Er. Karun Pandey
                    </a>
                    <a
                      href="https://wa.me/9779843604439"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Er. Rajesh Yadav Card */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-400/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Photo Column */}
                <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center text-center">
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-md border-4 border-white ring-2 ring-orange-500/20 mb-4 bg-gray-100">
                    <img
                      src="/rajesh-yadav.png"
                      alt="Er. Rajesh Yadav - Chief Structural Engineer"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-orange-600/90 text-white text-[11px] font-bold py-1 px-2 rounded-md backdrop-blur-xs">
                      Technical Director
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-orange-50 text-orange-600 font-bold px-3 py-1 rounded-full border border-orange-200">
                    <ShieldCheck className="w-3.5 h-3.5" /> M.E. Structural Engineer
                  </span>
                </div>

                {/* Details Column */}
                <div className="md:col-span-8 lg:col-span-9 space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Er. Rajesh Yadav</h3>
                      <span className="text-xs bg-orange-100 text-orange-800 font-extrabold px-2.5 py-0.5 rounded-md">
                        M.E. Structural (TU 2079 B.S.)
                      </span>
                    </div>
                    <p className="text-orange-500 font-bold text-base sm:text-lg">
                      Chief Structural Engineer & Technical Director
                    </p>
                  </div>

                  {/* Key Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 sm:col-span-2">
                      <GraduationCap className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Education & Degrees</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed">
                          • Master’s Degree in Structural Engineering, TU (2079 B.S.)<br />
                          • Bachelor’s Degree in Civil Engineering, TU (2072 B.S.)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <Phone className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Mobile Contact</p>
                        <a href="tel:9843456230" className="text-xs sm:text-sm font-bold text-blue-800 hover:underline">
                          +977 9843456230
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <MapPin className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Permanent Address</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                          Gadhimai-04, Rautahat, Nepal
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 sm:col-span-2">
                      <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Temporary Address</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                          Tikathali, Kathmandu, Nepal
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="tel:9843456230"
                      className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                    >
                      <Phone className="w-4 h-4" />
                      Call Er. Rajesh Yadav
                    </a>
                    <a
                      href="https://wa.me/9779843456230"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Other Leadership Team Members */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
          >
            {team.filter(m => !m.featuredKeyPerson).map((member) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                className="bg-white rounded-xl p-6 text-center card-shadow hover:-translate-y-1 transition-transform duration-300 border border-gray-100"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-4 shadow border border-gray-200"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-extrabold mx-auto mb-4 shadow"
                    style={{ backgroundColor: member.color }}
                    aria-hidden="true"
                  >
                    {member.avatar}
                  </div>
                )}
                <h3 className="font-bold text-gray-900 text-sm mb-1">{member.name}</h3>
                <p className="text-orange-500 text-xs font-semibold mb-1">{member.designation}</p>
                <p className="text-gray-500 text-xs mb-1">{member.qualification}</p>
                <p className="text-blue-700 text-xs font-bold">{member.experience} Experience</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Clients Trust Us */}
      <section className="section-padding bg-[#f1f5f9]" aria-label="Why clients trust us">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}>
              <SectionHeader label="Client Trust" title={<>Why Clients <span className="text-orange-500">Trust Us</span></>} />
              <ul className="space-y-3" role="list">
                {trustPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700 text-sm font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact" className="btn-primary" aria-label="Get a free construction consultation">
                  Get a Free Consultation
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Nexbuild Architects team reviewing building plans on a construction site"
                className="w-full rounded-2xl object-cover h-80 md:h-96"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

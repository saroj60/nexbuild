import { useAdmin } from '@/context/AdminContext';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle, Target, Eye, Heart, ArrowRight, Award, Users, Building2, Clock,
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
  '100% locally owned and operated in Pokhara',
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
        <title>About Us | {company.name} — Pokhara, Nepal</title>
        <meta
          name="description"
          content={`Learn about ${company.name} — a trusted construction company in Pokhara, Nepal founded in ${company.foundedYear}. Meet our team of engineers and architects delivering structural excellence across Gandaki Province.`}
        />
        <meta
          name="keywords"
          content="Best construction company in Pokhara, Top construction company in Nepal, builder in Nepal, structural engineers Pokhara, architectural design Kaski, construction contractors Nepal"
        />
        <link rel="canonical" href="https://zetaconstruction.com.np/about" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zetaconstruction.com.np/about" />
        <meta property="og:title" content={`About Us | ${company.name} — Pokhara, Nepal`} />
        <meta property="og:description" content={`Learn about ${company.name} — a trusted construction company in Pokhara, Nepal founded in ${company.foundedYear}. Meet our team of engineers and architects.`} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://zetaconstruction.com.np/about" />
        <meta name="twitter:title" content={`About Us | ${company.name} — Pokhara, Nepal`} />
        <meta name="twitter:description" content={`Learn about ${company.name} — a trusted construction company in Pokhara, Nepal founded in ${company.foundedYear}.`} />
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
            Building trust, landmark structures, and lasting relationships across Pokhara since {company.foundedYear}.
          </motion.p>
        </div>
      </section>

      {/* company Introduction */}
      <section className="section-padding bg-white" aria-label="company introduction">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Construction site with Zeta Construction workers building a structure in Pokhara"
                  className="w-full rounded-2xl object-cover h-80 md:h-96"
                  loading="lazy"
                />
                <div className="absolute -bottom-5 -left-5 bg-orange-500 text-white rounded-xl p-5 shadow-xl hidden md:block">
                  <span className="text-3xl font-extrabold block">{company.foundedYear}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide">Founded in<br />Pokhara</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}>
              <SectionHeader label="Our Story" title={<>From Humble Beginnings to <span className="text-orange-500">Pokhara's Best</span></>} />
              <p className="text-gray-600 leading-relaxed mb-4">
                {company.name} was founded in {company.foundedYear} by a group of licensed civil engineers who shared a
                common belief: that quality construction should be accessible, transparent, and honest.
                Starting with small residential projects in the Kaski District, we grew steadily through
                referrals, repeat clients, and a reputation for never cutting corners.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Today, we are one of Pokhara's most trusted construction companies — with a portfolio of
                over 250 completed projects spanning luxury villas, commercial complexes, hotels, schools,
                and government buildings across Gandaki Province.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team of 80+ professionals — engineers, architects, site supervisors, and skilled
                tradespeople — is united by a culture of excellence, accountability, and pride in our work.
                Every structure we build is a testament to Pokhara's growth and our commitment to raising
                construction standards in Nepal.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50" aria-label="Mission and vision">
        <div className="container-custom">
          <SectionHeader label="Our Direction" title={<>Mission, <span className="text-orange-500">Vision</span> & Values</>} center />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {/* Mission */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}
              className="bg-blue-800 text-white rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">Our Mission</h3>
              </div>
              <p className="text-blue-100 leading-relaxed">
                To deliver premium, earthquake-resistant, and aesthetically excellent construction
                services to the people of Pokhara and Nepal — with full transparency, timely
                completion, and unwavering commitment to client satisfaction.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}
              className="bg-orange-500 text-white rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">Our Vision</h3>
              </div>
              <p className="text-orange-50 leading-relaxed">
                To be the most trusted and respected construction company in Nepal — known for
                transforming dreams into landmarks, raising industry standards, and contributing
                to the sustainable development of Pokhara and Gandaki Province.
              </p>
            </motion.div>
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
      <section className="bg-blue-900 py-16" aria-label="company statistics">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                <StatCounter value={s.value} label={s.label} icon={s.icon} light />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white" aria-label="Our professional team">
        <div className="container-custom">
          <SectionHeader label="Our Team" title={<>The <span className="text-orange-500">People</span> Behind Every Project</>} subtitle="Our leadership team brings decades of combined experience in civil engineering, architecture, and construction management." center />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}
          >
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                className="bg-gray-50 rounded-xl p-6 text-center card-shadow hover:-translate-y-1 transition-transform duration-300"
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
      <section className="section-padding bg-gray-50" aria-label="Why clients trust us">
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
                alt="Zeta Construction team reviewing building plans on a construction site"
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

import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { fadeUp, fadeLeft, fadeRight, viewportOnce } from '@/utils/animations';

const highlights = [
  'Licensed & NBC-compliant construction',
  '15+ years serving Pokhara & Gandaki Province',
  'In-house architects and structural engineers',
  'Transparent pricing with detailed BOQ',
  'Timely project delivery with quality assurance',
  'Post-construction support & warranty',
];

export default function AboutPreview() {
  const { company } = useAdmin();
  return (
    <section
      className="section-padding bg-white"
      aria-label="About company preview"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images Grid */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeLeft}
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80"
                alt="Architect reviewing construction blueprints"
                className="rounded-xl object-cover h-56 w-full"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80"
                alt="Construction workers at work on a building site in Nepal"
                className="rounded-xl object-cover h-56 w-full mt-8"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1621293954908-907159247fc8?w=600&q=80"
                alt="Modern completed building construction project"
                className="rounded-xl object-cover h-44 w-full"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
                alt="Luxury residential home completed by Zeta Construction"
                className="rounded-xl object-cover h-44 w-full -mt-8"
                loading="lazy"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white rounded-xl p-5 shadow-xl text-center hidden md:block">
              <span className="text-3xl font-extrabold block">{company.stats.yearsExperience}</span>
              <span className="text-xs font-semibold uppercase tracking-wide">Years of<br />Excellence</span>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeRight}
          >
            <SectionHeader
              label="About Us"
              title={`Pokhara's Most Trusted Construction Partner`}
            />
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in {company.foundedYear}, {company.name} is widely recognized as the <strong>best construction company in Pokhara</strong> and a <strong>top construction company in Nepal</strong>. We specialize in custom <strong>house designing in Nepal</strong>, residential villas, and commercial complexes.
            </p>
            <p className="text-gray-600 leading-relaxed mb-7">
              As a premier <strong>builder in Nepal</strong> and a respected <strong>construction company in Pokhara</strong>, we ensure compliance with Nepal National Building Code standards. Our position as a trusted <strong>top 10 construction company</strong> and the <strong>best concern construction company</strong> in the Gandaki region is backed by a solid team of engineers and architects.
            </p>

            <ul className="space-y-2.5 mb-8" role="list" aria-label="company highlights">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/about" className="btn-outline" aria-label="Learn more about our company">
              Learn More About Us
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

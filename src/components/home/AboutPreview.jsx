import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { fadeLeft, fadeRight, viewportOnce } from '@/utils/animations';

const highlights = [
  'Licensed & NBC-compliant construction',
  'Experienced engineering team',
  'In-house architects & structural engineers',
  'Transparent pricing & detailed BOQ',
  'Timely project delivery',
];

export default function AboutPreview() {
  const { company, projects } = useAdmin();

  // Dynamically select 4 real project images from projects list
  const realProjectImages = (projects || [])
    .filter((p) => p.image && !p.image.includes('unsplash.com'))
    .map((p) => ({ image: p.image, title: p.title }));

  const gridImages = realProjectImages.length >= 4
    ? realProjectImages.slice(0, 4)
    : [
        { image: '/projects/raniban-1.png', title: 'Raniban Neo-Classical Residence' },
        { image: '/projects/chitwan-1.png', title: 'Chitwan Residence' },
        { image: '/projects/maitidevi-1.png', title: 'Maitidevi Commercial Building' },
        { image: '/projects/budhanilkantha-1.png', title: 'Budhanilkantha Residence' },
      ];

  return (
    <section
      className="py-10 md:py-14 bg-[#f1f5f9] text-slate-900"
      aria-label="About company preview"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Symmetric 2x2 Image Grid */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeLeft}
          >
            <div className="grid grid-cols-2 gap-4">
              {gridImages.map((imgItem, idx) => (
                <img
                  key={idx}
                  src={imgItem.image}
                  alt={imgItem.title}
                  className="rounded-lg object-cover h-36 sm:h-48 md:h-52 w-full shadow-sm hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              ))}
            </div>

            {/* Subtle Floating Badge */}
            <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white rounded-lg px-3 py-1.5 shadow-md flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {company.stats.yearsExperience} of Excellence
              </span>
            </div>
          </motion.div>

          {/* Right Side: Concise Company Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeRight}
            className="flex flex-col justify-center"
          >
            {/* Header */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Kathmandu’s Trusted Construction Partner
            </h2>
            <div className="w-12 h-1 bg-blue-800 rounded-full mt-3 mb-6" />

            {/* Description */}
            <p className="text-slate-650 text-sm md:text-base leading-relaxed mb-4">
              {company.description || `At ${company.name}, we combine visionary design with solid engineering to build residential villas and commercial spaces that stand the test of time. As Kathmandu’s trusted partner, we manage projects from initial concept through municipal map approval to final construction.`}
            </p>
            <p className="text-slate-650 text-sm md:text-base leading-relaxed mb-6">
              Our integrated team of architects, structural engineers, and project managers ensures a seamless and transparent build process. We focus on Vastu-compliant layouts, earthquake-resistant frames, and premium finishes tailored to your exact budget.
            </p>

            {/* Key Benefits Checklist */}
            <ul className="space-y-3 mb-8" role="list" aria-label="Key highlights">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-800 flex-shrink-0" aria-hidden="true" />
                  <span className="text-slate-750 text-sm md:text-base font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Learn More Button */}
            <div>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-blue-800 hover:text-blue-900 font-bold text-sm tracking-wide transition-colors group"
                aria-label="Learn more about our company"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

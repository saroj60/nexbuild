import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useAdmin } from '@/context/AdminContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/utils/animations';

export default function WhyChooseUs() {
  const { whyChooseUs } = useAdmin();
  return (
    <section
      className="section-padding bg-[#f1f5f9]"
      aria-label="Why choose Nexbuild Architects"
    >
      <div className="container-custom">
        <SectionHeader
          label="Why Choose Us"
          title={<>The <span className="text-orange-500">Nexbuild Advantage</span></>}
          subtitle="We don't just build structures — we build lasting relationships based on trust, transparency, and excellence in every project."
          center
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {whyChooseUs.map((item, i) => {
            const IconComponent = Icons[item.icon] || Icons.Star;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors duration-200">
                  <IconComponent
                    className="w-4.5 h-4.5 text-blue-700 group-hover:text-white transition-colors duration-200"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

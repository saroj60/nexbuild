import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useAdmin } from '@/context/AdminContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/utils/animations';

export default function WhyChooseUs() {
  const { whyChooseUs } = useAdmin();
  return (
    <section
      className="section-padding bg-gray-50"
      aria-label="Why choose Zeta Construction"
    >
      <div className="container-custom">
        <SectionHeader
          label="Why Choose Us"
          title={<>The <span className="text-orange-500">Zeta Advantage</span></>}
          subtitle="We don't just build structures — we build lasting relationships based on trust, transparency, and excellence in every project."
          center
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
                className="bg-white rounded-xl p-6 card-shadow hover:card-shadow-hover transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                  <IconComponent
                    className="w-6 h-6 text-blue-700 group-hover:text-white transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import TestimonialCard from '../ui/TestimonialCard';
import { useAdmin } from '@/context/AdminContext';
import { staggerContainer, viewportOnce } from '@/utils/animations';

export default function Testimonials() {
  const { testimonials } = useAdmin();
  return (
    <section
      className="section-padding bg-gray-50"
      aria-label="Client testimonials"
    >
      <div className="container-custom">
        <SectionHeader
          label="Testimonials"
          title={<>What Our <span className="text-orange-500">Clients Say</span></>}
          subtitle="Real feedback from homeowners, businesses, and institutions we've built for across Pokhara and Kaski District."
          center
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

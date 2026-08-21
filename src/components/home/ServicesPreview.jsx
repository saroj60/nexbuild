import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ServiceCard from '../ui/ServiceCard';
import { useAdmin } from '@/context/AdminContext';
import { staggerContainer, viewportOnce } from '@/utils/animations';

export default function ServicesPreview() {
  const { services } = useAdmin();
  return (
    <section
      className="section-padding bg-gray-50"
      aria-label="Our construction services"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <SectionHeader
            label="Our Services"
            title={<>What We <span className="text-orange-500">Build & Deliver</span></>}
            subtitle="From custom homes to large commercial complexes, we provide comprehensive construction services across Pokhara and Gandaki Province."
          />
          <Link
            to="/services"
            className="btn-outline flex-shrink-0 self-start md:self-end mb-0 md:mb-2"
            aria-label="View all construction services"
          >
            All Services
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {services.slice(0, 4).map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

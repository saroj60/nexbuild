import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import { useAdmin } from '@/context/AdminContext';
import { staggerContainer, viewportOnce } from '@/utils/animations';

export default function FeaturedProjects() {
  const { projects } = useAdmin();
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section
      className="section-padding bg-[#f1f5f9]"
      aria-label="Featured construction projects"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6 md:mb-8">
          <SectionHeader
            label="Featured Projects"
            title={<>Our Recent <span className="text-orange-500">Landmark Work</span></>}
            subtitle="A selection of residential, commercial, and renovation projects we've proudly completed across Kathmandu and surrounding areas."
          />
          <Link
            to="/projects"
            className="btn-outline flex-shrink-0 self-start md:self-end mb-0 md:mb-2"
            aria-label="View all construction projects"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

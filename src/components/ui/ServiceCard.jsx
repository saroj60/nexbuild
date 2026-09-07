import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { scaleIn } from '@/utils/animations';

export default function ServiceCard({ service, index }) {
  const { services } = useAdmin();
  const IconComponent = Icons[service.icon] || Icons.Wrench;

  return (
    <motion.article
      variants={scaleIn}
      custom={index}
      className="bg-white rounded-xl overflow-hidden card-shadow group flex flex-col h-full"
      whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.25 }}
    >
      {/* Image */}
      <div className="relative h-28 xs:h-36 sm:h-44 flex-shrink-0 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-blue-900/50" />
        {/* Icon overlay */}
        <div className="absolute top-2 left-2 w-8 h-8 sm:top-4 sm:left-4 sm:w-11 sm:h-11 bg-orange-500 rounded-md sm:rounded-lg flex items-center justify-center shadow-lg">
          <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xs sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-700 transition-colors line-clamp-1">
            {service.title}
          </h3>
          <p className="text-[10px] sm:text-sm text-gray-600 leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
            {service.shortDesc}
          </p>

          {/* Feature tags */}
          <div className="hidden sm:flex flex-wrap gap-1.5 mb-5">
            {service.features.map((f) => (
              <span
                key={f}
                className="text-xs bg-blue-50 text-blue-700 font-medium px-2.5 py-0.5 rounded-full"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/services"
          className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-sm font-bold text-orange-500 hover:text-orange-600 group/link"
          aria-label={`Learn more about ${service.title}`}
        >
          <span>Learn More</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

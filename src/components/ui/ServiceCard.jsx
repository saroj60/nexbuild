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
      <div className="relative h-44 flex-shrink-0 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-blue-900/50" />
        {/* Icon overlay */}
        <div className="absolute top-4 left-4 w-11 h-11 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg">
          <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-1">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {service.shortDesc}
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
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
          className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 group/link"
          aria-label={`Learn more about ${service.title}`}
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

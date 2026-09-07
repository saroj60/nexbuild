import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Tag, CheckCircle, Clock } from 'lucide-react';
import { scaleIn } from '@/utils/animations';

const statusColors = {
  Completed: 'bg-green-100 text-green-700',
  Ongoing: 'bg-blue-100 text-blue-700',
  Upcoming: 'bg-yellow-100 text-yellow-700',
};

const statusIcons = {
  Completed: CheckCircle,
  Ongoing: Clock,
};

export default function ProjectCard({ project }) {
  const StatusIcon = statusIcons[project.status] || CheckCircle;

  return (
    <motion.article
      variants={scaleIn}
      className="bg-white rounded-xl overflow-hidden card-shadow group cursor-pointer flex flex-col h-full"
      whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.25 }}
    >
      <Link to={`/projects/${project.id}`} className="flex flex-col h-full" aria-label={`View ${project.title} project details`}>
        {/* Image */}
        <div className="relative overflow-hidden h-32 xs:h-40 sm:h-52 md:h-60 flex-shrink-0">
          <img
            src={project.image}
            alt={`${project.title} - ${project.category} project in ${project.location}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Status Badge */}
          <span
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] xs:text-[10px] sm:text-xs font-semibold ${statusColors[project.status] || statusColors.Completed}`}
          >
            <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" />
            <span className="truncate max-w-[60px] xs:max-w-none">{project.status}</span>
          </span>

          {/* Category */}
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-blue-800 text-white text-[9px] xs:text-[10px] sm:text-xs font-semibold">
            <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" />
            <span className="truncate max-w-[60px] xs:max-w-none">{project.category}</span>
          </span>
        </div>

        {/* Content */}
        <div className="p-2.5 sm:p-5 flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-bold text-gray-900 text-xs sm:text-base mb-1 sm:mb-2 group-hover:text-blue-700 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-sm mb-2 sm:mb-3">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500 flex-shrink-0" aria-hidden="true" />
              <span className="line-clamp-1">{project.location}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 text-[9px] sm:text-xs">
            <span className="text-gray-400 font-medium">{project.year}</span>
            {project.area && (
              <span className="text-gray-500 font-medium hidden xs:inline">{project.area}</span>
            )}
            <span className="font-bold text-orange-500 group-hover:underline">
              Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

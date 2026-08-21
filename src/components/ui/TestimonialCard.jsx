import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { scaleIn } from '@/utils/animations';

export default function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      className="bg-white rounded-xl p-6 md:p-7 card-shadow flex flex-col gap-4"
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-orange-100 fill-orange-100" aria-hidden="true" />

      {/* Stars */}
      <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" aria-hidden="true" />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: index % 2 === 0 ? '#1e40af' : '#f97316' }}
          aria-hidden="true"
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.designation}</p>
          <p className="text-xs text-orange-500 font-medium">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

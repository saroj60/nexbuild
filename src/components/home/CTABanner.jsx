import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/utils/animations';

export default function CTABanner() {
  const { company } = useAdmin();
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          alt="Modern construction building background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-blue-900/85" />
      </div>

      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <span className="w-6 h-0.5 bg-orange-400 rounded-full" />
            Start Your Project Today
            <span className="w-6 h-0.5 bg-orange-400 rounded-full" />
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
            Ready to Build Something
            <span className="text-orange-400"> Extraordinary?</span>
          </h2>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10">
            Whether it's your dream home, a commercial complex, or a renovation project — our
            team is ready to bring your vision to life in Pokhara, Nepal. Get a free consultation
            and detailed quote today.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary text-base px-8 py-4"
              aria-label="Request a free construction quote"
            >
              Request a Free Quote
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition-all duration-200 text-base hover:-translate-y-0.5 hover:shadow-lg"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

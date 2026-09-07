import { useAdmin } from '@/context/AdminContext';
import { motion } from 'framer-motion';
import { Building2, Clock, Users, Briefcase } from 'lucide-react';
import StatCounter from '../ui/StatCounter';
import { staggerContainer, viewportOnce } from '@/utils/animations';

export default function StatsSection() {
  const { company } = useAdmin();

  const stats = [
    {
      value: company.stats.projectsCompleted,
      label: 'Projects Completed',
      sublabel: 'Across Kathmandu Valley',
      icon: Building2,
    },
    {
      value: company.stats.yearsExperience,
      label: 'Years of Experience',
      sublabel: 'Proven Architectural Mastery',
      icon: Clock,
    },
    {
      value: company.stats.happyClients,
      label: 'Happy Clients',
      sublabel: '100% Verified Satisfaction',
      icon: Users,
    },
    {
      value: company.stats.professionals,
      label: 'Professionals',
      sublabel: 'Licensed Engineers & Architects',
      icon: Briefcase,
    },
  ];

  return (
    <section
      id="stats"
      className="relative py-12 md:py-16 overflow-hidden bg-[#050D24] text-white border-y border-blue-500/20 shadow-2xl"
      aria-label="Company statistics and proven track record"
    >
      {/* Background Animated Radial Glow Orbs */}
      <div
        className="absolute -top-32 -left-20 w-96 h-96 bg-blue-600/25 rounded-full blur-[120px] pointer-events-none animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-[130px] pointer-events-none animate-pulse"
        style={{ animationDelay: '1.8s' }}
        aria-hidden="true"
      />

      {/* Subtle Architectural Blueprint Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Glowing Border Accent Lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 35, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-blue-400/50 rounded-2xl p-5 sm:p-7 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(30,64,175,0.35)] flex flex-col items-center justify-center relative overflow-hidden group cursor-default"
            >
              {/* Top Card Gradient Shimmer Accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Ambient radial glow inside card on hover */}
              <div
                className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />

              <StatCounter
                value={stat.value}
                label={stat.label}
                sublabel={stat.sublabel}
                icon={stat.icon}
                index={idx}
                light
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

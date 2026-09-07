import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useAdmin } from '@/context/AdminContext';
import { fadeUp, viewportOnce, staggerContainer } from '@/utils/animations';

const PHASE_TAGS = [
  'Phase 01 • Discovery',
  'Phase 02 • Evaluation',
  'Phase 03 • Architecture & 3D',
  'Phase 04 • BOQ & Budgeting',
  'Phase 05 • Execution',
  'Phase 06 • Handover & Warranty',
];

export default function ProcessSection() {
  const { processSteps } = useAdmin();

  return (
    <section
      className="section-padding bg-[#f1f5f9] overflow-hidden"
      aria-label="Our construction process"
    >
      <div className="container-custom">
        <SectionHeader
          label="Our Process"
          title={<>How We <span className="text-[#3B82F6]">Work</span></>}
          subtitle="A transparent, step-by-step architectural and construction process designed to make your journey predictable, compliant, and stress-free."
          center
        />

        {/* Architectural 3x2 Process Card Grid - Compact & Sleek */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5 mt-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {processSteps.map((step, i) => {
            const IconComponent = Icons[step.icon] || Icons.CheckCircle;
            const stepNum = String(step.step || i + 1).padStart(2, '0');
            const phaseTag = PHASE_TAGS[i] || `Phase ${stepNum}`;

            return (
              <motion.div
                key={step.step || i}
                variants={fadeUp}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-500 hover:-translate-y-1 transition-all duration-250 relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Top Accent Gradient Bar on Hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                  aria-hidden="true"
                />

                <div>
                  {/* Top Row: Compact Icon Box (Left) + Refined Step Number (Right) */}
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                      <IconComponent className="w-4.5 h-4.5 text-white" aria-hidden="true" />
                    </div>

                    <span className="text-xl sm:text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors font-display tracking-tight">
                      {stepNum}
                    </span>
                  </div>

                  {/* Phase Eyebrow Badge - Compact */}
                  <div className="mt-2.5 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {phaseTag}
                    </span>
                  </div>

                  {/* Compact Title */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-700 transition-colors">
                    {step.title}
                  </h3>

                  {/* Compact Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Compact Footer Milestone Row */}
                <div className="pt-2.5 mt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded">
                    Step {stepNum} of 0{processSteps.length}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                    →
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

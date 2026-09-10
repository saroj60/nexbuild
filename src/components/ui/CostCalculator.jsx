import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { Calculator, CheckCircle2, MessageCircle, Phone, Sparkles, Building2, Layers, ShieldCheck, PieChart, FileText, ArrowRight } from 'lucide-react';

export default function CostCalculator({ initialArea = 2500, initialFloors = 2.5 }) {
  const { company } = useAdmin();

  // Inputs
  const [calculationMode, setCalculationMode] = useState('sqft'); // 'sqft' or 'aana'
  const [aanaInput, setAanaInput] = useState(3.5);
  const [builtAreaSqFt, setBuiltAreaSqFt] = useState(initialArea);
  const [floors, setFloors] = useState(initialFloors);
  const [qualityGrade, setQualityGrade] = useState('standard'); // 'basic', 'standard', 'luxury'
  
  // Add-ons
  const [includeArchitecturalPlans, setIncludeArchitecturalPlans] = useState(true);
  const [includeInteriorFitout, setIncludeInteriorFitout] = useState(false);
  const [includeSoilTest, setIncludeSoilTest] = useState(true);

  // Quality rates per sq ft (NPR)
  const RATES = {
    basic: {
      rate: 3500,
      name: 'Economy Grade',
      badge: 'Budget Friendly',
      desc: 'Standard M20 concrete RCC frame, locally sourced ceramic tiles, standard aluminum windows & quality sanitary fittings.'
    },
    standard: {
      rate: 4300,
      name: 'Standard / Semi-Luxury',
      badge: 'Most Popular',
      desc: 'Fe500 TMT steel, vitrified floor tiles, double-glazed UPVC windows, Asian Paints Apex exterior finish & Jaquar fittings.'
    },
    luxury: {
      rate: 5800,
      name: 'Luxury / Premium',
      badge: 'High-End Finish',
      desc: 'Heavy structural design, Italian marble & granite flooring, smart LED automation, structural glass facade & Grohe fittings.'
    }
  };

  // Compute built-up area from land area (Aana to sq ft estimate)
  const effectiveArea = calculationMode === 'aana' 
    ? Math.round(aanaInput * 342.25 * floors * 0.75) // 1 Aana = 342.25 sq ft, ~75% ground coverage per floor
    : Number(builtAreaSqFt);

  // Cost calculation breakdown
  const baseConstructionCost = effectiveArea * RATES[qualityGrade].rate;

  const architecturalFee = includeArchitecturalPlans 
    ? Math.max(75000, Math.round(effectiveArea * 35)) // ~Rs 35/sqft or min 75k
    : 0;

  const interiorCost = includeInteriorFitout 
    ? Math.round(effectiveArea * 900) 
    : 0;

  const soilTestFee = includeSoilTest ? 35000 : 0;

  const grandTotal = baseConstructionCost + architecturalFee + interiorCost + soilTestFee;

  // Breakdown percentages
  const civilWorkCost = Math.round(baseConstructionCost * 0.45);
  const finishingCost = Math.round(baseConstructionCost * 0.30);
  const mepCost = Math.round(baseConstructionCost * 0.15); // Mechanical, Electrical, Plumbing
  const doorsWindowsCost = Math.round(baseConstructionCost * 0.10);

  // Format NPR Currency into Lakhs / Crores helper
  function formatNPR(num) {
    if (num >= 10000000) {
      const cr = (num / 10000000).toFixed(2);
      return `Rs. ${cr} Crore (${num.toLocaleString()})`;
    } else if (num >= 100000) {
      const lakh = (num / 100000).toFixed(2);
      return `Rs. ${lakh} Lakh (${num.toLocaleString()})`;
    }
    return `Rs. ${num.toLocaleString()}`;
  }

  // Construct WhatsApp consultation link with prefilled calculation details
  const rawWhatsApp = company.whatsapp || '9846740399';
  const cleanWhatsApp = rawWhatsApp.replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(
    `Hello ${company.name},\nI used your online House Construction Cost Calculator:\n- Area: ${effectiveArea} sq. ft. (${floors} Storeys)\n- Quality Package: ${RATES[qualityGrade].name}\n- Estimated Construction Budget: ${formatNPR(grandTotal)}\n\nI would like to request an official Bill of Quantities (BOQ) & Architectural consultation.`
  );
  const waUrl = `https://wa.me/${cleanWhatsApp.startsWith('977') ? cleanWhatsApp : '977' + cleanWhatsApp}?text=${waMessage}`;

  return (
    <div id="cost-calculator" className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden my-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              House Construction & Design Cost Calculator
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Estimate your total building construction budget, architectural blueprints, municipality approval fees, and finish specifications in Nepal.
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 text-center md:text-right shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Standard Market Rate</span>
            <span className="text-lg font-black text-orange-400">Rs. 3,500 - 5,800 <span className="text-xs font-normal text-slate-300">/ sq. ft.</span></span>
          </div>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Area Input Mode */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-500" />
                <span>1. Select Measurement Mode</span>
              </label>
              <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCalculationMode('sqft')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${calculationMode === 'sqft' ? 'bg-white text-blue-800 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Built-up Sq. Ft.
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationMode('aana')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${calculationMode === 'aana' ? 'bg-white text-blue-800 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Land Area (Aana)
                </button>
              </div>
            </div>

            {calculationMode === 'sqft' ? (
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-gray-200/80">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs font-bold text-gray-600">Total Built-Up Area:</span>
                  <span className="text-base font-black text-blue-900 bg-white px-3 py-1 rounded-lg border border-gray-200">
                    {builtAreaSqFt.toLocaleString()} sq. ft.
                  </span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="8000"
                  step="100"
                  value={builtAreaSqFt}
                  onChange={(e) => setBuiltAreaSqFt(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                  <span>800 sq ft</span>
                  <span>4,000 sq ft</span>
                  <span>8,000 sq ft</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-gray-200/80">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs font-bold text-gray-600">Land Size in Aana:</span>
                  <span className="text-base font-black text-blue-900 bg-white px-3 py-1 rounded-lg border border-gray-200">
                    {aanaInput} Aana (~{Math.round(aanaInput * 342.25)} sq. ft. plot)
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="0.5"
                  value={aanaInput}
                  onChange={(e) => setAanaInput(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                  <span>2 Aana</span>
                  <span>5 Aana</span>
                  <span>10 Aana+</span>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Storeys / Floors */}
          <div>
            <label className="text-sm font-extrabold text-gray-900 flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-orange-500" />
              <span>2. Number of Storeys / Floors</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {[1, 2, 2.5, 3, 3.5].map((fl) => (
                <button
                  key={fl}
                  type="button"
                  onClick={() => setFloors(fl)}
                  className={`py-3 px-2 rounded-xl text-xs font-extrabold border transition-all text-center ${
                    floors === fl
                      ? 'bg-blue-800 text-white border-blue-800 shadow-md ring-2 ring-blue-800/20'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {fl} Storeys
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Construction Quality Package */}
          <div>
            <label className="text-sm font-extrabold text-gray-900 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>3. Finishing & Material Grade</span>
            </label>
            <div className="space-y-3">
              {Object.keys(RATES).map((key) => {
                const pkg = RATES[key];
                const isSelected = qualityGrade === key;
                return (
                  <div
                    key={key}
                    onClick={() => setQualityGrade(key)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/5 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="qualityGrade"
                          checked={isSelected}
                          onChange={() => setQualityGrade(key)}
                          className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="font-extrabold text-gray-900 text-sm">{pkg.name}</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-900 text-white uppercase tracking-wider">
                          {pkg.badge}
                        </span>
                      </div>
                      <span className="font-black text-blue-900 text-sm sm:text-base">
                        Rs. {pkg.rate.toLocaleString()} <span className="text-xs font-normal text-gray-500">/ sq. ft.</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 pl-6 leading-relaxed">
                      {pkg.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4: Architectural & Consultancy Add-ons */}
          <div>
            <label className="text-sm font-extrabold text-gray-900 flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>4. Additional Engineering & Design Services</span>
            </label>
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeArchitecturalPlans}
                    onChange={(e) => setIncludeArchitecturalPlans(e.target.checked)}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-gray-900 block">Architectural Blueprints & Municipality Map Approval</span>
                    <span className="text-[11px] text-gray-500">Full 2D Blueprints, 3D Elevation, Structural Design & Municipal Approval File</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                  + {formatNPR(architecturalFee)}
                </span>
              </label>

              <label className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeInteriorFitout}
                    onChange={(e) => setIncludeInteriorFitout(e.target.checked)}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-gray-900 block">Full Turnkey Interior Fit-out & Custom Furniture</span>
                    <span className="text-[11px] text-gray-500">Custom wardrobes, kitchen modular cabinets, false ceiling & lighting</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                  + {formatNPR(interiorCost)}
                </span>
              </label>

              <label className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeSoilTest}
                    onChange={(e) => setIncludeSoilTest(e.target.checked)}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-gray-900 block">Geotechnical Soil Testing & Structural Certification</span>
                    <span className="text-[11px] text-gray-500">Official lab soil analysis report certified by Senior Structural Engineer</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                  + Rs. 35,000
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 sticky top-24 shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
                <PieChart className="w-4 h-4" />
                <span>Estimated Budget</span>
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-bold">
                {effectiveArea.toLocaleString()} SQ. FT.
              </span>
            </div>

            {/* Main Total Number */}
            <div className="my-6">
              <span className="text-xs text-slate-400 block font-semibold mb-1">Total Estimated Project Cost</span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatNPR(grandTotal)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                *Includes labor, materials, structural RCC framing, and chosen finish grade.
              </p>
            </div>

            {/* Visual Budget Bar */}
            <div className="space-y-3 pt-2 pb-6 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 block">Cost Component Breakdown</span>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div style={{ width: '45%' }} className="bg-blue-500" title="Civil & RCC Structure (45%)" />
                <div style={{ width: '30%' }} className="bg-orange-500" title="Finishing & Flooring (30%)" />
                <div style={{ width: '15%' }} className="bg-emerald-500" title="Plumbing & Electrical (15%)" />
                <div style={{ width: '10%' }} className="bg-purple-500" title="Doors & Glazing (10%)" />
              </div>

              <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-slate-300 text-[11px]">Civil & RCC (45%): <strong>Rs. {(civilWorkCost / 100000).toFixed(1)}L</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-slate-300 text-[11px]">Finishing (30%): <strong>Rs. {(finishingCost / 100000).toFixed(1)}L</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-slate-300 text-[11px]">MEP Work (15%): <strong>Rs. {(mepCost / 100000).toFixed(1)}L</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                  <span className="text-slate-300 text-[11px]">Doors/Glazing (10%): <strong>Rs. {(doorsWindowsCost / 100000).toFixed(1)}L</strong></span>
                </div>
              </div>
            </div>

            {/* Included Summary Bullet points */}
            <div className="py-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NBC Code Compliant Structural Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Detailed Itemized Bill of Quantities (BOQ)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Supervised by Licensed Senior Engineers</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 rounded-2xl text-sm transition-colors shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Detailed BOQ Quote</span>
              </a>

              <a
                href={`tel:${company.phone}`}
                className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-2xl text-xs transition-colors border border-slate-700"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Speak with Our Architect: {company.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

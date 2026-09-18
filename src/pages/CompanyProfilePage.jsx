import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { generateCompanyProfilePDF } from '@/utils/pdfGenerator';
import {
  Building2, Download, Printer, ShieldCheck, Award, Clock, Users, MapPin, Phone,
  Mail, Globe, FileText, CheckCircle2, ChevronRight, Layers, Wrench, Sparkles,
  Search, SlidersHorizontal, ArrowRight, ExternalLink, HardHat, Briefcase
} from 'lucide-react';

export default function CompanyProfilePage() {
  const { company, projects, services, team } = useAdmin();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // All 67 projects list
  const allProjects = projects || [];

  // Filtered projects for the complete portfolio table
  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Major showcase projects (Top 25 major projects with images & full details)
  const majorProjects = allProjects.slice(0, 25);

  // Categories list for filter tabs
  const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Interior', 'Renovation'];

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      generateCompanyProfilePDF(company, projects);
    } catch (err) {
      console.error(err);
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Official Company Profile & 67 Project Portfolio | {company.legalName || company.name}</title>
        <meta
          name="description"
          content={`Official Corporate Company Profile of ${company.legalName}. View our history, technical capabilities, NEA credentials, and full portfolio of 67 completed construction & architectural projects in Nepal. Download PDF profile.`}
        />
        <meta
          name="keywords"
          content="Nexbuild Architects company profile, construction company profile Nepal, 67 completed projects Kathmandu, architectural firm PDF profile, NEA registered engineer Kathmandu"
        />
        <link rel="canonical" href="https://nexbuildarchitects.com.np/company-profile" />
      </Helmet>

      {/* Top Banner & Quick Controls */}
      <section className="pt-28 pb-10 bg-slate-950 text-white relative overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>Official Document</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Corporate Company Profile
              </h1>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                {company.legalName} — Full overview of capabilities, engineering team, registrations, and complete portfolio of {allProjects.length} completed projects.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download Company Profile PDF'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-3.5 rounded-2xl text-sm transition-colors border border-slate-700"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>

          {/* Quick Jump Links Bar */}
          <div className="pt-4 flex items-center gap-2 overflow-x-auto text-xs font-bold text-slate-300 no-scrollbar">
            <span className="text-slate-500 uppercase tracking-widest text-[10px] mr-2">Jump To:</span>
            {[
              { label: 'Executive Summary', href: '#section-summary' },
              { label: 'Vision & Mission', href: '#section-vision' },
              { label: 'Services', href: '#section-services' },
              { label: 'Statistics', href: '#section-stats' },
              { label: 'Major Showcase', href: '#section-showcase' },
              { label: `All ${allProjects.length} Projects`, href: '#section-portfolio' },
              { label: 'Ongoing Work', href: '#section-ongoing' },
              { label: 'Equipment', href: '#section-equipment' },
              { label: 'Certifications', href: '#section-certifications' },
              { label: 'Contact', href: '#section-contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-orange-500 hover:text-white transition-colors border border-slate-800 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Company Profile Print Document Container */}
      <main className="bg-[#f8fafc] py-10 sm:py-16">
        <div className="container-custom">
          <div
            id="company-profile-document"
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden print:shadow-none print:border-none print:rounded-none"
          >
            {/* ─────────────────────────────────────────────────────────────
                COVER HEADER / BRANDING BANNER (PDF Page 1)
               ───────────────────────────────────────────────────────────── */}
            <header className="bg-slate-900 text-white p-8 sm:p-14 border-b-4 border-orange-500 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md shrink-0">
                    <img src="/icon.png" alt={`${company.name} logo`} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-orange-400 text-xs font-extrabold uppercase tracking-widest block">Company Profile & Capability Statement</span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">{company.legalName}</h2>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium">{company.tagline}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-slate-400">
                      <span>Reg No: <strong>{company.companyRegNo}</strong></span>
                      <span>•</span>
                      <span>PAN/VAT: <strong>{company.vatNo}</strong></span>
                      <span>•</span>
                      <span>NEA Certified Member</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 text-right shrink-0">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Headquarters</p>
                  <p className="text-sm font-bold text-white mt-0.5">{company.address}</p>
                  <p className="text-xs text-orange-400 font-semibold mt-1">Tel: {company.phone}</p>
                  <p className="text-xs text-slate-300 font-medium">{company.email}</p>
                </div>
              </div>
            </header>

            {/* Document Body Padding Container */}
            <div className="p-6 sm:p-12 space-y-16">
              
              {/* ─────────────────────────────────────────────────────────────
                  SECTION 1: EXECUTIVE SUMMARY & HISTORY
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-summary" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">01</div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Executive Summary & Corporate Overview</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4 text-gray-700 text-sm leading-relaxed">
                    <p className="text-base font-semibold text-gray-900 border-l-4 border-orange-500 pl-4 py-1 bg-orange-50/50 rounded-r-lg">
                      {company.description}
                    </p>
                    <p>
                      {company.history || `Established in ${company.foundedYear}, ${company.name} has evolved into a premier full-service architecture, structural engineering, and construction firm operating across Kathmandu Valley, Pokhara, Chitwan, and major economic hubs in Nepal.`}
                    </p>
                    <p>
                      Our multi-disciplinary team seamlessly handles every stage of building development — from initial Vastu-compliant architectural floor planning and 3D elevation modeling to structural engineering, municipal map approval filings, and turnkey RCC construction supervision.
                    </p>
                  </div>

                  <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-gray-200 space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Corporate Details</h4>
                    <ul className="space-y-3 text-xs text-gray-700">
                      <li className="flex justify-between border-b border-gray-200/80 pb-2">
                        <span className="text-gray-500">Legal Entity:</span>
                        <span className="font-bold text-gray-900 text-right">{company.legalName}</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-200/80 pb-2">
                        <span className="text-gray-500">Established:</span>
                        <span className="font-bold text-gray-900">{company.foundedYear}</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-200/80 pb-2">
                        <span className="text-gray-500">Company Reg:</span>
                        <span className="font-bold text-gray-900">{company.companyRegNo}</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-200/80 pb-2">
                        <span className="text-gray-500">PAN / VAT No:</span>
                        <span className="font-bold text-gray-900">{company.vatNo}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Regional Offices:</span>
                        <span className="font-bold text-gray-900 text-right">Kathmandu, Chitwan, Pokhara</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 2: VISION, MISSION & CORE VALUES
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-vision" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">02</div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Vision, Mission & Core Values</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-900 text-white p-7 rounded-2xl shadow-sm relative overflow-hidden">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">Our Vision</span>
                    <h4 className="text-lg font-bold text-white leading-snug">{company.vision}</h4>
                  </div>

                  <div className="bg-slate-900 text-white p-7 rounded-2xl shadow-sm relative overflow-hidden">
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block mb-2">Our Mission</span>
                    <h4 className="text-lg font-bold text-white leading-snug">{company.mission}</h4>
                  </div>
                </div>

                {/* Core Values */}
                <div>
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-gray-500 mb-4">Core Principles & Values</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(company.coreValues || []).map((val, idx) => (
                      <div key={idx} className="p-5 bg-gray-50 rounded-2xl border border-gray-200/80">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-xs mb-3">
                          0{idx + 1}
                        </div>
                        <h5 className="font-extrabold text-gray-900 text-sm mb-1">{val.title}</h5>
                        <p className="text-xs text-gray-600 leading-relaxed">{val.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 3: CORE SERVICES
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-services" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">03</div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Services & Technical Competencies</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(services || []).map((srv) => (
                    <div key={srv.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-blue-800/10 text-blue-800 flex items-center justify-center mb-4">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-extrabold text-gray-900 text-base mb-2">{srv.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed mb-4">{srv.shortDesc}</p>
                      </div>
                      {srv.features?.length > 0 && (
                        <ul className="space-y-1.5 pt-3 border-t border-gray-100 text-xs text-gray-700">
                          {srv.features.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 4: COMPANY STATISTICS & TRACK RECORD
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-stats" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">04</div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Company Statistics & Performance Metrics</h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900 text-white p-8 rounded-3xl">
                  <div className="text-center p-4 border-r border-slate-800 last:border-none">
                    <span className="text-3xl sm:text-5xl font-black text-orange-400 block">{allProjects.length}+</span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-1 block">Completed Projects</span>
                  </div>
                  <div className="text-center p-4 border-r border-slate-800 last:border-none">
                    <span className="text-3xl sm:text-5xl font-black text-white block">{company.stats.happyClients}</span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-1 block">Satisfied Clients</span>
                  </div>
                  <div className="text-center p-4 border-r border-slate-800 last:border-none">
                    <span className="text-3xl sm:text-5xl font-black text-white block">{company.stats.yearsExperience}</span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-1 block">Years Experience</span>
                  </div>
                  <div className="text-center p-4">
                    <span className="text-3xl sm:text-5xl font-black text-white block">{company.stats.professionals}</span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-1 block">Engineers & Staff</span>
                  </div>
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 5: MAJOR COMPLETED PROJECTS SHOWCASE
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-showcase" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">05</div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-gray-900">Major Completed Projects Showcase ({majorProjects.length} Key Landmarks)</h3>
                      <p className="text-xs text-gray-500">Detailed showcase of our top 25 major architectural & construction projects with site images, built area, clients, and specifications.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {majorProjects.map((proj) => (
                    <div key={proj.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 bg-blue-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {proj.category}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-base line-clamp-1 mb-1">{proj.title}</h4>
                          <p className="text-xs text-orange-600 font-bold mb-3 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{proj.location}</span>
                          </p>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">{proj.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-gray-500 border-t border-gray-100 pt-3">
                          <div>Client: <strong className="text-gray-800 block truncate">{proj.client || 'Private Client'}</strong></div>
                          <div>Year: <strong className="text-gray-800 block">{proj.year || '2025'}</strong></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 6: COMPLETE PORTFOLIO TABLE (ALL 67 PROJECTS)
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-portfolio" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">06</div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-gray-900">Complete Project Portfolio ({allProjects.length} Projects)</h3>
                      <p className="text-xs text-gray-500">Comprehensive list of all completed construction & design contracts.</p>
                    </div>
                  </div>

                  {/* Category Filter Pills (Screen only) */}
                  <div className="flex items-center gap-1 overflow-x-auto text-xs font-bold no-scrollbar print:hidden">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                          categoryFilter === cat
                            ? 'bg-blue-800 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table Filter Controls (Screen only) */}
                <div className="mb-4 flex items-center justify-between gap-4 print:hidden">
                  <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search 67 projects by name, location, or client..."
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">
                    Showing {filteredProjects.length} of {allProjects.length} projects
                  </span>
                </div>

                {/* The 67 Projects Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-extrabold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-4 w-12 text-center">S.N.</th>
                        <th className="py-3.5 px-4">Project Name & Specification</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Built Area</th>
                        <th className="py-3.5 px-4">Completion Year</th>
                        <th className="py-3.5 px-4">Client</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/80">
                      {filteredProjects.map((p, idx) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 text-center font-bold text-gray-400">{idx + 1}</td>
                          <td className="py-3 px-4">
                            <span className="font-extrabold text-gray-900 block">{p.title}</span>
                            <span className="text-[10px] text-gray-500 line-clamp-1">{p.description}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-700">{p.location}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-600">{p.area || 'N/A'}</td>
                          <td className="py-3 px-4 font-bold text-gray-900">{p.year || '2025'}</td>
                          <td className="py-3 px-4 text-gray-700 font-medium">{p.client || 'Private Homeowner'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 7: ONGOING PROJECTS
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-ongoing" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">07</div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Current Ongoing Developments</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(company.ongoingProjects || []).map((og, idx) => (
                    <div key={idx} className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-gray-200">
                      <span className="text-[10px] font-extrabold text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full uppercase">
                        {og.status}
                      </span>
                      <h4 className="font-extrabold text-gray-900 text-base mt-2 mb-1">{og.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>{og.location}</span>
                      </p>
                      <div className="flex justify-between text-xs text-gray-600 pt-3 border-t border-gray-200/80">
                        <span>Built Area: <strong>{og.area}</strong></span>
                        <span>Target: <strong>{og.completionTarget}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 8: MANAGEMENT & ENGINEERING TEAM
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-team" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">08</div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Management & Technical Leadership</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(team || []).map((m) => (
                    <div key={m.id} className="p-5 bg-white rounded-2xl border border-gray-200 text-center shadow-sm">
                      <div className="w-20 h-20 rounded-full mx-auto overflow-hidden bg-gray-100 mb-3 border-2 border-orange-500">
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-extrabold text-gray-900 text-sm">{m.name}</h4>
                      <p className="text-xs text-orange-600 font-bold mt-0.5">{m.role}</p>
                      <p className="text-[11px] text-gray-500 mt-2 line-clamp-2">{m.bio}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 9: EQUIPMENT & TECHNICAL RESOURCES
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-equipment" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">09</div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Equipment & Machinery Resources</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(company.equipment || []).map((eq, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3">
                      <Wrench className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-gray-900 text-sm">{eq.category}</h4>
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{eq.items}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 10: CERTIFICATIONS & LEGAL REGISTRATIONS
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-certifications" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">10</div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Certifications & Legal Compliance</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(company.certifications || []).map((c, idx) => (
                    <div key={idx} className="p-4 bg-blue-900 text-white rounded-2xl flex items-center gap-4">
                      <ShieldCheck className="w-8 h-8 text-orange-400 shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-sm">{c.title}</h4>
                        <p className="text-xs text-slate-300 mt-0.5">{c.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 11: CLIENTS & PARTNERS
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-clients" className="scroll-mt-32 border-t border-gray-100 pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">11</div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Corporate Clients & Key Partners</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {(company.clients || []).map((cl, idx) => (
                    <div key={idx} className="px-4 py-2.5 bg-gray-100 rounded-xl border border-gray-200 text-xs font-bold text-gray-800">
                      {cl.name} <span className="text-[10px] text-gray-500 font-normal">({cl.category})</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────────
                  SECTION 12: CONTACT & HEADQUARTERS
                 ───────────────────────────────────────────────────────────── */}
              <section id="section-contact" className="scroll-mt-32 border-t-2 border-gray-200 pt-12">
                <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                      <span className="text-orange-400 text-xs font-bold uppercase tracking-widest block mb-1">Get In Touch</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Nexbuild Architects Head Office</h3>
                      <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl">
                        Contact our engineering team for tender submissions, design-build consultations, or structural inquiries across Nepal.
                      </p>

                      <div className="mt-6 space-y-3 text-xs text-slate-300">
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-orange-400" />
                          <span>{company.address}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-orange-400" />
                          <span>{company.phone}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-orange-400" />
                          <span>{company.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 print:hidden">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3.5 rounded-2xl text-sm transition-all"
                      >
                        <span>Send Direct Inquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={handleDownloadPDF}
                        className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-6 py-3 rounded-2xl text-xs transition-colors border border-slate-700"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF Profile</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}

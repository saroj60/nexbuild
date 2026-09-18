import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { generateCompanyProfilePDF } from '@/utils/pdfGenerator';
import {
  Building2, Save, Download, Plus, Trash2, ShieldCheck, Wrench, CheckCircle2, FileText, ArrowRight
} from 'lucide-react';

export default function AdminCompanyProfile() {
  const { company, updateCompany, projects } = useAdmin();
  const [form, setForm] = useState({ ...company });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompany(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      generateCompanyProfilePDF(form, projects);
    } catch (e) {
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Handlers for ongoing projects
  const addOngoingProject = () => {
    const updated = [
      ...(form.ongoingProjects || []),
      { name: 'New Project Name', location: 'Location, Nepal', category: 'Residential', status: 'In Construction', completionTarget: '2026', area: '4,000 sq. ft.' }
    ];
    handleChange('ongoingProjects', updated);
  };

  const updateOngoingProject = (idx, field, val) => {
    const updated = [...(form.ongoingProjects || [])];
    updated[idx][field] = val;
    handleChange('ongoingProjects', updated);
  };

  const deleteOngoingProject = (idx) => {
    const updated = (form.ongoingProjects || []).filter((_, i) => i !== idx);
    handleChange('ongoingProjects', updated);
  };

  // Handlers for equipment
  const addEquipment = () => {
    const updated = [
      ...(form.equipment || []),
      { category: 'New Category', items: 'Machinery details...' }
    ];
    handleChange('equipment', updated);
  };

  const updateEquipment = (idx, field, val) => {
    const updated = [...(form.equipment || [])];
    updated[idx][field] = val;
    handleChange('equipment', updated);
  };

  const deleteEquipment = (idx) => {
    const updated = (form.equipment || []).filter((_, i) => i !== idx);
    handleChange('equipment', updated);
  };

  return (
    <div className="space-y-8">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block">Corporate Management</span>
          <h1 className="text-2xl font-extrabold text-gray-900">Company Profile & PDF Settings</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage company history, equipment resources, ongoing projects, certifications, and PDF export details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>{isGeneratingPDF ? 'Generating...' : 'Preview & Export PDF'}</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Data</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>Company Profile content updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: History & Introduction */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-500" />
            <span>1. History & Corporate Narrative</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Company History & Journey</label>
            <textarea
              rows="4"
              value={form.history || ''}
              onChange={(e) => handleChange('history', e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Describe company founding, growth milestones..."
            />
          </div>
        </div>

        {/* Section 2: Ongoing Projects */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-500" />
              <span>2. Current Ongoing Developments</span>
            </h3>
            <button
              type="button"
              onClick={addOngoingProject}
              className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-3 py-1.5 rounded-lg text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Ongoing Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {(form.ongoingProjects || []).map((og, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Project Name</label>
                  <input
                    type="text"
                    value={og.name}
                    onChange={(e) => updateOngoingProject(idx, 'name', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Location</label>
                  <input
                    type="text"
                    value={og.location}
                    onChange={(e) => updateOngoingProject(idx, 'location', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Status</label>
                  <input
                    type="text"
                    value={og.status}
                    onChange={(e) => updateOngoingProject(idx, 'status', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700"
                  />
                </div>
                <div className="flex items-end justify-between gap-2">
                  <div className="w-full">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">Completion Target</label>
                    <input
                      type="text"
                      value={og.completionTarget}
                      onChange={(e) => updateOngoingProject(idx, 'completionTarget', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteOngoingProject(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Equipment Resources */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-orange-500" />
              <span>3. Equipment & Machinery Resources</span>
            </h3>
            <button
              type="button"
              onClick={addEquipment}
              className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-3 py-1.5 rounded-lg text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Equipment Category</span>
            </button>
          </div>

          <div className="space-y-3">
            {(form.equipment || []).map((eq, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
                <div className="w-1/3">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Category</label>
                  <input
                    type="text"
                    value={eq.category}
                    onChange={(e) => updateEquipment(idx, 'category', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-900"
                  />
                </div>
                <div className="w-2/3">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Equipment & Assets List</label>
                  <input
                    type="text"
                    value={eq.items}
                    onChange={(e) => updateEquipment(idx, 'items', e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => deleteEquipment(idx)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0 mt-3"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save All Company Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}

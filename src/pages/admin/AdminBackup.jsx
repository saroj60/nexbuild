import { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Download, Upload, CheckCircle, AlertTriangle, AlertCircle, FileJson } from 'lucide-react';

export default function AdminBackup() {
  const adminContext = useAdmin();
  const {
    company, projects, services, testimonials, team, whyChooseUs, processSteps, vlogs,
    importAll,
  } = adminContext;

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef(null);

  // 1. Export JSON Backup file
  function handleExport() {
    setError('');
    setSuccessMsg('');

    try {
      const backupData = {
        version: "1.0",
        exportedAt: new Date().toISOString(),
        company,
        projects,
        services,
        testimonials,
        team,
        whyChooseUs,
        processSteps,
        vlogs,
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `zeta_construction_backup_${dateStr}.json`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccessMsg('Backup file generated and downloaded successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
      setError('Failed to generate export backup file.');
    }
  }

  // 2. Import JSON Backup file
  function handleImport(e) {
    setError('');
    setSuccessMsg('');
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      setError('Please select a valid .json backup file.');
      return;
    }

    if (!window.confirm('WARNING: Restoring from this backup file will completely overwrite all your current projects, team rosters, and company settings. Do you want to continue?')) {
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);

        // Simple validation checks
        if (!parsed || (typeof parsed !== 'object')) {
          throw new Error('Invalid JSON format.');
        }

        // Check for presence of at least one major configuration key
        if (!parsed.company && !parsed.projects && !parsed.services) {
          throw new Error('This file does not appear to be a valid Zeta Construction backup.');
        }

        const success = importAll(parsed);
        if (success) {
          setSuccessMsg('Website data restored successfully! All custom changes are now live.');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setError('Failed to apply restored data to website states.');
        }
      } catch (err) {
        console.error(err);
        setError(`Failed to parse backup file: ${err.message || 'Check file format'}`);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the selected backup file.');
    };

    reader.readAsText(file);
    e.target.value = ''; // Reset input file field
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Backup & Restore</h1>
          <p className="text-gray-500 text-sm mt-0.5">Export your current website content or restore from a backup file</p>
        </div>

        {/* Success toast */}
        {successMsg && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl mb-6">
            <CheckCircle className="w-4.5 h-4.5" />
            {successMsg}
          </div>
        )}

        {/* Error toast */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl mb-6">
            <AlertCircle className="w-4.5 h-4.5" />
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Export Box */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Download className="w-5 h-5 text-blue-800" />
              <h2 className="font-bold text-gray-900 text-sm">Export Content Backup</h2>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Downloads a single backup file (`.json`) containing all your customized company profiles, address locations, services, team members, reviews, and construction vlogs. Keep this file safe on your computer.
            </p>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-xs cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Backup File (.json)
            </button>
          </div>

          {/* Import Box */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Upload className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-gray-900 text-sm">Restore from Backup File</h2>
            </div>

            {/* Warning Alert */}
            <div className="flex gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-xs leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <span className="font-bold block mb-0.5">Destructive Action!</span>
                Restoring data will replace all projects, staff bios, images, and company details currently saved on this browser. Ensure you are uploading the correct Zeta backup file.
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Select a previously exported Zeta Construction `.json` backup file to restore all website content immediately.
            </p>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleImport}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 border border-orange-250 hover:bg-orange-50 text-orange-600 font-bold px-6 py-2.5 rounded-xl transition-colors text-xs cursor-pointer shadow-sm"
              >
                <FileJson className="w-4 h-4" />
                Select & Import Backup File
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

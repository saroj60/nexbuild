import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Pencil, Trash2, CheckCircle, AlertCircle, X, RotateCcw } from 'lucide-react';

const EMPTY_WHY = { title: '', icon: 'Shield', description: '' };
const EMPTY_PROCESS = { step: '', title: '', icon: 'MessageSquare', description: '' };

const ICONS = ['Shield', 'Users', 'DollarSign', 'Clock', 'Eye', 'HardHat', 'Star', 'Heart', 'MessageSquare', 'MapPin', 'PenTool', 'Calculator', 'Key', 'Wrench', 'Building2', 'ClipboardList', 'BarChart2', 'Target'];

export default function AdminHighlights() {
  const {
    whyChooseUs, addWhyItem, updateWhyItem, deleteWhyItem, resetWhyChooseUs,
    processSteps, addProcessStep, updateProcessStep, deleteProcessStep, resetProcessSteps,
  } = useAdmin();

  // Mode: 'why' or 'process'
  const [tab, setTab] = useState('why');

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [whyForm, setWhyForm] = useState(EMPTY_WHY);
  const [processForm, setProcessForm] = useState(EMPTY_PROCESS);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Why Choose Us CRUD Handlers
  function openNewWhy() {
    setEditingId(null);
    setWhyForm(EMPTY_WHY);
    setShowForm(true);
    setError('');
  }
  function openEditWhy(item) {
    setEditingId(item.id || item.title); // Handle items that might not have ID yet
    setWhyForm({ ...EMPTY_WHY, ...item });
    setShowForm(true);
    setError('');
  }
  function handleDeleteWhy(id, title) {
    if (window.confirm(`Delete "${title}" from Why Choose Us?`)) {
      deleteWhyItem(id);
    }
  }
  function handleResetWhy() {
    if (window.confirm('Reset Why Choose Us to default values?')) {
      resetWhyChooseUs();
    }
  }

  // Process Steps CRUD Handlers
  function openNewProcess() {
    setEditingId(null);
    const nextStepNum = String(processSteps.length + 1).padStart(2, '0');
    setProcessForm({ ...EMPTY_PROCESS, step: nextStepNum });
    setShowForm(true);
    setError('');
  }
  function openEditProcess(step) {
    setEditingId(step.id || step.step);
    setProcessForm({ ...EMPTY_PROCESS, ...step });
    setShowForm(true);
    setError('');
  }
  function handleDeleteProcess(id, title) {
    if (window.confirm(`Delete step "${title}" from Process Timeline?`)) {
      deleteProcessStep(id);
    }
  }
  function handleResetProcess() {
    if (window.confirm('Reset Process Timeline to default steps?')) {
      resetProcessSteps();
    }
  }

  // Form Submission
  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaved(false);

    try {
      if (tab === 'why') {
        if (!whyForm.title.trim() || !whyForm.description.trim()) {
          setError('Title and description are required.');
          return;
        }
        const itemId = editingId || Date.now();
        if (editingId) {
          updateWhyItem(editingId, whyForm);
        } else {
          addWhyItem({ ...whyForm, id: itemId });
        }
      } else {
        if (!processForm.title.trim() || !processForm.description.trim() || !processForm.step.trim()) {
          setError('Step number, title, and description are required.');
          return;
        }
        const itemId = editingId || Date.now();
        if (editingId) {
          updateProcessStep(editingId, processForm);
        } else {
          addProcessStep({ ...processForm, id: itemId });
        }
      }

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setShowForm(false);
      }, 1000);
    } catch (err) {
      setError('Error saving timeline details.');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Toggle tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => { setTab('why'); setShowForm(false); }}
            className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${
              tab === 'why' && !showForm
                ? 'border-blue-800 text-blue-800'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Why Choose Us
          </button>
          <button
            onClick={() => { setTab('process'); setShowForm(false); }}
            className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${
              tab === 'process' && !showForm
                ? 'border-blue-800 text-blue-800'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Process Timeline
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {tab === 'why' ? 'Why Choose Us Configuration' : 'How We Work Timeline'}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {tab === 'why'
                ? 'Configure items listed in the "Zeta Advantage" highlights grid'
                : 'Configure steps displayed in the horizontal/vertical desktop and mobile timelines'}
            </p>
          </div>
          {!showForm && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={tab === 'why' ? handleResetWhy : handleResetProcess}
                className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
              <button
                onClick={tab === 'why' ? openNewWhy : openNewProcess}
                className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
          )}
        </div>

        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl mb-6">
            <CheckCircle className="w-4.5 h-4.5" />
            Config settings saved successfully!
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl mb-6">
            <AlertCircle className="w-4.5 h-4.5" />
            {error}
          </div>
        )}

        {showForm ? (
          /* Editor Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
              <h2 className="font-bold text-gray-900 text-sm pb-3 border-b border-gray-100">
                {editingId ? 'Edit Configuration' : 'Add New Item'}
              </h2>

              {tab === 'why' ? (
                /* Why Choose Us Form */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Highlight Title">
                      <input
                        type="text"
                        value={whyForm.title}
                        onChange={(e) => setWhyForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Transparent Pricing"
                        className={input()}
                        required
                      />
                    </Field>
                    <Field label="Lucide Icon">
                      <select
                        value={whyForm.icon}
                        onChange={(e) => setWhyForm((prev) => ({ ...prev, icon: e.target.value }))}
                        className={input()}
                      >
                        {ICONS.map((ico) => (
                          <option key={ico} value={ico}>
                            {ico}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Short description text">
                    <textarea
                      rows={3}
                      value={whyForm.description}
                      onChange={(e) => setWhyForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="e.g. No hidden costs. We provide detailed BOQ..."
                      className={input() + ' resize-none'}
                      required
                    />
                  </Field>
                </div>
              ) : (
                /* Process Step Form */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="Step Index/Number (e.g. 01)">
                      <input
                        type="text"
                        value={processForm.step}
                        onChange={(e) => setProcessForm((prev) => ({ ...prev, step: e.target.value }))}
                        placeholder="e.g. 01"
                        className={input()}
                        required
                      />
                    </Field>
                    <Field label="Timeline Step Title">
                      <input
                        type="text"
                        value={processForm.title}
                        onChange={(e) => setProcessForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Initial Consultation"
                        className={input()}
                        required
                      />
                    </Field>
                    <Field label="Lucide Icon">
                      <select
                        value={processForm.icon}
                        onChange={(e) => setProcessForm((prev) => ({ ...prev, icon: e.target.value }))}
                        className={input()}
                      >
                        {ICONS.map((ico) => (
                          <option key={ico} value={ico}>
                            {ico}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Short Description of Timeline Step">
                    <textarea
                      rows={3}
                      value={processForm.description}
                      onChange={(e) => setProcessForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="e.g. We begin with a free consultation to understand..."
                      className={input() + ' resize-none'}
                      required
                    />
                  </Field>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
              >
                {editingId ? 'Save Changes' : 'Save New Item'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-600 hover:text-gray-900 text-sm px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* List Views */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {tab === 'why'
              ? whyChooseUs.map((item) => (
                  <div key={item.id || item.title} className="p-4 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center font-bold text-orange-500 flex-shrink-0 text-sm border border-orange-100">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditWhy(item)}
                        className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-xl font-semibold hover:bg-blue-100"
                        aria-label={`Edit ${item.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteWhy(item.id || item.title, item.title)}
                        className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-3 py-2 rounded-xl font-semibold hover:bg-red-100"
                        aria-label={`Delete ${item.title}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              : processSteps.map((step) => (
                  <div key={step.id || step.step} className="p-4 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center font-extrabold text-blue-700 flex-shrink-0 text-base border border-blue-100">
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm leading-tight flex items-center gap-2">
                        {step.title}
                        <span className="text-xs font-normal text-gray-400">
                          Icon: {step.icon}
                        </span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditProcess(step)}
                        className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-xl font-semibold hover:bg-blue-100"
                        aria-label={`Edit step ${step.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProcess(step.id || step.step, step.title)}
                        className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-3 py-2 rounded-xl font-semibold hover:bg-red-100"
                        aria-label={`Delete step ${step.title}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function input() {
  return "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";
}

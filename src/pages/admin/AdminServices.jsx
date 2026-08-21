import { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Pencil, Trash2, CheckCircle, AlertCircle, X, RotateCcw, Upload, Image as ImageIcon } from 'lucide-react';
import { compressImage } from '@/utils/imageCompressor';

const EMPTY_SERVICE = {
  title: '',
  shortDesc: '',
  fullDesc: '',
  icon: 'Wrench',
  image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  features: [''],
};

export default function AdminServices() {
  const { services, addService, updateService, deleteService, resetServices } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_SERVICE);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  function handleOpenNew() {
    setEditingId(null);
    setForm(EMPTY_SERVICE);
    setShowForm(true);
    setError('');
  }

  function handleOpenEdit(svc) {
    setEditingId(svc.id);
    setForm({
      ...EMPTY_SERVICE,
      ...svc,
      features: svc.features?.length ? svc.features : [''],
    });
    setShowForm(true);
    setError('');
  }

  function handleDelete(id, title) {
    if (window.confirm(`Delete service "${title}"?\nThis cannot be undone.`)) {
      deleteService(id);
    }
  }

  function handleReset() {
    if (window.confirm('Reset all services to default services?')) {
      resetServices();
    }
  }

  function handleFeatureChange(i, val) {
    const f = [...form.features];
    f[i] = val;
    setForm((prev) => ({ ...prev, features: f }));
  }

  function addFeature() {
    setForm((prev) => ({ ...prev, features: [...prev.features, ''] }));
  }

  function removeFeature(i) {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }));
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    setUploading(true);
    compressImage(file, 800, 0.7)
      .then((compressedBase64) => {
        setForm((prev) => ({ ...prev, image: compressedBase64 }));
        setUploading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to compress image.');
        setUploading(false);
      });
    e.target.value = '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaved(false);

    if (!form.title.trim()) {
      setError('Service title is required.');
      return;
    }

    const cleanForm = {
      ...form,
      features: form.features.filter((f) => f.trim()),
    };

    try {
      if (editingId) {
        updateService(editingId, cleanForm);
      } else {
        addService(cleanForm);
      }
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setShowForm(false);
      }, 1000);
    } catch (err) {
      setError('Error saving service.');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Services Manager</h1>
            <p className="text-gray-500 text-sm mt-0.5">Add, edit, or delete construction services offered by the company</p>
          </div>
          {!showForm && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-colors font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
              <button
                onClick={handleOpenNew}
                className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>
          )}
        </div>

        {/* Saved Toast */}
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl mb-6">
            <CheckCircle className="w-4.5 h-4.5" />
            Service saved successfully!
          </div>
        )}

        {/* Error Toast */}
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
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Service Title">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Residential Construction"
                    className={input()}
                    required
                  />
                </Field>
                <Field label="Lucide Icon Name">
                  <select
                    value={form.icon}
                    onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))}
                    className={input()}
                  >
                    {['Home', 'Building2', 'PenTool', 'Wrench', 'Columns', 'Layers', 'ClipboardList', 'BarChart2', 'HardHat', 'Calculator'].map((ico) => (
                      <option key={ico} value={ico}>
                        {ico}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Short Description (For cards / homepage preview)">
                <input
                  type="text"
                  value={form.shortDesc}
                  onChange={(e) => setForm((prev) => ({ ...prev, shortDesc: e.target.value }))}
                  placeholder="Summarize service in one sentence..."
                  className={input()}
                  required
                />
              </Field>

              <Field label="Full Description (For Services detail page)">
                <textarea
                  rows={4}
                  value={form.fullDesc}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullDesc: e.target.value }))}
                  placeholder="Detail the services, operations, standard codes followed..."
                  className={input() + ' resize-none'}
                  required
                />
              </Field>

              {/* Service Image Selector */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Featured Service Image
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {form.image && (
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                      <img src={form.image} alt={form.title} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, image: '' }))}
                        className="absolute inset-0 bg-black/60 text-white text-[10px] font-bold opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="text"
                      value={form.image && form.image.startsWith('data:') ? '' : form.image}
                      onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                      placeholder="Paste Image URL (https://...)"
                      className={input()}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">or</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors font-semibold border border-gray-200"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload file (max 2MB)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Features Bullets */}
              <div className="border-t border-gray-100 pt-4">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Service Feature Bullet Points
                </label>
                <div className="space-y-2">
                  {form.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder={`Bullet ${idx + 1}`}
                        className={input()}
                      />
                      {form.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="text-red-400 hover:text-red-600 px-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addFeature}
                  className="mt-2 text-xs text-blue-700 font-semibold hover:underline"
                >
                  + Add Feature Bullet
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
              >
                {editingId ? 'Save Changes' : 'Add Service'}
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
          /* Services List */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {services.map((svc) => (
              <div key={svc.id} className="p-4 flex gap-4 items-start">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                    {svc.title}
                    <span className="text-xs font-normal text-gray-400 bg-gray-50 px-2 py-0.5 rounded border">
                      Icon: {svc.icon}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{svc.shortDesc}</p>
                </div>
                <div className="flex gap-2 self-center">
                  <button
                    onClick={() => handleOpenEdit(svc)}
                    className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-xl font-semibold hover:bg-blue-100"
                    aria-label={`Edit ${svc.title}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(svc.id, svc.title)}
                    className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-3 py-2 rounded-xl font-semibold hover:bg-red-100"
                    aria-label={`Delete ${svc.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {services.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No services configured. Click &ldquo;Add Service&rdquo; above.
              </div>
            )}
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

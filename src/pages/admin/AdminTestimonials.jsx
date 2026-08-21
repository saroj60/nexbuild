import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Pencil, Trash2, CheckCircle, AlertCircle, Star, RotateCcw } from 'lucide-react';

const EMPTY_TESTIMONIAL = {
  name: '',
  designation: '',
  location: 'Pokhara',
  rating: 5,
  text: '',
  avatar: '',
};

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, resetTestimonials } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_TESTIMONIAL);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function handleOpenNew() {
    setEditingId(null);
    setForm(EMPTY_TESTIMONIAL);
    setShowForm(true);
    setError('');
  }

  function handleOpenEdit(t) {
    setEditingId(t.id);
    setForm({ ...EMPTY_TESTIMONIAL, ...t });
    setShowForm(true);
    setError('');
  }

  function handleDelete(id, name) {
    if (window.confirm(`Delete testimonial from "${name}"?\nThis cannot be undone.`)) {
      deleteTestimonial(id);
    }
  }

  function handleReset() {
    if (window.confirm('Reset all testimonials to default sample reviews?')) {
      resetTestimonials();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaved(false);

    if (!form.name.trim() || !form.text.trim()) {
      setError('Client name and testimonial text are required.');
      return;
    }

    // Set initials as avatar if empty
    const cleanForm = {
      ...form,
      avatar: form.avatar.trim() || form.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
    };

    try {
      if (editingId) {
        updateTestimonial(editingId, cleanForm);
      } else {
        addTestimonial(cleanForm);
      }
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setShowForm(false);
      }, 1000);
    } catch (err) {
      setError('Error saving testimonial.');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Testimonials</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage reviews and star ratings shown on the homepage</p>
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
                Add Review
              </button>
            </div>
          )}
        </div>

        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl mb-6">
            <CheckCircle className="w-4.5 h-4.5" />
            Testimonial saved successfully!
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
                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Client Name">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Ramesh Shrestha"
                    className={input()}
                    required
                  />
                </Field>
                <Field label="Designation / Role">
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm((prev) => ({ ...prev, designation: e.target.value }))}
                    placeholder="e.g. Homeowner / Managing Director"
                    className={input()}
                    required
                  />
                </Field>
                <Field label="Location">
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Lakeside, Pokhara"
                    className={input()}
                    required
                  />
                </Field>
                <Field label="Star Rating">
                  <select
                    value={form.rating}
                    onChange={(e) => setForm((prev) => ({ ...prev, rating: parseInt(e.target.value) || 5 }))}
                    className={input()}
                  >
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <option key={stars} value={stars}>
                        {stars} Star{stars > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Avatar Initials (Optional - will auto-generate if empty)">
                  <input
                    type="text"
                    value={form.avatar}
                    onChange={(e) => setForm((prev) => ({ ...prev, avatar: e.target.value.toUpperCase().slice(0, 2) }))}
                    placeholder="e.g. RS"
                    className={input()}
                  />
                </Field>
              </div>

              <Field label="Testimonial / Review Text">
                <textarea
                  rows={4}
                  value={form.text}
                  onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
                  placeholder="Paste the client's quote here..."
                  className={input() + ' resize-none'}
                  required
                />
              </Field>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
              >
                {editingId ? 'Save Changes' : 'Add Testimonial'}
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
          /* Testimonials List */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {testimonials.map((t) => (
              <div key={t.id} className="p-4 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 flex-shrink-0 text-sm">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{t.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {t.designation} · {t.location}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 self-center">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-xl font-semibold hover:bg-blue-100"
                    aria-label={`Edit testimonial from ${t.name}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-3 py-2 rounded-xl font-semibold hover:bg-red-100"
                    aria-label={`Delete testimonial from ${t.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {testimonials.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No testimonials loaded. Click &ldquo;Add Review&rdquo; above.
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

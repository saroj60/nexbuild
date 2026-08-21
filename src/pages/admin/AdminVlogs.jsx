import { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Pencil, Trash2, CheckCircle, AlertCircle, RotateCcw, Upload, Play, FileText } from 'lucide-react';
import { compressImage } from '@/utils/imageCompressor';

const EMPTY_VLOG = {
  title: '',
  description: '',
  content: '',
  videoUrl: '',
  imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  category: 'Engineering',
  author: 'Surya Prasad Parajuli',
};




const CATEGORIES = ['Engineering', 'Architecture', 'Safety', 'Interior Design', 'General', 'Client Guide'];

export default function AdminVlogs() {
  const { vlogs, addVlog, updateVlog, deleteVlog, resetVlogs } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_VLOG);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  function handleOpenNew() {
    setEditingId(null);
    setForm(EMPTY_VLOG);
    setShowForm(true);
    setError('');
  }

  function handleOpenEdit(v) {
    setEditingId(v.id);
    setForm({ ...EMPTY_VLOG, ...v });
    setShowForm(true);
    setError('');
  }

  function handleDelete(id, title) {
    if (window.confirm(`Delete vlog "${title}"?\nThis cannot be undone.`)) {
      deleteVlog(id);
    }
  }

  function handleReset() {
    if (window.confirm('Reset all vlogs to default template articles?')) {
      resetVlogs();
    }
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
        setForm((prev) => ({ ...prev, imageUrl: compressedBase64 }));
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

    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.');
      return;
    }

    // Convert standard youtube watch url to embed url if needed
    let cleanVideoUrl = form.videoUrl.trim();
    if (cleanVideoUrl && cleanVideoUrl.includes('youtube.com/watch?v=')) {
      const vidId = cleanVideoUrl.split('v=')[1]?.split('&')[0];
      if (vidId) cleanVideoUrl = `https://www.youtube.com/embed/${vidId}`;
    } else if (cleanVideoUrl && cleanVideoUrl.includes('youtu.be/')) {
      const vidId = cleanVideoUrl.split('youtu.be/')[1]?.split('?')[0];
      if (vidId) cleanVideoUrl = `https://www.youtube.com/embed/${vidId}`;
    }

    const cleanForm = {
      ...form,
      videoUrl: cleanVideoUrl,
    };

    try {
      if (editingId) {
        updateVlog(editingId, cleanForm);
      } else {
        addVlog(cleanForm);
      }
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setShowForm(false);
      }, 1000);
    } catch (err) {
      setError('Error saving vlog details.');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Vlogs Manager</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage video vlogs, news articles, and advice guides</p>
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
                Add Vlog
              </button>
            </div>
          )}
        </div>

        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl mb-6">
            <CheckCircle className="w-4.5 h-4.5" />
            Vlog saved successfully!
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
                {editingId ? 'Edit Vlog Details' : 'Write New Vlog'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Vlog Title">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Setting plinth beam standards"
                    className={input()}
                    required
                  />
                </Field>
                <Field label="Vlog Category">
                  <select
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className={input()}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Author Name">
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                    placeholder="e.g. Er. Surya Prasad Parajuli"
                    className={input()}
                    required
                  />
                </Field>
                <Field label="YouTube Video URL (Optional - e.g. watch or embed link)">
                  <input
                    type="text"
                    value={form.videoUrl}
                    onChange={(e) => setForm((prev) => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="e.g. https://www.youtube.com/watch?v=..."
                    className={input()}
                  />
                </Field>
              </div>

              <Field label="Short description/excerpt">
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Summarize the vlog in one sentence..."
                  className={input()}
                  required
                />
              </Field>

              <Field label="Full Content Body (Use double enters for paragraphs)">
                <textarea
                  rows={6}
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Write the full article content here..."
                  className={input() + ' resize-y'}
                  required
                />
              </Field>

              {/* Vlog Thumbnail Image Selector */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Vlog Thumbnail Image
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {form.imageUrl && (
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                      <img src={form.imageUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, imageUrl: '' }))}
                        className="absolute inset-0 bg-black/60 text-white text-[10px] font-bold opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="text"
                      value={form.imageUrl && form.imageUrl.startsWith('data:') ? '' : form.imageUrl}
                      onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
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
                        Upload thumbnail (max 2MB)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
              >
                {editingId ? 'Save Changes' : 'Publish Vlog'}
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
          /* Vlogs List */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {vlogs.map((v) => (
              <div key={v.id} className="p-4 flex gap-4 items-center">
                <img
                  src={v.imageUrl}
                  alt={v.title}
                  className="w-16 h-12 rounded object-cover flex-shrink-0 border"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate flex items-center gap-2">
                    {v.title}
                    {v.videoUrl && (
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5">
                        <Play className="w-2.5 h-2.5 fill-orange-700" />
                        Video
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {v.category} · By {v.author} · {v.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(v)}
                    className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-xl font-semibold hover:bg-blue-100"
                    aria-label={`Edit ${v.title}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(v.id, v.title)}
                    className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-3 py-2 rounded-xl font-semibold hover:bg-red-100"
                    aria-label={`Delete ${v.title}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {vlogs.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No vlogs configured. Click &ldquo;Add Vlog&rdquo; above.
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

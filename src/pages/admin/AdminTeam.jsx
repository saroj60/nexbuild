import { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Pencil, Trash2, CheckCircle, AlertCircle, RotateCcw, Upload, Image as ImageIcon } from 'lucide-react';
import { compressImage } from '@/utils/imageCompressor';

const EMPTY_MEMBER = {
  name: '',
  designation: '',
  qualification: '',
  experience: '10+ years',
  avatar: '',
  color: '#1e40af',
  image: '',
};

// ... inside component ...
// lines 60-80 in original, let's target the exact text


const COLORS = [
  { value: '#1e40af', label: 'Primary Blue' },
  { value: '#f97316', label: 'Accent Orange' },
  { value: '#111827', label: 'Dark Charcoal' },
  { value: '#059669', label: 'Forest Green' },
  { value: '#dc2626', label: 'Crimson Red' },
];

export default function AdminTeam() {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember, resetTeam } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_MEMBER);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  function handleOpenNew() {
    setEditingId(null);
    setForm(EMPTY_MEMBER);
    setShowForm(true);
    setError('');
  }

  function handleOpenEdit(m) {
    setEditingId(m.id);
    setForm({ ...EMPTY_MEMBER, ...m });
    setShowForm(true);
    setError('');
  }

  function handleDelete(id, name) {
    if (window.confirm(`Remove team member "${name}"?\nThis cannot be undone.`)) {
      deleteTeamMember(id);
    }
  }

  function handleReset() {
    if (window.confirm('Reset team roster to default staff?')) {
      resetTeam();
    }
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB limit.');
      return;
    }

    setUploading(true);
    compressImage(file, 600, 0.7)
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

    if (!form.name.trim() || !form.designation.trim()) {
      setError('Name and designation are required.');
      return;
    }

    // Auto generate avatar initials
    const cleanForm = {
      ...form,
      avatar: form.avatar.trim() || form.name.replace(/^(Er\.|Ar\.)\s+/i, '').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
    };

    try {
      if (editingId) {
        updateTeamMember(editingId, cleanForm);
      } else {
        addTeamMember(cleanForm);
      }
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setShowForm(false);
      }, 1000);
    } catch (err) {
      setError('Error saving team member details.');
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Team Roster</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage leadership and staff profiles shown on the About Us page</p>
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
                Add Member
              </button>
            </div>
          )}
        </div>

        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl mb-6">
            <CheckCircle className="w-4.5 h-4.5" />
            Team member saved successfully!
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
                {editingId ? 'Edit Profile' : 'Add Team Profile'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name (Include Title e.g. Er. Ram Sharma)">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Er. Ram Sharma"
                    className={input()}
                    required
                  />
                </Field>
                <Field label="Designation / Job Title">
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm((prev) => ({ ...prev, designation: e.target.value }))}
                    placeholder="e.g. Structural Engineer / Site Supervisor"
                    className={input()}
                    required
                  />
                </Field>
                <Field label="Academic Qualifications">
                  <input
                    type="text"
                    value={form.qualification}
                    onChange={(e) => setForm((prev) => ({ ...prev, qualification: e.target.value }))}
                    placeholder="e.g. B.E. Civil Engineering"
                    className={input()}
                  />
                </Field>
                <Field label="Years of Experience">
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm((prev) => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g. 10+ years"
                    className={input()}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Profile Avatar Initials (Fallback if no image)">
                  <input
                    type="text"
                    value={form.avatar}
                    onChange={(e) => setForm((prev) => ({ ...prev, avatar: e.target.value.toUpperCase().slice(0, 2) }))}
                    placeholder="e.g. RS"
                    className={input()}
                  />
                </Field>
                <Field label="Profile Theme Color (Fallback if no image)">
                  <select
                    value={form.color}
                    onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))}
                    className={input()}
                  >
                    {COLORS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label} ({c.value})
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Profile Image Upload */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Profile Photo
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {form.image ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                      <img src={form.image} alt={form.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, image: '' }))}
                        className="absolute inset-0 bg-black/60 text-white text-[10px] font-bold opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-base shadow flex-shrink-0"
                      style={{ backgroundColor: form.color }}
                    >
                      {form.avatar || '??'}
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="url"
                      value={form.image && form.image.startsWith('data:') ? '' : form.image}
                      onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                      placeholder="Paste photo URL (https://...)"
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
                        Upload file (max 5MB)
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
                {editingId ? 'Save Changes' : 'Add Profile'}
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
          /* Team List */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {team.map((m) => (
              <div key={m.id} className="p-4 flex gap-4 items-start">
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 shadow-sm border border-gray-200"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 text-sm shadow"
                    style={{ backgroundColor: m.color }}
                  >
                    {m.avatar}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base leading-tight">{m.name}</h3>
                  <p className="text-xs text-orange-500 font-semibold mt-0.5">{m.designation}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {m.qualification} · <span className="font-semibold">{m.experience} Experience</span>
                  </p>
                </div>
                <div className="flex gap-2 self-center">
                  <button
                    onClick={() => handleOpenEdit(m)}
                    className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-xl font-semibold hover:bg-blue-100"
                    aria-label={`Edit profile of ${m.name}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m.id, m.name)}
                    className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-3 py-2 rounded-xl font-semibold hover:bg-red-100"
                    aria-label={`Delete profile of ${m.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {team.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No team profiles configured. Click &ldquo;Add Member&rdquo; above.
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

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { slugify } from '@/utils/slugify';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Upload, Link2, X, Plus, Star, StarOff, AlertCircle, CheckCircle, Image as ImageIcon,
} from 'lucide-react';
import { compressImage } from '@/utils/imageCompressor';

const CATEGORIES = ['Residential', 'Commercial', 'Renovation', 'Industrial', 'Institutional'];
const STATUSES = ['Ongoing', 'Completed', 'Planned'];

const EMPTY_FORM = {
  title: '',
  location: '',
  category: 'Residential',
  status: 'Ongoing',
  year: new Date().getFullYear(),
  client: '',
  area: '',
  duration: '',
  description: '',
  image: '',
  gallery: [],
  highlights: [''],
  featured: false,
  specifications: { 'Built-up Area': '', Structure: '', 'Completion': '' },
};

export default function AdminProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { projects, addProject, updateProject, addGalleryImage, addGalleryImages, removeGalleryImage } = useAdmin();

  const [form, setForm] = useState(EMPTY_FORM);
  const [galleryInput, setGalleryInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const fileInputRef = useRef(null);
  const coverFileRef = useRef(null);

  // Load existing project data if editing
  useEffect(() => {
    if (isEdit) {
      const project = projects.find((p) => p.id === id);
      if (project) {
        setForm({
          ...EMPTY_FORM,
          ...project,
          highlights: project.highlights?.length ? project.highlights : [''],
          gallery: project.gallery || [],
          specifications: project.specifications || {},
        });
      }
    }
  }, [id, isEdit, projects]);

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Project title is required';
    if (!form.location.trim()) errs.location = 'Location is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.image.trim()) errs.image = 'Cover image URL is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const cleanForm = {
      ...form,
      id: isEdit ? id : slugify(form.title),
      highlights: form.highlights.filter((h) => h.trim()),
    };

    if (isEdit) {
      updateProject(id, cleanForm);
    } else {
      addProject(cleanForm);
    }

    setSaved(true);
    setTimeout(() => {
      navigate('/admin');
    }, 1200);
  }

  // Add gallery image by URL
  function handleAddGalleryUrl() {
    const url = galleryInput.trim();
    if (!url) return;
    if (isEdit) {
      addGalleryImage(id, url);
    } else {
      setForm((f) => ({ ...f, gallery: [...f.gallery, url] }));
    }
    setGalleryInput('');
  }

  function handleRemoveGallery(url) {
    if (isEdit) {
      removeGalleryImage(id, url);
    } else {
      setForm((f) => ({ ...f, gallery: f.gallery.filter((g) => g !== url) }));
    }
  }

  // Upload local image(s) → convert to Data URL with canvas compression
  function handleFileUpload(e, type) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter only images and check size limit (5MB)
    const imageFiles = files.filter((f) => f.type.startsWith('image/'));
    const oversizedFiles = imageFiles.filter((f) => f.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Some files exceed the 5MB size limit and were skipped: ${oversizedFiles.map((f) => f.name).join(', ')}`);
    }

    const validFiles = imageFiles.filter((f) => f.size <= 5 * 1024 * 1024);
    if (validFiles.length === 0) {
      if (imageFiles.length > 0) {
        e.target.value = '';
        return;
      }
      alert('Please select valid image file(s).');
      return;
    }

    setUploading(true);

    if (type === 'cover') {
      const file = validFiles[0];
      compressImage(file, 1000, 0.7)
        .then((compressedBase64) => {
          setField('image', compressedBase64);
          setUploading(false);
        })
        .catch((err) => {
          console.error(err);
          alert('Failed to compress image.');
          setUploading(false);
        });
    } else {
      // type === 'gallery'
      const compressPromises = validFiles.map((file) => compressImage(file, 800, 0.7));
      Promise.all(compressPromises)
        .then((compressedImages) => {
          if (isEdit) {
            addGalleryImages(id, compressedImages);
          } else {
            setForm((f) => ({ ...f, gallery: [...f.gallery, ...compressedImages] }));
          }
          setUploading(false);
        })
        .catch((err) => {
          console.error(err);
          alert('Failed to compress one or more images.');
          setUploading(false);
        });
    }
    e.target.value = '';
  }

  // Highlights
  function setHighlight(i, val) {
    setForm((f) => {
      const h = [...f.highlights];
      h[i] = val;
      return { ...f, highlights: h };
    });
  }
  function addHighlight() {
    setForm((f) => ({ ...f, highlights: [...f.highlights, ''] }));
  }
  function removeHighlight(i) {
    setForm((f) => ({ ...f, highlights: f.highlights.filter((_, idx) => idx !== i) }));
  }

  // Specifications
  function addSpec() {
    if (!specKey.trim()) return;
    setForm((f) => ({ ...f, specifications: { ...f.specifications, [specKey]: specVal } }));
    setSpecKey('');
    setSpecVal('');
  }
  function removeSpec(key) {
    setForm((f) => {
      const s = { ...f.specifications };
      delete s[key];
      return { ...f, specifications: s };
    });
  }

  const currentGallery = isEdit
    ? (projects.find((p) => p.id === id)?.gallery || [])
    : form.gallery;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit Project' : 'Add New Project'}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{isEdit ? `Editing: ${form.title}` : 'Fill in the project details below'}</p>
          </div>
          {saved && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold bg-green-50 px-3 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              Saved! Redirecting…
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Section title="Basic Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Project Title *" error={errors.title}>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                  placeholder="e.g. Babarmahal Luxury Villa"
                  className={input(errors.title)}
                />
              </Field>
              <Field label="Location *" error={errors.location}>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setField('location', e.target.value)}
                  placeholder="e.g. Babarmahal, Kathmandu"
                  className={input(errors.location)}
                />
              </Field>
              <Field label="Category">
                <select value={form.category} onChange={(e) => setField('category', e.target.value)} className={input()}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select value={form.status} onChange={(e) => setField('status', e.target.value)} className={input()}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Year">
                <input type="number" value={form.year} onChange={(e) => setField('year', parseInt(e.target.value))} className={input()} min="2000" max="2100" />
              </Field>
              <Field label="Client Name">
                <input type="text" value={form.client} onChange={(e) => setField('client', e.target.value)} placeholder="e.g. Private Client" className={input()} />
              </Field>
              <Field label="Area">
                <input type="text" value={form.area} onChange={(e) => setField('area', e.target.value)} placeholder="e.g. 4,200 sq. ft." className={input()} />
              </Field>
              <Field label="Duration">
                <input type="text" value={form.duration} onChange={(e) => setField('duration', e.target.value)} placeholder="e.g. 18 months" className={input()} />
              </Field>
            </div>

            <Field label="Description *" error={errors.description}>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setField('description', e.target.value)}
                placeholder="Describe the project — what was built, key features, client requirements..."
                className={input(errors.description) + ' resize-none'}
              />
            </Field>

            {/* Featured toggle */}
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <button
                type="button"
                onClick={() => setField('featured', !form.featured)}
                className={`w-11 h-6 rounded-full transition-colors ${form.featured ? 'bg-blue-700' : 'bg-gray-300'} relative`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
              </button>
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                {form.featured ? <Star className="w-4 h-4 text-yellow-500" /> : <StarOff className="w-4 h-4 text-gray-400" />}
                {form.featured ? 'Featured on homepage' : 'Not featured'}
              </div>
            </label>
          </Section>

          {/* Cover Image */}
          <Section title="Cover Image">
            <Field label="Cover Image URL *" error={errors.image}>
              <input
                type="url"
                value={form.image.startsWith('data:') ? '' : form.image}
                onChange={(e) => setField('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={input(errors.image)}
              />
            </Field>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">— or —</span>
              <input ref={coverFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'cover')} />
              <button
                type="button"
                onClick={() => coverFileRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload from device (max 5MB)
              </button>
            </div>

            {form.image && (
              <img src={form.image} alt="Cover preview" className="mt-3 w-full max-w-sm h-44 object-cover rounded-xl border border-gray-200" onError={(e) => { e.target.style.display='none'; }} />
            )}
          </Section>

          {/* Gallery */}
          <Section title={`Gallery Images (${currentGallery.length})`}>
            <p className="text-xs text-gray-400 mb-3">Add multiple images for the project gallery. Paste a URL or upload from your device.</p>

            {/* Gallery Grid */}
            {currentGallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {currentGallery.map((url, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200">
                    <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-28 object-cover" onError={(e) => { e.target.style.display='none'; }} />
                    <button
                      type="button"
                      onClick={() => handleRemoveGallery(url)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add by URL */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGalleryUrl())}
                  placeholder="Paste image URL and press Add"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button type="button" onClick={handleAddGalleryUrl} className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors">
                Add
              </button>
            </div>

            {/* Upload from device */}
            <div className="mt-3">
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFileUpload(e, 'gallery')} />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 py-4"
              >
                <ImageIcon className="w-5 h-5 text-gray-400" />
                <span>{uploading ? 'Uploading…' : 'Click to upload gallery image from device (max 5MB each)'}</span>
              </button>
            </div>
          </Section>

          {/* Highlights */}
          <Section title="Project Highlights">
            <div className="space-y-2">
              {form.highlights.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => setHighlight(i, e.target.value)}
                    placeholder={`Highlight ${i + 1}`}
                    className={input()}
                  />
                  {form.highlights.length > 1 && (
                    <button type="button" onClick={() => removeHighlight(i)} className="text-red-400 hover:text-red-600">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addHighlight}
              className="mt-2 flex items-center gap-1.5 text-sm text-blue-700 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add highlight
            </button>
          </Section>

          {/* Specifications */}
          <Section title="Specifications">
            {Object.entries(form.specifications).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2 mb-2">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700">{key}</div>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => setForm((f) => ({ ...f, specifications: { ...f.specifications, [key]: e.target.value } }))}
                    className={input()}
                  />
                </div>
                <button type="button" onClick={() => removeSpec(key)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <input type="text" value={specKey} onChange={(e) => setSpecKey(e.target.value)} placeholder="Label (e.g. Floors)" className={input() + ' flex-1'} />
              <input type="text" value={specVal} onChange={(e) => setSpecVal(e.target.value)} placeholder="Value (e.g. G+3)" className={input() + ' flex-1'} />
              <button type="button" onClick={addSpec} className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-900 transition-colors whitespace-nowrap">
                + Add
              </button>
            </div>
          </Section>

          {/* Submit */}
          <div className="flex items-center gap-3 pb-8">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
            >
              {isEdit ? 'Save Changes' : 'Add Project'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="text-gray-600 hover:text-gray-900 text-sm px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

// Helpers
function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="font-bold text-gray-900 text-sm mb-4 pb-3 border-b border-gray-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

function input(error) {
  return `w-full px-3 py-2.5 border ${error ? 'border-red-400 bg-red-50' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`;
}

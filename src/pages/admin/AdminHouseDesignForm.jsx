import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin, slugify } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Upload, Link2, X, Plus, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { compressImage } from '@/utils/imageCompressor';

const STYLES = ['Modern', 'Minimalist', 'Traditional', 'Contemporary', 'Fusion', 'Classic'];

const EMPTY_FORM = {
  title: '',
  area: '',
  bedrooms: 3,
  bathrooms: 2,
  floors: 2,
  dimensions: '',
  style: 'Modern',
  description: '',
  image: '',
  gallery: [],
  features: [''],
};

export default function AdminHouseDesignForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { houseDesigns, addHouseDesign, updateHouseDesign, addHouseDesignGalleryImages, removeHouseDesignGalleryImage } = useAdmin();

  const [form, setForm] = useState(EMPTY_FORM);
  const [galleryInput, setGalleryInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const coverFileRef = useRef(null);

  // Load existing design data if editing
  useEffect(() => {
    if (isEdit) {
      const design = houseDesigns.find((d) => d.id === id);
      if (design) {
        setForm({
          ...EMPTY_FORM,
          ...design,
          features: design.features?.length ? design.features : [''],
          gallery: design.gallery || [],
        });
      }
    }
  }, [id, isEdit, houseDesigns]);

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.area.trim()) errs.area = 'Area is required';
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
      features: form.features.filter((f) => f.trim()),
    };

    if (isEdit) {
      updateHouseDesign(id, cleanForm);
    } else {
      addHouseDesign(cleanForm);
    }

    setSaved(true);
    setTimeout(() => {
      navigate('/admin/house-designs');
    }, 1200);
  }

  // Add gallery image by URL
  function handleAddGalleryUrl() {
    const url = galleryInput.trim();
    if (!url) return;
    if (isEdit) {
      addHouseDesignGalleryImages(id, [url]);
    } else {
      setForm((f) => ({ ...f, gallery: [...f.gallery, url] }));
    }
    setGalleryInput('');
  }

  function handleRemoveGallery(url) {
    if (isEdit) {
      removeHouseDesignGalleryImage(id, url);
    } else {
      setForm((f) => ({ ...f, gallery: f.gallery.filter((g) => g !== url) }));
    }
  }

  // Upload local image(s) → convert to Data URL with canvas compression
  function handleFileUpload(e, type) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter only images
    const imageFiles = files.filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      alert('Please select valid image file(s).');
      return;
    }

    setUploading(true);

    if (type === 'cover') {
      const file = imageFiles[0];
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
      const compressPromises = imageFiles.map((file) => compressImage(file, 800, 0.7));
      Promise.all(compressPromises)
        .then((compressedImages) => {
          if (isEdit) {
            addHouseDesignGalleryImages(id, compressedImages);
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

  // Features List
  function setFeature(i, val) {
    setForm((f) => {
      const feats = [...f.features];
      feats[i] = val;
      return { ...f, features: feats };
    });
  }

  function addFeature() {
    setForm((f) => ({ ...f, features: [...f.features, ''] }));
  }

  function removeFeature(i) {
    setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }));
  }

  const currentGallery = isEdit
    ? (houseDesigns.find((d) => d.id === id)?.gallery || [])
    : form.gallery;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit Design' : 'Add New Design'}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{isEdit ? `Editing: ${form.title}` : 'Fill in the design specifications below'}</p>
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
              <Field label="Design Title *" error={errors.title}>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                  placeholder="e.g. Modern 3-Storey Villa"
                  className={inputStyle(errors.title)}
                />
              </Field>

              <Field label="Style">
                <select value={form.style} onChange={(e) => setField('style', e.target.value)} className={inputStyle()}>
                  {STYLES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Area (sq. ft.) *" error={errors.area}>
                <input
                  type="text"
                  value={form.area}
                  onChange={(e) => setField('area', e.target.value)}
                  placeholder="e.g. 3,200 sq. ft."
                  className={inputStyle(errors.area)}
                />
              </Field>

              <Field label="Dimensions">
                <input
                  type="text"
                  value={form.dimensions}
                  onChange={(e) => setField('dimensions', e.target.value)}
                  placeholder="e.g. 30' x 45'"
                  className={inputStyle()}
                />
              </Field>

              <Field label="Bedrooms">
                <input
                  type="number"
                  value={form.bedrooms}
                  onChange={(e) => setField('bedrooms', parseInt(e.target.value) || 0)}
                  className={inputStyle()}
                  min="0"
                />
              </Field>

              <Field label="Bathrooms">
                <input
                  type="number"
                  value={form.bathrooms}
                  onChange={(e) => setField('bathrooms', parseInt(e.target.value) || 0)}
                  className={inputStyle()}
                  min="0"
                />
              </Field>

              <Field label="Floors">
                <input
                  type="number"
                  value={form.floors}
                  onChange={(e) => setField('floors', parseFloat(e.target.value) || 0)}
                  className={inputStyle()}
                  step="0.5"
                  min="0"
                />
              </Field>
            </div>

            <Field label="Description *" error={errors.description}>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setField('description', e.target.value)}
                placeholder="Describe the design — design concepts, target family size, special architecture highlights..."
                className={inputStyle(errors.description) + ' resize-none'}
              />
            </Field>
          </Section>

          {/* Cover Image */}
          <Section title="Cover Image">
            <Field label="Cover Image URL *" error={errors.image}>
              <input
                type="url"
                value={form.image.startsWith('data:') ? '' : form.image}
                onChange={(e) => setField('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={inputStyle(errors.image)}
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
                Upload from device (max 2MB)
              </button>
            </div>

            {form.image && (
              <img src={form.image} alt="Cover preview" className="mt-3 w-full max-w-sm h-44 object-cover rounded-xl border border-gray-200" onError={(e) => { e.target.style.display='none'; }} />
            )}
          </Section>

          {/* Gallery */}
          <Section title={`Gallery Images (${currentGallery.length})`}>
            <p className="text-xs text-gray-400 mb-3">Add floor plans, elevations, or 3D renders. Paste a URL or upload from your device.</p>

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
                <span>{uploading ? 'Uploading…' : 'Click to upload gallery images (multiple allowed, max 2MB each)'}</span>
              </button>
            </div>
          </Section>

          {/* Features */}
          <Section title="Design Highlights & Features">
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => setFeature(i, e.target.value)}
                    placeholder={`Feature ${i + 1}`}
                    className={inputStyle()}
                  />
                  {form.features.length > 1 && (
                    <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 flex items-center gap-1.5 text-sm text-blue-700 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add feature / highlight
            </button>
          </Section>

          {/* Submit */}
          <div className="flex items-center gap-3 pb-8">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
            >
              {isEdit ? 'Save Changes' : 'Add Design'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/house-designs')}
              className="text-gray-650 hover:text-gray-900 text-sm px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
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
      <label className="block text-xs font-semibold text-gray-605 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

function inputStyle(error) {
  return `w-full px-3 py-2.5 border ${error ? 'border-red-400 bg-red-50' : 'border-gray-300'} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`;
}

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

export default function AdminCompany() {
  const { company, updateCompany, resetCompany } = useAdmin();
  const [form, setForm] = useState(company);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleNestedChange(section, name, value) {
    setForm((f) => ({
      ...f,
      [section]: {
        ...f[section],
        [name]: value,
      },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaved(false);

    try {
      updateCompany(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError('Failed to update company details.');
    }
  }

  function handleReset() {
    if (window.confirm('Reset company details to default values?')) {
      resetCompany();
      setForm(company);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Company Information</h1>
            <p className="text-gray-500 text-sm mt-0.5">Edit website branding, contacts, social links, and stats counters</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl mb-6">
            <CheckCircle className="w-4.5 h-4.5" />
            Company settings saved successfully! Changes are live on the website.
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl mb-6">
            <AlertCircle className="w-4.5 h-4.5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Branding */}
          <Section title="General Branding">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Company Name">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={input()}
                  required
                />
              </Field>
              <Field label="Branding Tagline">
                <input
                  type="text"
                  name="tagline"
                  value={form.tagline}
                  onChange={handleChange}
                  className={input()}
                />
              </Field>
              <Field label="Founded Year">
                <input
                  type="number"
                  name="foundedYear"
                  value={form.foundedYear}
                  onChange={(e) => setForm((f) => ({ ...f, foundedYear: parseInt(e.target.value) || 2023 }))}
                  className={input()}
                  required
                />
              </Field>
              <Field label="License / Membership Details">
                <input
                  type="text"
                  name="license"
                  value={form.license}
                  onChange={handleChange}
                  className={input()}
                />
              </Field>
            </div>
          </Section>

          {/* Contact Details */}
          <Section title="Contact Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Public Phone Number">
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={input()}
                  required
                />
              </Field>
              <Field label="Public Email Address">
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={input()}
                  required
                />
              </Field>
              <Field label="WhatsApp (Digits Only - e.g. 9846740399)">
                <input
                  type="text"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  className={input()}
                  required
                />
              </Field>
              <Field label="Contact Person / Liaison Name">
                <input
                  type="text"
                  name="contactPerson"
                  value={form.contactPerson || ''}
                  onChange={handleChange}
                  className={input()}
                />
              </Field>
              <Field label="Short Location (e.g. Pokhara, Nepal)">
                <input
                  type="text"
                  name="addressShort"
                  value={form.addressShort}
                  onChange={handleChange}
                  className={input()}
                  required
                />
              </Field>
              <Field label="Full Physical Address">
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className={input()}
                  required
                />
              </Field>
            </div>
            <Field label="Google Maps Iframe Embed URL">
              <textarea
                name="mapEmbedUrl"
                rows={3}
                value={form.mapEmbedUrl}
                onChange={handleChange}
                className={input() + ' resize-none'}
                required
              />
            </Field>
          </Section>

          {/* Business Hours */}
          <Section title="Business Hours">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Weekdays Schedule">
                <input
                  type="text"
                  value={form.businessHours.weekdays}
                  onChange={(e) => handleNestedChange('businessHours', 'weekdays', e.target.value)}
                  className={input()}
                  required
                />
              </Field>
              <Field label="Saturday Schedule">
                <input
                  type="text"
                  value={form.businessHours.saturday}
                  onChange={(e) => handleNestedChange('businessHours', 'saturday', e.target.value)}
                  className={input()}
                  required
                />
              </Field>
              <Field label="Off-Days Message">
                <input
                  type="text"
                  value={form.businessHours.closed}
                  onChange={(e) => handleNestedChange('businessHours', 'closed', e.target.value)}
                  className={input()}
                  required
                />
              </Field>
            </div>
          </Section>

          {/* Social Links */}
          <Section title="Social Media Links">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['facebook', 'instagram', 'youtube', 'linkedin'].map((social) => (
                <Field key={social} label={social}>
                  <input
                    type="text"
                    value={form.social[social] || ''}
                    onChange={(e) => handleNestedChange('social', social, e.target.value)}
                    placeholder={`https://${social}.com/yourpage`}
                    className={input()}
                  />
                </Field>
              ))}
            </div>
          </Section>

          {/* Stats Section */}
          <Section title="Stats Counter Values">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Field label="Projects Completed">
                <input
                  type="text"
                  value={form.stats.projectsCompleted}
                  onChange={(e) => handleNestedChange('stats', 'projectsCompleted', e.target.value)}
                  className={input()}
                  required
                />
              </Field>
              <Field label="Years of Experience">
                <input
                  type="text"
                  value={form.stats.yearsExperience}
                  onChange={(e) => handleNestedChange('stats', 'yearsExperience', e.target.value)}
                  className={input()}
                  required
                />
              </Field>
              <Field label="Happy Clients">
                <input
                  type="text"
                  value={form.stats.happyClients}
                  onChange={(e) => handleNestedChange('stats', 'happyClients', e.target.value)}
                  className={input()}
                  required
                />
              </Field>
              <Field label="Professionals count">
                <input
                  type="text"
                  value={form.stats.professionals}
                  onChange={(e) => handleNestedChange('stats', 'professionals', e.target.value)}
                  className={input()}
                  required
                />
              </Field>
            </div>
          </Section>

          {/* Submit */}
          <div className="flex items-center gap-3 pb-8">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
            >
              Save Company Settings
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="font-bold text-gray-900 text-sm mb-4 pb-3 border-b border-gray-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
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

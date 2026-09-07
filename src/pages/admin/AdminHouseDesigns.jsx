import { Link } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Home, Plus, Image, Pencil, Trash2, RotateCcw } from 'lucide-react';

export default function AdminHouseDesigns() {
  const { houseDesigns, deleteHouseDesign, resetHouseDesigns } = useAdmin();

  function handleDelete(id, title) {
    if (window.confirm(`Delete design "${title}"?\nThis cannot be undone.`)) {
      deleteHouseDesign(id);
    }
  }

  function handleReset() {
    if (window.confirm('Reset ALL designs to default sample data?\nAll your custom additions will be lost.')) {
      resetHouseDesigns();
    }
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Designs</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Manage pre-designed house models and blueprints</p>
        </div>
        <Link
          to="/admin/house-designs/new"
          className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Design</span>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total Designs', value: houseDesigns.length, bg: 'bg-blue-50', text: 'text-blue-700' },
          { label: 'Avg. Area', value: houseDesigns.length ? `${Math.round(houseDesigns.reduce((acc, d) => acc + parseInt(d.area || 0), 0) / houseDesigns.length)} sq. ft.` : '0 sq. ft.', bg: 'bg-green-50', text: 'text-green-700' },
          { label: 'Styles Offered', value: new Set(houseDesigns.map(d => d.style)).size, bg: 'bg-purple-50', text: 'text-purple-700' },
        ].map(({ label, value, bg, text }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 border border-white shadow-sm`}>
            <p className={`text-xl sm:text-2xl font-extrabold ${text}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Designs List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-sm">
            All Designs <span className="text-gray-400 font-normal">({houseDesigns.length})</span>
          </h2>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 active:text-red-700 transition-colors py-1 px-2 rounded-lg hover:bg-red-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset defaults</span>
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {houseDesigns.map((design) => (
            <div key={design.id} className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-gray-50 transition-colors">
              {/* Thumbnail */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {design.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {design.style} Style
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-650 border border-gray-150">
                    {design.area}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-650 border border-gray-150">
                    {design.bedrooms} Beds / {design.bathrooms} Baths
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-650 border border-gray-150">
                    {design.floors} Floors
                  </span>
                  {design.price && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-750 border border-green-150">
                      Rs. {parseInt(design.price).toLocaleString()}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Image className="w-3 h-3" />
                    {(design.gallery || []).length}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                <Link
                  to={`/admin/house-designs/${design.id}/edit`}
                  className="flex items-center gap-1.5 text-xs bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 px-3 py-2 rounded-xl font-semibold transition-colors min-w-[64px] justify-center"
                  aria-label={`Edit ${design.title}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(design.id, design.title)}
                  className="flex items-center gap-1.5 text-xs bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-650 px-3 py-2 rounded-xl font-semibold transition-colors min-w-[64px] justify-center"
                  aria-label={`Delete ${design.title}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}

          {houseDesigns.length === 0 && (
            <div className="text-center py-10">
              <Home className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No designs uploaded yet.</p>
              <Link to="/admin/house-designs/new" className="text-blue-800 text-xs font-bold hover:underline mt-1 inline-block">
                Create the first design
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

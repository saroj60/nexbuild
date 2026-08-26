import { Link } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { FolderOpen, Plus, Image, Star, RotateCcw, Pencil, Trash2 } from 'lucide-react';

const STATUS_COLORS = {
  Completed: 'bg-green-100 text-green-700',
  Ongoing:   'bg-orange-100 text-orange-700',
  Planned:   'bg-blue-100 text-blue-700',
};

const CATEGORY_COLORS = {
  Residential: 'bg-purple-100 text-purple-700',
  Commercial:  'bg-blue-100 text-blue-700',
  Renovation:  'bg-yellow-100 text-yellow-700',
};

export default function AdminDashboard() {
  const { projects, deleteProject, resetProjects } = useAdmin();

  const stats = {
    total:     projects.length,
    completed: projects.filter((p) => p.status === 'Completed').length,
    ongoing:   projects.filter((p) => p.status === 'Ongoing').length,
    featured:  projects.filter((p) => p.featured).length,
  };

  function handleDelete(id, title) {
    if (window.confirm(`Delete "${title}"?\nThis cannot be undone.`)) {
      deleteProject(id);
    }
  }

  function handleReset() {
    if (window.confirm('Reset ALL projects to default sample data?\nAll your custom additions will be lost.')) {
      resetProjects();
    }
  }

  return (
    <AdminLayout>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Manage your projects and gallery</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Project</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total',     value: stats.total,     bg: 'bg-blue-50',   text: 'text-blue-700' },
          { label: 'Completed', value: stats.completed, bg: 'bg-green-50',  text: 'text-green-700' },
          { label: 'Ongoing',   value: stats.ongoing,   bg: 'bg-orange-50', text: 'text-orange-700' },
          { label: 'Featured',  value: stats.featured,  bg: 'bg-yellow-50', text: 'text-yellow-700' },
        ].map(({ label, value, bg, text }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 border border-white shadow-sm`}>
            <p className={`text-2xl sm:text-3xl font-extrabold ${text}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Projects List ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-sm">
            All Projects <span className="text-gray-400 font-normal">({projects.length})</span>
          </h2>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 active:text-red-700 transition-colors py-1 px-2 rounded-lg hover:bg-red-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset defaults</span>
          </button>
        </div>

        {/* Project Cards — works on all screen sizes */}
        <div className="divide-y divide-gray-50">
          {projects.map((project) => (
            <div key={project.id} className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-gray-50 transition-colors">
              {/* Thumbnail */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {project.title}
                  {project.featured && (
                    <Star className="inline w-3.5 h-3.5 text-yellow-500 ml-1.5 mb-0.5" />
                  )}
                </p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{project.location}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[project.status] || 'bg-gray-100 text-gray-600'}`}>
                    {project.status}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium hidden sm:inline-flex ${CATEGORY_COLORS[project.category] || 'bg-gray-100 text-gray-600'}`}>
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Image className="w-3 h-3" />
                    {(project.gallery || []).length}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                <Link
                  to={`/admin/projects/${project.id}/edit`}
                  className="flex items-center gap-1.5 text-xs bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 px-3 py-2 rounded-xl font-semibold transition-colors min-w-[64px] justify-center"
                  aria-label={`Edit ${project.title}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                  <span className="sm:hidden">Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="flex items-center gap-1.5 text-xs bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 px-3 py-2 rounded-xl font-semibold transition-colors min-w-[64px] justify-center"
                  aria-label={`Delete ${project.title}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                  <span className="sm:hidden">Del</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-16 px-4 text-gray-400">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold text-gray-500">No projects yet</p>
            <p className="text-xs mt-1">Tap &ldquo;Add Project&rdquo; to get started</p>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-2 mt-4 bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
            >
              <Plus className="w-4 h-4" /> Add First Project
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

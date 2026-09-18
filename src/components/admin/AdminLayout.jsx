import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import {
  LayoutDashboard, Building2, Wrench, MessageSquare, Users, Sparkles, LogOut, ExternalLink, HardHat, Plus, Video, Database, Home, FileText
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin', label: 'Projects', icon: LayoutDashboard, exact: true },
  { to: '/admin/house-designs', label: 'Designs', icon: Home, exact: false },
  { to: '/admin/company-profile', label: 'PDF & Profile', icon: FileText, exact: false },
  { to: '/admin/company', label: 'Company', icon: Building2, exact: false },
  { to: '/admin/services', label: 'Services', icon: Wrench, exact: false },
  { to: '/admin/vlogs', label: 'Vlogs', icon: Video, exact: false },
  { to: '/admin/testimonials', label: 'Reviews', icon: MessageSquare, exact: false },
  { to: '/admin/team', label: 'Team', icon: Users, exact: false },
  { to: '/admin/highlights', label: 'Setup', icon: Sparkles, exact: false },
  { to: '/admin/backup', label: 'Backup', icon: Database, exact: false },
];

export default function AdminLayout({ children }) {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(item) {
    return item.exact
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);
  }

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">

      {/* ── Top Bar ───────────────────────────────────────── */}
      <header className="bg-gray-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
            <HardHat className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span className="font-bold text-sm tracking-wide hidden sm:block">Nexbuild Admin Panel</span>
          <span className="font-bold text-sm sm:hidden">Admin Portal</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-gray-700"
            aria-label="View website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs bg-red-650 hover:bg-red-700 active:bg-red-800 px-2.5 py-1.5 rounded-lg transition-colors font-medium"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar (desktop only) ──────────────────────── */}
        <aside className="w-56 bg-white shadow-sm border-r border-gray-200 flex-shrink-0 hidden lg:block">
          <nav className="p-4 space-y-1" aria-label="Admin navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* ── Main content ────────────────────────────────── */}
        <main className="flex-1 p-4 sm:p-6 pb-24 lg:pb-6 overflow-auto min-w-0">
          {children}
        </main>
      </div>

      {/* ── Bottom Tab Bar (mobile + tablet) ────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex overflow-x-auto safe-bottom scrollbar-none shadow-lg justify-around"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="Mobile admin navigation"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex-1 min-w-[60px] flex flex-col items-center justify-center py-2 text-[10px] sm:text-xs font-semibold transition-colors gap-1 ${
                active ? 'text-blue-700 bg-blue-50/50' : 'text-gray-500 hover:text-gray-850'
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

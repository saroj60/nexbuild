import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { AdminProvider } from '@/context/AdminContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

// Public pages — lazy loaded
const HomePage           = lazy(() => import('./pages/HomePage'));
const AboutPage          = lazy(() => import('./pages/AboutPage'));
const ServicesPage       = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage       = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage  = lazy(() => import('./pages/ProjectDetailPage'));
const VlogsPage          = lazy(() => import('./pages/VlogsPage'));
const VlogDetailPage     = lazy(() => import('./pages/VlogDetailPage'));
const ContactPage        = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage  = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage          = lazy(() => import('./pages/TermsPage'));
const NotFoundPage       = lazy(() => import('./pages/NotFoundPage'));
const HouseDesignsPage   = lazy(() => import('./pages/HouseDesignsPage'));
const HouseDesignDetailPage = lazy(() => import('./pages/HouseDesignDetailPage'));

// Admin pages — lazy loaded
const AdminLoginPage    = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboard    = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProjectForm  = lazy(() => import('./pages/admin/AdminProjectForm'));
const AdminCompany      = lazy(() => import('./pages/admin/AdminCompany'));
const AdminServices     = lazy(() => import('./pages/admin/AdminServices'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminTeam         = lazy(() => import('./pages/admin/AdminTeam'));
const AdminHighlights   = lazy(() => import('./pages/admin/AdminHighlights'));
const AdminVlogs        = lazy(() => import('./pages/admin/AdminVlogs'));
const AdminBackup       = lazy(() => import('./pages/admin/AdminBackup'));
const AdminHouseDesigns = lazy(() => import('./pages/admin/AdminHouseDesigns'));
const AdminHouseDesignForm = lazy(() => import('./pages/admin/AdminHouseDesignForm'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-800 border-t-orange-500 rounded-full animate-spin" />
        <span className="text-sm text-gray-400 font-medium">Loading…</span>
      </div>
    </div>
  );
}

function Wrap({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  // ── Public site ──────────────────────────────────────────
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,           element: <Wrap><HomePage /></Wrap> },
      { path: 'about',         element: <Wrap><AboutPage /></Wrap> },
      { path: 'services',      element: <Wrap><ServicesPage /></Wrap> },
      { path: 'projects',      element: <Wrap><ProjectsPage /></Wrap> },
      { path: 'projects/:id',  element: <Wrap><ProjectDetailPage /></Wrap> },
      { path: 'house-designs',  element: <Wrap><HouseDesignsPage /></Wrap> },
      { path: 'house-designs/:id', element: <Wrap><HouseDesignDetailPage /></Wrap> },
      { path: 'vlogs',         element: <Wrap><VlogsPage /></Wrap> },
      { path: 'vlogs/:id',     element: <Wrap><VlogDetailPage /></Wrap> },
      { path: 'contact',       element: <Wrap><ContactPage /></Wrap> },
      { path: 'privacy-policy',element: <Wrap><PrivacyPolicyPage /></Wrap> },
      { path: 'terms',         element: <Wrap><TermsPage /></Wrap> },
      { path: '*',             element: <Wrap><NotFoundPage /></Wrap> },
    ],
  },

  // ── Admin ─────────────────────────────────────────────────
  {
    path: '/admin/login',
    element: <Wrap><AdminLoginPage /></Wrap>,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Wrap><AdminDashboard /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/projects',
    element: <Navigate to="/admin" replace />,
  },
  {
    path: '/admin/projects/new',
    element: (
      <ProtectedRoute>
        <Wrap><AdminProjectForm /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/projects/:id/edit',
    element: (
      <ProtectedRoute>
        <Wrap><AdminProjectForm /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/house-designs',
    element: (
      <ProtectedRoute>
        <Wrap><AdminHouseDesigns /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/house-designs/new',
    element: (
      <ProtectedRoute>
        <Wrap><AdminHouseDesignForm /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/house-designs/:id/edit',
    element: (
      <ProtectedRoute>
        <Wrap><AdminHouseDesignForm /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/company',
    element: (
      <ProtectedRoute>
        <Wrap><AdminCompany /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/services',
    element: (
      <ProtectedRoute>
        <Wrap><AdminServices /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/testimonials',
    element: (
      <ProtectedRoute>
        <Wrap><AdminTestimonials /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/team',
    element: (
      <ProtectedRoute>
        <Wrap><AdminTeam /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/highlights',
    element: (
      <ProtectedRoute>
        <Wrap><AdminHighlights /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/vlogs',
    element: (
      <ProtectedRoute>
        <Wrap><AdminVlogs /></Wrap>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/backup',
    element: (
      <ProtectedRoute>
        <Wrap><AdminBackup /></Wrap>
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <AdminProvider>
        <RouterProvider router={router} />
      </AdminProvider>
    </HelmetProvider>
  );
}

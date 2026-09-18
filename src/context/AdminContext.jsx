import { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_PROJECTS, ADMIN_CONFIG,
  COMPANY, SERVICES, TESTIMONIALS, TEAM,
  WHY_CHOOSE_US, PROCESS_STEPS, DEFAULT_PROCESS_VIDEO, DEFAULT_VLOGS,
  DEFAULT_HOUSE_DESIGNS,
} from '@/data';
import { slugify } from '@/utils/slugify';

const AdminContext = createContext(null);

const KEYS = {
  auth:         'nexbuild_admin_auth',
  projects:     'nexbuild_projects',
  company:      'nexbuild_company',
  services:     'nexbuild_services',
  testimonials: 'nexbuild_testimonials',
  team:         'nexbuild_team',
  whyChooseUs:  'nexbuild_why_choose_us',
  processSteps: 'nexbuild_process_steps',
  processVideo: 'nexbuild_process_video',
  vlogs:        'nexbuild_vlogs',
  houseDesigns: 'nexbuild_house_designs',
};

function loadOrDefault(key, defaultValue) {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : defaultValue;
  } catch { return defaultValue; }
}

let saveTimeout = null;

function save(key, value, allData) {
  // 1. Write to local storage immediately for offline cache redundancy
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Storage write failed:", e);
    if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
      alert("WARNING: Browser Storage Limit Exceeded!\nYour modifications cannot be saved locally. Please try to:\n1. Upload smaller images (we now auto-compress new uploads!)\n2. Delete old unused projects or team members\n3. Export a Backup of your data and reset settings.");
    }
  }

  // 2. Debounce writing to Express file database
  if (saveTimeout) clearTimeout(saveTimeout);
  
  saveTimeout = setTimeout(() => {
    const token = sessionStorage.getItem('nexbuild_session_token');
    if (!token) return; // Only sync with server if admin is logged in / has session!

    fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(allData)
    })
    .then(res => {
      if (!res.ok) console.warn("Failed to sync content changes with Express server database");
    })
    .catch(err => console.warn("Express server offline. Content saved inside browser cache only:", err));
  }, 1000);
}

export function AdminProvider({ children }) {
  // ── Auth ─────────────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try { return sessionStorage.getItem(KEYS.auth) === 'true'; } catch { return false; }
  });

  // ── Content State ────────────────────────────────────────
  const [company,      setCompanyState]  = useState(COMPANY);
  const [projects,     setProjectsState] = useState(DEFAULT_PROJECTS);
  const [services,     setServicesState] = useState(SERVICES);
  const [testimonials, setTestimState]   = useState(TESTIMONIALS);
  const [team,         setTeamState]     = useState(TEAM);
  const [whyChooseUs,  setWhyState]      = useState(WHY_CHOOSE_US);
  const [processSteps, setProcessState]  = useState(PROCESS_STEPS);
  const [processVideo, setProcessVideoState] = useState(DEFAULT_PROCESS_VIDEO);
  const [vlogs,        setVlogsState]    = useState(DEFAULT_VLOGS);
  const [houseDesigns, setHouseDesignsState] = useState(DEFAULT_HOUSE_DESIGNS);
  
  const [hasLoaded,    setHasLoaded]     = useState(false);

  // ── Load Content on Mount ───────────────────────────────
  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (data.isEmpty) {
          // Empty database, auto-seed with defaults
          const defaultDb = {
            company: COMPANY,
            projects: DEFAULT_PROJECTS,
            services: SERVICES,
            testimonials: TESTIMONIALS,
            team: TEAM,
            whyChooseUs: WHY_CHOOSE_US,
            processSteps: PROCESS_STEPS,
            processVideo: DEFAULT_PROCESS_VIDEO,
            vlogs: DEFAULT_VLOGS,
            houseDesigns: DEFAULT_HOUSE_DESIGNS,
          };
          fetch('/api/content?seed=true', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(defaultDb)
          }).catch(console.error);
        } else {
          // Load database data into state
          if (data.company) setCompanyState({ ...COMPANY, ...data.company, keyPeople: data.company.keyPeople ?? COMPANY.keyPeople });
          if (data.projects) setProjectsState(data.projects);
          if (data.services) setServicesState(data.services);
          if (data.testimonials) setTestimState(data.testimonials);
          if (data.team) {
            setTeamState(data.team.filter(m => !['Er. Ramesh Thapa', 'Er. Nexbuild Engineer', 'Ar. Nexbuild Architect'].includes(m.name)));
          }
          if (data.whyChooseUs) setWhyState(data.whyChooseUs);
          if (data.processSteps) setProcessState(data.processSteps);
          if (data.processVideo) setProcessVideoState(data.processVideo);
          if (data.vlogs) setVlogsState(data.vlogs);
          if (data.houseDesigns) setHouseDesignsState(data.houseDesigns);
        }
        setHasLoaded(true);
      })
      .catch(err => {
        console.warn("Express server unavailable, falling back to LocalStorage:", err);
        // Fallback to local storage values
        const storedCompany = loadOrDefault(KEYS.company, COMPANY);
        setCompanyState({ ...COMPANY, ...storedCompany, keyPeople: storedCompany.keyPeople ?? COMPANY.keyPeople });
        setProjectsState(loadOrDefault(KEYS.projects, DEFAULT_PROJECTS));
        setServicesState(loadOrDefault(KEYS.services, SERVICES));
        setTestimState(loadOrDefault(KEYS.testimonials, TESTIMONIALS));
        const rawTeam = loadOrDefault(KEYS.team, TEAM);
        setTeamState(Array.isArray(rawTeam) ? rawTeam.filter(m => !['Er. Ramesh Thapa', 'Er. Nexbuild Engineer', 'Ar. Nexbuild Architect'].includes(m.name)) : TEAM);
        setWhyState(loadOrDefault(KEYS.whyChooseUs, WHY_CHOOSE_US));
        setProcessState(loadOrDefault(KEYS.processSteps, PROCESS_STEPS));
        setProcessVideoState(loadOrDefault(KEYS.processVideo, DEFAULT_PROCESS_VIDEO));
        setVlogsState(loadOrDefault(KEYS.vlogs, DEFAULT_VLOGS));
        setHouseDesignsState(loadOrDefault(KEYS.houseDesigns, DEFAULT_HOUSE_DESIGNS));
        setHasLoaded(true);
      });
  }, []);

  // ── Sync Changes ─────────────────────────────────────────
  const allData = { company, projects, services, testimonials, team, whyChooseUs, processSteps, processVideo, vlogs, houseDesigns };

  useEffect(() => { if (hasLoaded) save(KEYS.company,      company,      allData); }, [company, hasLoaded]);
  useEffect(() => { if (hasLoaded) save(KEYS.projects,     projects,     allData); }, [projects, hasLoaded]);
  useEffect(() => { if (hasLoaded) save(KEYS.services,     services,     allData); }, [services, hasLoaded]);
  useEffect(() => { if (hasLoaded) save(KEYS.testimonials, testimonials, allData); }, [testimonials, hasLoaded]);
  useEffect(() => { if (hasLoaded) save(KEYS.team,         team,         allData); }, [team, hasLoaded]);
  useEffect(() => { if (hasLoaded) save(KEYS.whyChooseUs,  whyChooseUs,  allData); }, [whyChooseUs, hasLoaded]);
  useEffect(() => { if (hasLoaded) save(KEYS.processSteps, processSteps, allData); }, [processSteps, hasLoaded]);
  useEffect(() => { if (hasLoaded) save(KEYS.processVideo, processVideo, allData); }, [processVideo, hasLoaded]);
  useEffect(() => { if (hasLoaded) save(KEYS.vlogs,        vlogs,        allData); }, [vlogs, hasLoaded]);
  useEffect(() => { if (hasLoaded) save(KEYS.houseDesigns, houseDesigns, allData); }, [houseDesigns, hasLoaded]);

  // ── Auth ─────────────────────────────────────────────────
  async function login(username, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem(KEYS.auth, 'true');
        sessionStorage.setItem('nexbuild_session_token', data.token);
        return true;
      }
    } catch (err) {
      console.warn("Express login failed, falling back to local credentials:", err);
    }

    // Fallback offline validation
    const validUsers = ['nexbuild@gmail.com', 'nexbuild44@gmail.com', 'admin', ADMIN_CONFIG.username.toLowerCase()];
    const validPass = ['nexbuild@@2026', 'nexbuild2026', ADMIN_CONFIG.password];

    if (validUsers.includes(username.trim().toLowerCase()) && validPass.includes(password)) {
      setIsAuthenticated(true);
      sessionStorage.setItem(KEYS.auth, 'true');
      sessionStorage.setItem('nexbuild_session_token', 'nexbuild_session_token_2026');
      return true;
    }
    return false;
  }

  function logout() {
    setIsAuthenticated(false);
    sessionStorage.removeItem(KEYS.auth);
    sessionStorage.removeItem('nexbuild_session_token');
  }

  // ── Company ──────────────────────────────────────────────
  function updateCompany(updates) {
    setCompanyState(prev => ({ ...prev, ...updates }));
  }
  function resetCompany() { setCompanyState(COMPANY); }

  // ── Projects ─────────────────────────────────────────────
  function addProject(project) {
    const np = { ...project, id: project.id || slugify(project.title), gallery: project.gallery || [], featured: project.featured ?? false };
    setProjectsState(prev => [np, ...prev]);
    return np.id;
  }
  function updateProject(id, updates) {
    setProjectsState(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }
  function deleteProject(id) { setProjectsState(prev => prev.filter(p => p.id !== id)); }
  function addGalleryImage(pid, url)    { setProjectsState(prev => prev.map(p => p.id === pid ? { ...p, gallery: [...(p.gallery||[]), url] } : p)); }
  function addGalleryImages(pid, urls)   { setProjectsState(prev => prev.map(p => p.id === pid ? { ...p, gallery: [...(p.gallery||[]), ...urls] } : p)); }
  function removeGalleryImage(pid, url) { setProjectsState(prev => prev.map(p => p.id === pid ? { ...p, gallery: (p.gallery||[]).filter(g => g !== url) } : p)); }
  function resetProjects() { setProjectsState(DEFAULT_PROJECTS); }

  // ── Services ─────────────────────────────────────────────
  function addService(svc)             { setServicesState(prev => [...prev, { ...svc, id: svc.id || slugify(svc.title) }]); }
  function updateService(id, updates)  { setServicesState(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s)); }
  function deleteService(id)           { setServicesState(prev => prev.filter(s => s.id !== id)); }
  function reorderServices(newList)    { setServicesState(newList); }
  function resetServices()             { setServicesState(SERVICES); }

  // ── Testimonials ─────────────────────────────────────────
  function addTestimonial(t)           { setTestimState(prev => [...prev, { ...t, id: Date.now() }]); }
  function updateTestimonial(id, updates) { setTestimState(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t)); }
  function deleteTestimonial(id)       { setTestimState(prev => prev.filter(t => t.id !== id)); }
  function resetTestimonials()         { setTestimState(TESTIMONIALS); }

  // ── Team ─────────────────────────────────────────────────
  function addTeamMember(m)            { setTeamState(prev => [...prev, { ...m, id: Date.now() }]); }
  function updateTeamMember(id, updates) { setTeamState(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m)); }
  function deleteTeamMember(id)        { setTeamState(prev => prev.filter(m => m.id !== id)); }
  function resetTeam()                 { setTeamState(TEAM); }

  // ── Why Choose Us ────────────────────────────────────────
  function addWhyItem(item)            { setWhyState(prev => [...prev, { ...item, id: Date.now() }]); }
  function updateWhyItem(id, updates)  { setWhyState(prev => prev.map(w => (w.id === id || w.title === id) ? { ...w, ...updates } : w)); }
  function deleteWhyItem(id)           { setWhyState(prev => prev.filter(w => w.id !== id && w.title !== id)); }
  function resetWhyChooseUs()          { setWhyState(WHY_CHOOSE_US); }

  // ── Process Steps ────────────────────────────────────────
  function addProcessStep(step)        { setProcessState(prev => [...prev, { ...step, id: Date.now() }]); }
  function updateProcessStep(id, updates) { setProcessState(prev => prev.map(s => (s.id === id || s.step === id) ? { ...s, ...updates } : s)); }
  function deleteProcessStep(id)       { setProcessState(prev => prev.filter(s => s.id !== id && s.step !== id)); }
  function resetProcessSteps()         { setProcessState(PROCESS_STEPS); }

  // ── Vlogs ────────────────────────────────────────────────
  function addVlog(vlog) {
    const nv = { ...vlog, id: vlog.id || slugify(vlog.title), date: vlog.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) };
    setVlogsState(prev => [nv, ...prev]);
    return nv.id;
  }
  function updateVlog(id, updates) {
    setVlogsState(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  }
  function deleteVlog(id) {
    setVlogsState(prev => prev.filter(v => v.id !== id));
  }
  function resetVlogs() {
    setVlogsState(DEFAULT_VLOGS);
  }

  // ── House Designs ─────────────────────────────────────────
  function addHouseDesign(design) {
    const nd = { ...design, id: design.id || slugify(design.title), gallery: design.gallery || [] };
    setHouseDesignsState(prev => [nd, ...prev]);
    return nd.id;
  }
  function updateHouseDesign(id, updates) {
    setHouseDesignsState(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  }
  function deleteHouseDesign(id) {
    setHouseDesignsState(prev => prev.filter(d => d.id !== id));
  }
  function addHouseDesignGalleryImages(id, urls) {
    setHouseDesignsState(prev => prev.map(d => d.id === id ? { ...d, gallery: [...(d.gallery||[]), ...urls] } : d));
  }
  function removeHouseDesignGalleryImage(id, url) {
    setHouseDesignsState(prev => prev.map(d => d.id === id ? { ...d, gallery: (d.gallery||[]).filter(g => g !== url) } : d));
  }
  function resetHouseDesigns() {
    setHouseDesignsState(DEFAULT_HOUSE_DESIGNS);
  }

  function importAll(data) {
    if (!data) return false;
    try {
      if (data.company) setCompanyState(data.company);
      if (data.projects) setProjectsState(data.projects);
      if (data.services) setServicesState(data.services);
      if (data.testimonials) setTestimState(data.testimonials);
      if (data.team) setTeamState(data.team);
      if (data.whyChooseUs) setWhyState(data.whyChooseUs);
      if (data.processSteps) setProcessState(data.processSteps);
      if (data.vlogs) setVlogsState(data.vlogs);
      if (data.houseDesigns) setHouseDesignsState(data.houseDesigns);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function updateProcessVideo(data) {
    setProcessVideoState(prev => ({ ...prev, ...data }));
  }

  function resetProcessVideo() {
    setProcessVideoState(DEFAULT_PROCESS_VIDEO);
  }

  // ── Reset All ────────────────────────────────────────────
  function resetAll() {
    resetCompany(); resetProjects(); resetServices();
    resetTestimonials(); resetTeam(); resetWhyChooseUs(); resetProcessSteps();
    resetProcessVideo(); resetVlogs(); resetHouseDesigns();
  }

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      // Data
      company, projects, services, testimonials, team, whyChooseUs, processSteps, processVideo, vlogs, houseDesigns,
      // Company
      updateCompany, resetCompany,
      // Projects
      addProject, updateProject, deleteProject, addGalleryImage, addGalleryImages, removeGalleryImage, resetProjects,
      // Services
      addService, updateService, deleteService, reorderServices, resetServices,
      // Testimonials
      addTestimonial, updateTestimonial, deleteTestimonial, resetTestimonials,
      // Process Video
      updateProcessVideo, resetProcessVideo,
      // Team
      addTeamMember, updateTeamMember, deleteTeamMember, resetTeam,
      // Why Choose Us
      addWhyItem, updateWhyItem, deleteWhyItem, resetWhyChooseUs,
      // Process Steps
      addProcessStep, updateProcessStep, deleteProcessStep, resetProcessSteps,
      // Vlogs
      addVlog, updateVlog, deleteVlog, resetVlogs,
      // House Designs
      addHouseDesign, updateHouseDesign, deleteHouseDesign, addHouseDesignGalleryImages, removeHouseDesignGalleryImage, resetHouseDesigns,
      // Import
      importAll,
      // All
      resetAll,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    // Graceful fallback during Vite Fast Refresh hot-reloading or outside provider
    return {
      isAuthenticated: false,
      company: COMPANY,
      projects: DEFAULT_PROJECTS,
      services: SERVICES,
      testimonials: TESTIMONIALS,
      team: TEAM,
      whyChooseUs: WHY_CHOOSE_US,
      processSteps: PROCESS_STEPS,
      processVideo: DEFAULT_PROCESS_VIDEO,
      vlogs: DEFAULT_VLOGS,
      houseDesigns: DEFAULT_HOUSE_DESIGNS,
      login: () => false,
      logout: () => {},
      updateCompany: () => {},
      resetCompany: () => {},
      addProject: () => {},
      updateProject: () => {},
      deleteProject: () => {},
      addGalleryImage: () => {},
      addGalleryImages: () => {},
      removeGalleryImage: () => {},
      resetProjects: () => {},
      addService: () => {},
      updateService: () => {},
      deleteService: () => {},
      reorderServices: () => {},
      resetServices: () => {},
      addTestimonial: () => {},
      updateTestimonial: () => {},
      deleteTestimonial: () => {},
      resetTestimonials: () => {},
      updateProcessVideo: () => {},
      resetProcessVideo: () => {},
      addTeamMember: () => {},
      updateTeamMember: () => {},
      deleteTeamMember: () => {},
      resetTeam: () => {},
      addWhyItem: () => {},
      updateWhyItem: () => {},
      deleteWhyItem: () => {},
      resetWhyChooseUs: () => {},
      addProcessStep: () => {},
      updateProcessStep: () => {},
      deleteProcessStep: () => {},
      resetProcessSteps: () => {},
      addVlog: () => {},
      updateVlog: () => {},
      deleteVlog: () => {},
      resetVlogs: () => {},
      addHouseDesign: () => {},
      updateHouseDesign: () => {},
      deleteHouseDesign: () => {},
      addHouseDesignGalleryImages: () => {},
      removeHouseDesignGalleryImage: () => {},
      resetHouseDesigns: () => {},
      importAll: () => false,
      resetAll: () => {},
    };
  }
  return ctx;
}

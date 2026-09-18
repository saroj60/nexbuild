import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

// Inline SVG social icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Company Profile (PDF)', to: '/company-profile' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'House Designs', to: '/house-designs' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Footer() {
  const { company, services } = useAdmin();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: FacebookIcon, href: company.social.facebook, label: 'Facebook' },
    { Icon: InstagramIcon, href: company.social.instagram, label: 'Instagram' },
    { Icon: YoutubeIcon, href: company.social.youtube, label: 'YouTube' },
    { Icon: LinkedinIcon, href: company.social.linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      {/* WhatsApp CTA Bar */}
      <div className="bg-green-600 py-3">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2 text-white text-sm">
          <span className="font-medium">💬 Quick Questions? Chat with us on WhatsApp</span>
          <a
            href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-bold hover:underline"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            {company.whatsapp}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4" aria-label={`${company.name} - Home`}>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                <img
                  src="/logo.png"
                  alt={`${company.name} logo`}
                  className="w-11 h-11 object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white leading-tight">
                Nexbuild <span className="text-orange-400">Architects</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              {company.legalName || 'Nexbuild Architects And Construction Pvt. Ltd.'} is a Nepal-based engineering and construction company operating from its registered head office in Kathmandu, with project execution coordination in Chitwan and Pokhara.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-orange-500 hover:text-white transition-colors duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Our Services
            </h3>
            <ul className="space-y-2.5" role="list">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3.5" role="list">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <address className="not-italic text-sm text-gray-400 leading-relaxed">
                  <span className="font-semibold text-gray-300 block text-xs uppercase tracking-wider mb-0.5">Registered Office</span>
                  {company.registeredOffice || company.address}
                </address>
              </li>
              <li className="bg-gray-800/60 p-3 rounded-lg text-xs space-y-1.5 border border-gray-700/50">
                <p className="text-gray-300"><span className="text-gray-400 font-medium">Company Reg. No.:</span> <span className="font-semibold text-orange-400">{company.companyRegNo || '391105/82/83'}</span></p>
                <p className="text-gray-300"><span className="text-gray-400 font-medium">VAT No.:</span> <span className="font-semibold text-orange-400">{company.vatNo || '623604209'}</span></p>
              </li>
              <li>
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  aria-label={`Call us at ${company.phone}`}
                >
                  <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" aria-hidden="true" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  aria-label={`Email us at ${company.email}`}
                >
                  <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-green-400 transition-colors"
                  aria-label="WhatsApp us"
                >
                  <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" aria-hidden="true" />
                  WhatsApp: {company.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            &copy; {currentYear} {company.name}. All rights reserved. Kathmandu, Nepal.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <span>Reg. No: {company.companyRegNo || '391105/82/83'}</span>
            <span>VAT: {company.vatNo || '623604209'}</span>
            <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/admin/login" className="hover:text-orange-400 text-gray-400 font-medium transition-colors">
              Admin Login
            </Link>
            <span>{company.license}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

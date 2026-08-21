import { useAdmin } from '@/context/AdminContext';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle, AlertCircle,
} from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '@/utils/animations';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
};

const services = [
  'Residential Construction',
  'Commercial Construction',
  'Building Design & Planning',
  'Renovation & Remodeling',
  'Structural Construction',
  'Interior & Exterior Works',
  'Construction Consultancy',
  'Project Management',
  'Other / Not Sure',
];

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Your name is required.';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^[\d\s+\-()]{7,15}$/.test(form.phone)) errors.phone = 'Enter a valid phone number.';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.message.trim()) errors.message = 'Please describe your project.';
  else if (form.message.trim().length < 20) errors.message = 'Please provide more detail (at least 20 characters).';
  return errors;
}

export default function ContactPage() {
  const { company, services } = useAdmin();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);

    // Compile WhatsApp message text
    const cleanNumber = company.whatsapp.replace(/\D/g, '');
    const messageText = `*New Website Inquiry* 🏗️\n` +
      `----------------------------------------\n` +
      `*Name:* ${form.name.trim()}\n` +
      `*Phone:* ${form.phone.trim()}\n` +
      `*Email:* ${form.email.trim() || 'N/A'}\n` +
      `*Interest:* ${form.service.trim() || 'General Inquiry'}\n` +
      `*Message:* ${form.message.trim()}\n` +
      `----------------------------------------`;
      
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;

    // Submit and redirect
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 1000);
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:ring-red-400'
        : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400'
    }`;

  return (
    <>
      <Helmet>
        <title>Contact Us | {company.name} — Pokhara, Nepal</title>
        <meta
          name="description"
          content={`Get a free quote and consultation from ${company.name} in Pokhara. Reach us via phone at ${company.phone}, WhatsApp, email, or visit our office.`}
        />
        <meta
          name="keywords"
          content="contact construction company, builder contact Nepal, Pokhara contractor office, structural engineers phone Pokhara, building quotes Gandaki"
        />
        <link rel="canonical" href="https://zetaconstruction.com.np/contact" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zetaconstruction.com.np/contact" />
        <meta property="og:title" content={`Contact Us | ${company.name} — Pokhara, Nepal`} />
        <meta property="og:description" content={`Get in touch with ${company.name} in Pokhara, Nepal. Phone: ${company.phone}, Email: ${company.email}, address: ${company.addressShort}.`} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://zetaconstruction.com.np/contact" />
        <meta name="twitter:title" content={`Contact Us | ${company.name} — Pokhara, Nepal`} />
        <meta name="twitter:description" content={`Get in touch with ${company.name} in Pokhara, Nepal. Phone: ${company.phone}, Email: ${company.email}.`} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80" />
      </Helmet>

      {/* Page Hero */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gray-900 text-white"
        aria-label="Contact page header"
      >
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80"
          alt="Construction consultation meeting"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="eager"
        />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            Start Your Project Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-lg mx-auto text-base md:text-lg"
          >
            Reach out for a free consultation. We're available across Pokhara and Gandaki Province.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white" aria-label="Contact information and form">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeLeft}>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Contact Information</h2>

                {/* Info Cards */}
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-700" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-0.5">Office Address</p>
                      <address className="not-italic text-sm text-gray-700 leading-relaxed">{company.address}</address>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-orange-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-0.5">Phone</p>
                      <a href={`tel:${company.phone}`} className="text-sm text-gray-700 hover:text-orange-500 transition-colors font-medium">
                        {company.phone}
                      </a>
                      {company.contactPerson && (
                        <p className="text-xs text-gray-500 mt-0.5">Contact: <span className="font-semibold text-gray-700">{company.contactPerson}</span></p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-700" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-0.5">Email</p>
                      <a href={`mailto:${company.email}`} className="text-sm text-gray-700 hover:text-orange-500 transition-colors font-medium break-all">
                        {company.email}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 p-4 bg-green-50 rounded-xl group hover:bg-green-100 transition-colors"
                    aria-label="Chat on WhatsApp"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
                      <MessageCircle className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-0.5">WhatsApp</p>
                      <p className="text-sm text-gray-700 font-medium">{company.whatsapp}</p>
                      <p className="text-xs text-green-600 font-semibold">Click to chat →</p>
                    </div>
                  </a>
                </div>

                {/* Business Hours */}
                <div className="mt-6 p-5 border border-gray-100 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Business Hours</h3>
                  </div>
                  <ul className="space-y-1.5 text-sm text-gray-600" role="list">
                    <li>{company.businessHours.weekdays}</li>
                    <li>{company.businessHours.saturday}</li>
                    <li className="text-gray-400 italic">{company.businessHours.closed}</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeRight}>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Send Us a Message</h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                  >
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-2">
                      Thank you for reaching out. Our team will contact you within 24 hours.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      For faster response, reach us directly on WhatsApp.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-outline text-sm px-6 py-2.5"
                      >
                        Send Another Message
                      </button>
                      <a
                        href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition-colors text-sm"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        WhatsApp Us
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    className="space-y-5 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-red-500" aria-label="required">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Ram Sharma"
                          className={inputClass('name')}
                          aria-required="true"
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1 text-xs text-red-500 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-red-500" aria-label="required">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+977-98XXXXXXXX"
                          className={inputClass('phone')}
                          aria-required="true"
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="mt-1 text-xs text-red-500 flex items-center gap-1" role="alert">
                            <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass('email')}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-500 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Service Required
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={`${inputClass('service')} cursor-pointer`}
                      >
                        <option value="">— Select a service —</option>
                        {services.map((s) => {
                          const val = s.title || s;
                          return (
                            <option key={s.id || s} value={val}>
                              {val}
                            </option>
                          );
                        })}
                        <option value="Other / Not Sure">Other / Not Sure</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Project Details <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your project — location, size, budget range, timeline..."
                        className={`${inputClass('message')} resize-none`}
                        aria-required="true"
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-xs text-red-500 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center text-sm py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      aria-label="Submit contact form"
                    >
                      {submitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      We respond within 24 hours. For faster response, use{' '}
                      <a href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-500 font-semibold hover:underline">
                        WhatsApp
                      </a>.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>

          {/* Map */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
            className="mt-14"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Find Us in Pokhara</h2>
            <div className="rounded-2xl overflow-hidden h-72 md:h-96 border border-gray-100 shadow-sm">
              <iframe
                src={company.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zeta Construction location in Pokhara, Nepal"
                aria-label="Google Maps showing Pokhara, Nepal"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

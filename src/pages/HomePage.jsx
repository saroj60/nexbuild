import { useAdmin } from '@/context/AdminContext';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import AboutPreview from '../components/home/AboutPreview';
import ServicesPreview from '../components/home/ServicesPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ProcessSection from '../components/home/ProcessSection';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';

export default function HomePage() {
  const { company } = useAdmin();
  return (
    <>
      <Helmet>
        <title>{company.name} | Best Construction Company in Kathmandu | Top Builder in Nepal</title>
        <meta
          name="description"
          content="Nexbuild Architects is the best construction company in Kathmandu and a top construction company in Nepal. We specialize in quality house designing in Nepal, building construction, and engineering contracting services."
        />
        <meta
          name="keywords"
          content="Best construction company in Kathmandu, Top construction company in Nepal, House designing in Nepal, Builder in Nepal, Construction company in Kathmandu, Best concern construction company, Top 10 construction company, builders in Nepal, building construction Kathmandu, structural engineering Nepal"
        />
        <link rel="canonical" href="https://nexbuildarchitects.com.np/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexbuildarchitects.com.np/" />
        <meta property="og:title" content={`${company.name} | Best Construction Company in Kathmandu | Top Builder in Nepal`} />
        <meta property="og:description" content="Nexbuild Architects is the best construction company in Kathmandu, offering top-tier house designing in Nepal and quality commercial/residential construction." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://nexbuildarchitects.com.np/" />
        <meta name="twitter:title" content={`${company.name} | Best Construction Company in Kathmandu | Top Builder in Nepal`} />
        <meta name="twitter:description" content="Nexbuild Architects is the best construction company in Kathmandu, offering top-tier house designing in Nepal and quality commercial/residential construction." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" />

        {/* JSON-LD LocalBusiness & ArchitecturalFirm Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "GeneralContractor", "ArchitecturalFirm"],
            "name": company.name,
            "image": "https://nexbuildarchitects.com.np/logo.png",
            "@id": "https://nexbuildarchitects.com.np/#organization",
            "url": "https://nexbuildarchitects.com.np/",
            "telephone": company.phone || "+977 9843604439",
            "email": company.email || "nexbuild44@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": company.address || "Babarmahal (Opposite Rosebud School)",
              "addressLocality": "Kathmandu",
              "addressRegion": "Bagmati Province",
              "postalCode": "44600",
              "addressCountry": "NP"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 27.6912,
              "longitude": 85.3261
            },
            "areaServed": [
              "Kathmandu",
              "Lalitpur",
              "Bhaktapur",
              "Bagmati Province",
              "Nepal"
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "08:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.facebook.com/people/Nexbuild-Architects-Pvtltd/61591192785814/",
              "https://instagram.com/",
              "https://youtube.com/",
              "https://linkedin.com/"
            ],
            "priceRange": "NPR"
          })}
        </script>
      </Helmet>

      <Hero />
      <StatsSection />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedProjects />
      <ProcessSection />
      <Testimonials />
      <CTABanner />
    </>
  );
}

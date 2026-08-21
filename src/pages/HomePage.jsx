import { useAdmin } from '@/context/AdminContext';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import AboutPreview from '../components/home/AboutPreview';
import ServicesPreview from '../components/home/ServicesPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProcessSection from '../components/home/ProcessSection';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';

export default function HomePage() {
  const { company } = useAdmin();
  return (
    <>
      <Helmet>
        <title>{company.name} | Best Construction Company in Pokhara | Top Builder in Nepal</title>
        <meta
          name="description"
          content="Zeta Construction is the best construction company in Pokhara and a top construction company in Nepal. We specialize in quality house designing in Nepal, building construction, and engineering contracting services."
        />
        <meta
          name="keywords"
          content="Best construction company in Pokhara, Top construction company in Nepal, House designing in Nepal, Builder in Nepal, Construction company in Pokhara, Best concern construction company, Top 10 construction company, builders in Nepal, building construction Pokhara, structural engineering Nepal"
        />
        <link rel="canonical" href="https://zetaconstruction.com.np/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zetaconstruction.com.np/" />
        <meta property="og:title" content={`${company.name} | Best Construction Company in Pokhara | Top Builder in Nepal`} />
        <meta property="og:description" content="Zeta Construction is the best construction company in Pokhara, offering top-tier house designing in Nepal and quality commercial/residential construction." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://zetaconstruction.com.np/" />
        <meta name="twitter:title" content={`${company.name} | Best Construction Company in Pokhara | Top Builder in Nepal`} />
        <meta name="twitter:description" content="Zeta Construction is the best construction company in Pokhara, offering top-tier house designing in Nepal and quality commercial/residential construction." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" />

        {/* JSON-LD LocalBusiness Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": company.name,
            "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
            "@id": "https://zetaconstruction.com.np/#localbusiness",
            "url": "https://zetaconstruction.com.np/",
            "telephone": company.phone || "+977 984-6740399",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": company.address || "Pokhara, Nepal",
              "addressLocality": "Pokhara",
              "addressRegion": "Gandaki Province",
              "postalCode": "33700",
              "addressCountry": "NP"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 28.2137607,
              "longitude": 83.9754533
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.facebook.com/zetaconstructionpokhara"
            ],
            "priceRange": "$$$"
          })}
        </script>
      </Helmet>

      <Hero />
      <StatsSection />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedProjects />
      <WhyChooseUs />
      <ProcessSection />
      <Testimonials />
      <CTABanner />
    </>
  );
}

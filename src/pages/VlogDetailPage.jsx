import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations';

export default function VlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { company, vlogs } = useAdmin();
  const vlog = vlogs.find((v) => v.id === id);

  if (!vlog) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Vlog Not Found</h1>
          <p className="text-gray-500 mb-6">This vlog article doesn't exist or has been removed.</p>
          <Link to="/vlogs" className="btn-primary">← Back to Vlogs</Link>
        </div>
      </div>
    );
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: vlog.title,
        text: vlog.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }

  return (
    <>
      <Helmet>
        <title>{vlog.title} | {company.name}</title>
        <meta name="description" content={vlog.description} />
        <link rel="canonical" href={`https://zetaconstruction.com.np/vlogs/${vlog.id}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://zetaconstruction.com.np/vlogs/${vlog.id}`} />
        <meta property="og:title" content={`${vlog.title} | ${company.name}`} />
        <meta property="og:description" content={vlog.description} />
        <meta property="og:image" content={vlog.imageUrl} />
      </Helmet>

      {/* Back navigation */}
      <div className="bg-gray-50 border-b border-gray-100 pt-20">
        <div className="container-custom py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/vlogs')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-900 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vlogs
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg bg-white"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>

      <article className="py-12 bg-white min-h-screen">
        <div className="container-custom max-w-4xl">
          {/* Header info */}
          <div className="mb-6">
            <span className="inline-block bg-orange-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md mb-4">
              {vlog.category || 'General'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {vlog.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-300" />
                {vlog.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-gray-300" />
                Posted by {vlog.author}
              </span>
            </div>
          </div>

          {/* Media / Video Section */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-50">
            {vlog.videoUrl ? (
              <div className="relative aspect-video w-full">
                <iframe
                  src={vlog.videoUrl}
                  title={`${vlog.title} video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            ) : (
              <img
                src={vlog.imageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80'}
                alt={vlog.title}
                className="w-full object-cover max-h-[450px]"
              />
            )}
          </div>

          {/* Content Body */}
          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base">
            {vlog.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}

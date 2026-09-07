/**
 * Extracts the 11-character YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
export function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // youtube.com/watch?v=ID
  if (trimmed.includes('youtube.com/watch')) {
    const match = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
  }

  // youtu.be/ID
  if (trimmed.includes('youtu.be/')) {
    const match = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
  }

  // youtube.com/embed/ID
  if (trimmed.includes('youtube.com/embed/')) {
    const match = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
  }

  // youtube.com/shorts/ID
  if (trimmed.includes('youtube.com/shorts/')) {
    const match = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
  }

  // Direct 11-character ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Returns a clean YouTube embed URL with optional autoplay.
 */
export function getYouTubeEmbedUrl(url, autoplay = false) {
  const id = extractYouTubeId(url);
  if (!id) return null;
  const autoplayParam = autoplay ? '?autoplay=1&rel=0&modestbranding=1' : '?rel=0&modestbranding=1';
  return `https://www.youtube.com/embed/${id}${autoplayParam}`;
}

/**
 * Returns high-resolution YouTube video thumbnail URL.
 */
export function getYouTubeThumbnailUrl(url) {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

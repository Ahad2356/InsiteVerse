/**
 * Image Utility Helper for InsightVerse
 * Handles external image URL normalization and fallback management
 */

export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80';

/**
 * Normalizes external image URLs (Unsplash, Pinterest, Imgur, Pexels, Cloudinary, etc.)
 * Ensures clean string handling for direct image rendering
 */
export const normalizeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return DEFAULT_FALLBACK_IMAGE;
  const trimmed = url.trim();
  if (trimmed.length === 0) return DEFAULT_FALLBACK_IMAGE;

  // Check if URL is valid http/https or data URI
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/')) {
    return trimmed;
  }

  return DEFAULT_FALLBACK_IMAGE;
};

/**
 * Image Error Handler to set fallback only when external URL genuinely fails to load
 */
export const handleImageError = (e, customFallback = DEFAULT_FALLBACK_IMAGE) => {
  if (!e.target.dataset.failed) {
    e.target.dataset.failed = 'true';
    e.target.src = customFallback;
  }
};

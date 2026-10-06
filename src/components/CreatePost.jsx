import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Image as ImageIcon,
  Tag,
  FileText,
  Send,
  CheckCircle2,
  Loader2,
  Link2,
  Upload,
  CloudUpload,
  AlertCircle,
} from 'lucide-react';
import { fetchOgImage, uploadImageToCloudinary } from '../services/api';
import { normalizeImageUrl } from '../utils/imageUtils';

const sampleImages = [
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
];

export default function CreatePost({ onClose, onSubmitPost, onUpdatePost, editingPost = null }) {
  const [title, setTitle] = useState(editingPost?.title || '');
  const [category, setCategory] = useState(editingPost?.category || 'Technology');
  const [inputUrl, setInputUrl] = useState(editingPost?.imageUrl || sampleImages[0]);
  const [resolvedImageUrl, setResolvedImageUrl] = useState(editingPost?.imageUrl || sampleImages[0]);
  const [readTime, setReadTime] = useState(editingPost?.readTime || '6 mins read');
  const [tags, setTags] = useState(editingPost?.tags ? editingPost.tags.join(', ') : 'Technology, Insight, Design');
  const [content, setContent] = useState(editingPost?.content || '');
  const [isFeatured, setIsFeatured] = useState(editingPost?.isFeatured || false);

  // Mode: 'upload' or 'url'
  const [imageInputMode, setImageInputMode] = useState('upload');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const [loading, setLoading] = useState(false);
  const [resolvingImage, setResolvingImage] = useState(false);
  const [isScraped, setIsScraped] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '');
      setCategory(editingPost.category || 'Technology');
      setInputUrl(editingPost.imageUrl || sampleImages[0]);
      setResolvedImageUrl(editingPost.imageUrl || sampleImages[0]);
      setReadTime(editingPost.readTime || '6 mins read');
      setTags(editingPost.tags ? editingPost.tags.join(', ') : '');
      setContent(editingPost.content || '');
      setIsFeatured(editingPost.isFeatured || false);
      if (editingPost.imageUrl?.includes('cloudinary.com')) {
        setUploadSuccess(true);
      }
    }
  }, [editingPost]);

  // Handle direct file upload to Cloudinary
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setUploadingImage(true);
    setUploadError('');
    setUploadSuccess(false);

    // Instant local preview via FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setResolvedImageUrl(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const result = await uploadImageToCloudinary(file);
      if (result && (result.url || result.imageUrl)) {
        const cloudinaryUrl = result.url || result.imageUrl;
        setInputUrl(cloudinaryUrl);
        setResolvedImageUrl(cloudinaryUrl);
        setUploadSuccess(true);
        setIsScraped(false);
      } else {
        throw new Error('No URL returned from Cloudinary upload');
      }
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      setUploadError('Failed to upload image to Cloudinary. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle URL change & background OpenGraph Scraping
  const handleUrlInputChange = async (val) => {
    setInputUrl(val);
    setUploadSuccess(false);
    setUploadError('');

    if (!val || val.trim().length === 0) {
      setResolvedImageUrl(sampleImages[0]);
      setIsScraped(false);
      return;
    }

    const trimmed = val.trim();

    // Direct Image Link check
    const isDirectImage =
      /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(trimmed) ||
      trimmed.includes('cloudinary.com') ||
      trimmed.includes('images.unsplash.com/') ||
      trimmed.includes('i.pinimg.com/') ||
      trimmed.includes('images.pexels.com/') ||
      trimmed.includes('i.imgur.com/');

    if (isDirectImage) {
      setResolvedImageUrl(trimmed);
      setIsScraped(false);
      if (trimmed.includes('cloudinary.com')) {
        setUploadSuccess(true);
      }
      return;
    }

    // Webpage URL Scraping (Open Graph og:image)
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      setResolvingImage(true);
      try {
        const result = await fetchOgImage(trimmed);
        if (result && result.imageUrl) {
          setResolvedImageUrl(result.imageUrl);
          setIsScraped(result.isScraped || false);
        } else {
          setResolvedImageUrl(trimmed);
        }
      } catch (err) {
        setResolvedImageUrl(trimmed);
      } finally {
        setResolvingImage(false);
      }
    } else {
      setResolvedImageUrl(trimmed);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !resolvedImageUrl) return;

    setLoading(true);
    const postPayload = {
      title,
      category,
      imageUrl: resolvedImageUrl,
      coverImage: resolvedImageUrl,
      readTime,
      tags: tags.split(',').map((t) => t.trim()),
      content,
      isFeatured,
    };

    if (editingPost && onUpdatePost) {
      await onUpdatePost(editingPost._id, postPayload);
    } else {
      await onSubmitPost(postPayload);
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E6FBF6] relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#E6FBF6] hover:bg-[#06D6A0] text-[#0C4137] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#06D6A0]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0C4137]">InsightVerse Publisher</span>
        </div>
        <h2 className="text-2xl font-bold font-serif text-[#0C4137] mb-6">
          {editingPost ? 'Edit Published Article' : 'Publish New Article'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-[#0C4137]">
          {/* Article Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Article Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Neural Interfaces & Creative Thought 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#E6FBF6]/30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-medium"
            />
          </div>

          {/* Category & Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#E6FBF6]/30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-semibold"
              >
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Fashion">Fashion</option>
                <option value="Culture">Culture</option>
                <option value="Food and Drink">Food and Drink</option>
                <option value="Science">Science</option>
                <option value="Business">Business</option>
                <option value="Art">Art</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">Estimated Read Time</label>
              <input
                type="text"
                placeholder="5 mins read"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#E6FBF6]/30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-medium"
              />
            </div>
          </div>

          {/* Dual Input Mode for Cover Image (Upload File OR Paste URL) */}
          <div className="p-4 rounded-2xl bg-[#E6FBF6]/20 border border-[#06D6A0]/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#0C4137]">
                <ImageIcon className="w-4 h-4 text-[#06D6A0]" /> Cover Image *
              </label>

              {/* Mode Switching Buttons */}
              <div className="flex items-center gap-1 bg-[#E6FBF6] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setImageInputMode('upload')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    imageInputMode === 'upload'
                      ? 'bg-[#0C4137] text-white shadow-sm'
                      : 'text-[#0C4137] hover:bg-white/50'
                  }`}
                >
                  <CloudUpload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImageInputMode('url')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    imageInputMode === 'url'
                      ? 'bg-[#0C4137] text-white shadow-sm'
                      : 'text-[#0C4137] hover:bg-white/50'
                  }`}
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>Paste URL</span>
                </button>
              </div>
            </div>

            {/* Status Indicators */}
            {uploadingImage && (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0C4137] bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-[#06D6A0]" />
                <span>Uploading cover image to Cloudinary...</span>
              </div>
            )}

            {uploadSuccess && !uploadingImage && (
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 bg-emerald-100/80 border border-emerald-300 p-2.5 rounded-xl">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Cloudinary Upload Active: {selectedFileName || 'Cover Image Saved'}
                </span>
                <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                  Cloudinary Hosted
                </span>
              </div>
            )}

            {uploadError && (
              <div className="flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Option 1: File Input (Upload File) */}
            {imageInputMode === 'upload' && (
              <div>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#06D6A0]/50 rounded-2xl cursor-pointer bg-white hover:bg-[#E6FBF6]/40 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-3 pb-3">
                    <Upload className="w-7 h-7 text-[#06D6A0] mb-1 animate-bounce" />
                    <p className="text-xs font-bold text-[#0C4137]">
                      Click to choose image file <span className="font-normal text-gray-500">(or drag & drop)</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP or GIF (Uploaded via Cloudinary)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            )}

            {/* Option 2: URL Input (Paste URL) */}
            {imageInputMode === 'url' && (
              <div>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="Paste direct image link OR webpage URL (e.g. Unsplash, Pinterest)"
                    value={inputUrl}
                    onChange={(e) => handleUrlInputChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-medium pr-10"
                  />
                  <Link2 className="w-4 h-4 text-[#0C4137]/40 absolute right-3.5 top-3.5" />
                </div>
                {resolvingImage && (
                  <p className="text-[11px] text-[#0C4137] font-semibold mt-1 flex items-center gap-1 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#06D6A0]" /> Scraping webpage og:image...
                  </p>
                )}
                {isScraped && (
                  <p className="text-[11px] text-[#06D6A0] font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> OG Meta Image Extracted Successfully
                  </p>
                )}
              </div>
            )}

            {/* Live Image Preview */}
            {resolvedImageUrl && (
              <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-900 border border-[#06D6A0]/40 shadow-inner mt-3">
                <img
                  src={normalizeImageUrl(resolvedImageUrl)}
                  alt="Live Cover Preview"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = sampleImages[0];
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#0C4137]/90 text-white text-[10px] font-extrabold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 border border-white/20 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#06D6A0]" />
                  <span>
                    {uploadSuccess
                      ? 'Cloudinary Live Preview'
                      : isScraped
                      ? 'Extracted OG Image Preview'
                      : 'Live Image Preview Active'}
                  </span>
                </div>
              </div>
            )}

            {/* Sample Presets Selector */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 pt-2 border-t border-gray-200/60">
              <span className="text-[10px] font-bold text-[#0C4137]/60 shrink-0">Sample Presets:</span>
              {sampleImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setInputUrl(img);
                    setResolvedImageUrl(img);
                    setIsScraped(false);
                    setUploadSuccess(false);
                  }}
                  className={`w-10 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-transform ${
                    resolvedImageUrl === img ? 'border-[#06D6A0] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="preset" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#06D6A0]" /> Tags (Comma separated)
            </label>
            <input
              type="text"
              placeholder="Technology, AI, Innovation"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#E6FBF6]/30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-medium"
            />
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-[#06D6A0] focus:ring-[#06D6A0]"
            />
            <label htmlFor="isFeatured" className="text-xs font-bold text-[#0C4137]">
              Feature on Homepage Carousel
            </label>
          </div>

          {/* Article Content */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#06D6A0]" /> Full Story Content *
            </label>
            <textarea
              rows="5"
              required
              placeholder="Write the full story content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#E6FBF6]/30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-medium resize-none"
            ></textarea>
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6FBF6]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-[#0C4137] bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || resolvingImage || uploadingImage}
              className="bg-[#0C4137] hover:bg-[#072A23] text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-[#06D6A0]" />
              <span>
                {loading
                  ? 'Saving...'
                  : uploadingImage
                  ? 'Uploading Image...'
                  : editingPost
                  ? 'Update Article'
                  : 'Publish Article'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

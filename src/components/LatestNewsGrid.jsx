import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, Eye, Heart, Play, Bookmark } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';

export default function LatestNewsGrid({ posts = [], onSelectPost, onLikePost, onSelectAuthor }) {

  const mainPost = posts[0] || {
    _id: 'default_1',
    title: 'Canvas & Couture: Art-Inspired Runways 2025',
    category: 'Fashion',
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'How contemporary painters and sculptors are directly influencing modern haute couture design lines across European runways.',
    author: { name: 'Evara Rose', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  };

  const sidePost1 = posts[1] || {
    _id: 'default_2',
    title: "Palette & Pattern: Art's Role in Fashion",
    category: 'Art',
    readTime: '5 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    comments: [1, 2],
    views: 162,
  };

  const sidePost2 = posts[2] || {
    _id: 'default_3',
    title: 'Urban Renaissance: Streetwear as Art',
    category: 'Sports',
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    comments: [1],
    views: 162,
  };

  const bottomPost1 = posts[3] || {
    _id: 'default_4',
    title: 'Gallery to Garment: Art Meets Design',
    category: 'Lifestyle',
    tags: ['Model'],
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    excerpt: 'When brushstrokes inspire hemlines and canvases shape silhouettes, the result is a striking fusion of visual art and fashion design.',
    author: { name: 'Eleanor Pena', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    views: 162,
    comments: Array(96).fill(0),
    likes: 98,
  };

  const bottomPost2 = posts[4] || {
    _id: 'default_5',
    title: 'Sustainable Eating in a Climate-Conscious World',
    category: 'Food and Drink',
    tags: ['Health', 'Food'],
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    excerpt: 'As climate concerns grow, our plates are becoming powerful tools for change. Sustainable eating — centered on plant-based choices, local sourcing, and reducing food waste.',
    author: { name: 'Bessie Cooper', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    views: 162,
    comments: Array(98).fill(0),
    likes: 98,
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#E6FBF6] shadow-sm flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#06D6A0] animate-pulse" />
          <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0C4137]">
            Latest Perspectives
          </h2>
          <span className="text-xs text-[#0C4137]/60 font-sans hidden sm:inline ml-2">
            Real-Time Curated Journalism
          </span>
        </div>

        <button className="bg-[#0C4137] hover:bg-[#072A23] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-md">
          <span>View All</span>
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-2.5 h-2.5 text-[#06D6A0]" />
          </div>
        </button>
      </div>

      {/* Top News Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Left Column: Large Hero Card */}
        <div
          onClick={() => onSelectPost(mainPost)}
          className="lg:col-span-2 group relative rounded-3xl overflow-hidden min-h-[420px] bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end p-6 border border-[#E6FBF6] transform hover:-translate-y-1"
        >
          <img
            src={normalizeImageUrl(mainPost.coverImage || mainPost.imageUrl)}
            alt={mainPost.title}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

          {/* Bottom Overlay Card */}
          <div className="relative z-10 p-6 rounded-2xl glass-card border border-white/40">
            <span className="bg-[#06D6A0] text-[#0C4137] font-bold text-[10px] uppercase px-3 py-1 rounded-full inline-block mb-3 shadow-sm">
              {mainPost.category || 'Fashion'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0C4137] leading-snug mb-3 group-hover:text-[#06D6A0] transition-colors">
              {mainPost.title}
            </h3>

            <div className="flex items-center justify-between text-xs font-semibold text-[#0C4137]/80 pt-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectAuthor) {
                    onSelectAuthor(mainPost.author || { name: mainPost.author?.name || 'Evara Rose', _id: mainPost.authorId });
                  }
                }}
                className="flex items-center gap-2 hover:text-[#06D6A0] transition-colors cursor-pointer"
                title="View Author Profile"
              >
                <img
                  src={normalizeImageUrl(mainPost.author?.avatar)}
                  alt={mainPost.author?.name}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-[#06D6A0]"
                />
                <span className="font-bold underline underline-offset-2">{mainPost.author?.name || 'Evara Rose'}</span>
                <span>•</span>
                <span className="no-underline">{mainPost.readTime || '6 mins read'}</span>
              </div>


              <div className="w-8 h-8 rounded-full bg-white text-[#0C4137] flex items-center justify-center group-hover:bg-[#06D6A0] transition-colors shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 2 Stacked Cards */}
        <div className="flex flex-col gap-6">
          {[sidePost1, sidePost2].map((post, idx) => (
            <div
              key={post._id || idx}
              onClick={() => onSelectPost(post)}
              className="group bg-white/90 backdrop-blur-md rounded-3xl p-4 border border-[#E6FBF6] hover:border-[#06D6A0] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-4 items-center transform hover:-translate-y-1"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100">
                <img
                  src={normalizeImageUrl(post.coverImage || post.imageUrl)}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-col justify-between h-full py-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase text-[#0C4137] bg-[#E6FBF6] px-2 py-0.5 rounded-full">
                      {post.category || 'Art'}
                    </span>
                    <span className="text-[10px] text-[#0C4137]/60">• {post.readTime || '5 mins read'}</span>
                  </div>
                  <h4 className="text-sm font-bold font-serif text-[#0C4137] line-clamp-2 leading-snug group-hover:text-[#06D6A0] transition-colors">
                    {post.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-3 text-[11px] text-[#0C4137]/60 font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> {post.comments ? post.comments.length : 98}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {post.views || 162}
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-[#E6FBF6] group-hover:bg-[#06D6A0] text-[#0C4137] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid: 2 Large Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[bottomPost1, bottomPost2].map((post, idx) => (
          <div
            key={post._id || idx}
            onClick={() => onSelectPost(post)}
            className="group bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#E6FBF6] hover:border-[#06D6A0] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1"
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#E6FBF6] text-[#0C4137] font-bold text-[10px] uppercase px-3 py-1 rounded-full">
                    {post.category || 'Lifestyle'}
                  </span>
                  {post.tags && post.tags.map((t) => (
                    <span key={t} className="bg-slate-100 text-[#0C4137]/70 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                  <span className="text-xs text-[#0C4137]/60">• {post.readTime || '6 mins read'}</span>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); }} 
                  className="text-[#0C4137]/50 hover:text-[#06D6A0]"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold font-serif text-[#0C4137] mb-3 leading-snug group-hover:text-[#06D6A0] transition-colors">
                {post.title}
              </h3>

              {/* Featured Image Container */}
              <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video bg-slate-100">
                <img
                  src={normalizeImageUrl(post.coverImage || post.imageUrl)}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {idx === 0 && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-[#0C4137] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5 text-[#06D6A0]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <p className="text-xs text-[#0C4137]/80 line-clamp-2 leading-relaxed mb-6 font-medium">
                {post.excerpt}
              </p>
            </div>

            {/* Author & Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E6FBF6]">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectAuthor) {
                    onSelectAuthor(post.author || { name: post.author?.name || 'Eleanor Pena', _id: post.authorId });
                  }
                }}
                className="flex items-center gap-2 hover:text-[#06D6A0] transition-colors cursor-pointer group/author"
                title="View Author Profile"
              >
                <img
                  src={normalizeImageUrl(post.author?.avatar)}
                  alt={post.author?.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[#06D6A0] group-hover/author:scale-105 transition-transform"
                />
                <div>
                  <span className="text-xs font-bold text-[#0C4137] block leading-none group-hover/author:text-[#06D6A0] transition-colors">
                    {post.author?.name || 'Eleanor Pena'}
                  </span>
                  <span className="text-[10px] text-[#0C4137]/60">Insight Contributor</span>
                </div>
              </div>


              <div className="flex items-center gap-4 text-xs text-[#0C4137]/70 font-semibold">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLikePost(post._id);
                  }}
                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                  <span>{post.likes || 98}</span>
                </button>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.comments ? post.comments.length : 96}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{post.views || 162}</span>
                </span>

                <div className="w-7 h-7 rounded-full bg-[#E6FBF6] group-hover:bg-[#06D6A0] text-[#0C4137] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

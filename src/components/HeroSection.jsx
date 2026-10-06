import React from 'react';
import { Bookmark, MessageSquare, Eye, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';

export default function HeroSection({ featuredPosts = [], onSelectPost, onSelectAuthor }) {
  const displayPosts = featuredPosts.length > 0 ? featuredPosts.slice(0, 3) : [];

  return (
    <section className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* 3D Floating Abstract Geometric Orbs Background */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-[#06D6A0]/15 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-4 right-10 w-80 h-80 bg-[#0C4137]/10 rounded-full blur-3xl pointer-events-none animate-float-reverse"></div>
      
      {/* Floating 3D Badge Accent */}
      <div className="hidden lg:flex items-center gap-2 absolute top-6 right-16 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#06D6A0]/40 shadow-lg shadow-[#06D6A0]/10 animate-float z-10 text-xs font-bold text-[#0C4137]">
        <Sparkles className="w-4 h-4 text-[#06D6A0]" />
        <span>3D Interactive Journal</span>
      </div>

      {/* Main Headline Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#E6FBF6] border border-[#06D6A0]/40 text-[#0C4137] px-4 py-1.5 rounded-full text-xs font-extrabold mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#06D6A0] animate-ping"></span>
          <span>Explore Future Perspectives</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-[#0C4137] tracking-tight leading-none mb-4">
          Your Gateway to Global Ideas
        </h1>
        <p className="text-base sm:text-lg font-medium text-[#0C4137]/75 max-w-2xl mx-auto">
          Delivering high-impact journalism on AI, sustainable design, technology, and haute couture.
        </p>
      </div>

      {/* 3D Featured Glassmorphism Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 perspective-1000">
        {displayPosts.map((post, idx) => (
          <div
            key={post._id || idx}
            onClick={() => onSelectPost(post)}
            className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#E6FBF6] bg-slate-900 flex flex-col justify-end min-h-[470px] transform hover:-translate-y-2 hover:rotate-1"
          >
            {/* Background Image */}
            <img
              src={normalizeImageUrl(post.coverImage || post.imageUrl)}
              alt={post.title}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.88]"
            />
            
            {/* Top Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

            {/* Frosted Glass Overlay Card at Bottom */}
            <div className="relative z-10 m-4 p-5 rounded-2xl glass-card border border-white/40 shadow-xl transition-transform duration-300 group-hover:translate-y-[-4px]">
              
              {/* Bookmark Floating Icon */}
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/70 hover:bg-[#06D6A0] text-[#0C4137] transition-colors"
                title="Bookmark story"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              {/* Category & Read Time */}
              <div className="flex items-center gap-2 mb-2 text-[11px] font-bold text-[#0C4137]/80 flex-wrap">
                <span className="bg-[#0C4137] text-white px-2.5 py-0.5 rounded-full uppercase text-[10px] tracking-wider shadow-sm">
                  {post.category || 'Lifestyle'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-[#0C4137]">
                  <Clock className="w-3 h-3 text-[#06D6A0]" />
                  {post.readTime || '6 mins read'}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold font-serif text-[#0C4137] leading-snug mb-2 group-hover:text-[#06D6A0] transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Author Trigger */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectAuthor) {
                    onSelectAuthor(post.author || { name: post.author?.name || 'Evara Rose', _id: post.authorId });
                  }
                }}
                className="flex items-center gap-2 my-2 text-xs font-bold text-[#0C4137] hover:text-[#06D6A0] transition-colors cursor-pointer w-fit"
                title="View Author Profile"
              >
                <img
                  src={normalizeImageUrl(post.author?.avatar)}
                  alt={post.author?.name}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover ring-2 ring-[#06D6A0]"
                />
                <span className="underline underline-offset-2">{post.author?.name || 'Evara Rose'}</span>
              </div>

              {/* Excerpt */}
              <p className="text-xs text-[#0C4137]/80 line-clamp-2 mb-4 font-medium leading-relaxed">
                {post.excerpt}
              </p>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[#0C4137]/10">
                <div className="flex items-center gap-4 text-xs font-semibold text-[#0C4137]/70">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#0C4137]" />
                    {post.comments ? post.comments.length : 98}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#0C4137]" />
                    {post.views || 162}
                  </span>
                </div>

                {/* Circular Arrow Button */}
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0C4137] group-hover:bg-[#06D6A0] transition-colors shadow-sm">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


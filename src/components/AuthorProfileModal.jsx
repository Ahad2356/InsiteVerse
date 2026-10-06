import React from 'react';
import { X, Sparkles, BookOpen, Heart, Eye, Calendar, Edit, Trash2, UserCheck, ShieldAlert } from 'lucide-react';
import { normalizeImageUrl } from '../utils/imageUtils';

export default function AuthorProfileModal({
  author,
  allPosts = [],
  onClose,
  onSelectPost,
  currentUser,
  onEditPost,
  onDeletePost,
}) {
  if (!author) return null;

  // Filter posts belonging to this author
  const authorPosts = allPosts.filter((post) => {
    if (author._id && post.authorId === author._id) return true;
    if (author.name && post.author?.name?.toLowerCase() === author.name.toLowerCase()) return true;
    return false;
  });

  const totalLikes = authorPosts.reduce((acc, p) => acc + (p.likes || 0), 0);
  const totalViews = authorPosts.reduce((acc, p) => acc + (p.views || 0), 0);

  // Security Check: Is the currently logged in user the owner of this author profile?
  const isOwner =
    currentUser &&
    (currentUser._id === author._id ||
      currentUser.id === author._id ||
      currentUser.name?.toLowerCase() === author.name?.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-[#E6FBF6] relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#E6FBF6] hover:bg-[#06D6A0] text-[#0C4137] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Author Header Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0C4137] to-[#072A23] p-6 sm:p-8 text-white relative overflow-hidden mb-8 shadow-lg">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 rounded-full bg-[#06D6A0]/10 blur-2xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
            <img
              src={author.avatar || author.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={author.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-[#06D6A0] shadow-xl shrink-0"
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
              }}
            />

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#06D6A0]">Verified Author</span>
                {isOwner && (
                  <span className="text-[10px] font-extrabold bg-[#06D6A0] text-[#0C4137] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> Your Profile
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif">{author.name || author.author?.name}</h2>
              <p className="text-xs text-[#06D6A0] font-semibold">{author.role || author.author?.role || 'Senior Journalist'}</p>
              <p className="text-sm text-gray-200/90 leading-relaxed max-w-2xl">
                {author.bio || author.author?.bio || 'Senior Journalist and contributor at InsightVerse Magazine.'}
              </p>

              {/* Stats Bar */}
              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-6 text-xs text-gray-300">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#06D6A0]" />
                  <span className="font-bold text-white">{authorPosts.length}</span> Articles Published
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#06D6A0]" />
                  <span className="font-bold text-white">{totalLikes}</span> Total Appreciation Likes
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#06D6A0]" />
                  <span className="font-bold text-white">{totalViews}</span> Total Article Views
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title & Security Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-[#E6FBF6] gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#06D6A0]" />
            <h3 className="text-xl font-bold font-serif text-[#0C4137]">
              Published Stories by {author.name || author.author?.name}
            </h3>
          </div>

          {!isOwner && (
            <div className="text-[11px] font-semibold text-gray-500 flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Read-only mode (Only the author can edit/delete)
            </div>
          )}
        </div>

        {/* Author Articles Grid */}
        {authorPosts.length === 0 ? (
          <div className="text-center py-12 bg-[#E6FBF6]/30 rounded-2xl border border-dashed border-[#06D6A0]/40">
            <BookOpen className="w-12 h-12 text-[#06D6A0] mx-auto mb-3 opacity-60" />
            <p className="text-base font-bold text-[#0C4137]">No published articles yet</p>
            <p className="text-xs text-[#0C4137]/60 mt-1">This author hasn't published any stories on InsightVerse yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {authorPosts.map((post) => (
              <div
                key={post._id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E6FBF6] hover:border-[#06D6A0] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectPost(post);
                  }}
                >
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={normalizeImageUrl(post.imageUrl)}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0C4137]/90 text-white text-[10px] font-extrabold px-3 py-1 rounded-full backdrop-blur-md">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-[#0C4137]/60 font-semibold">
                      <Calendar className="w-3 h-3 text-[#06D6A0]" />
                      <span>{new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="font-serif font-bold text-[#0C4137] text-base group-hover:text-[#06D6A0] transition-colors line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-xs text-[#0C4137]/75 line-clamp-2">{post.excerpt || post.content}</p>
                  </div>
                </div>

                {/* Footer Controls - EDIT/DELETE ALLOWED ONLY FOR THE ORIGINAL AUTHOR */}
                <div className="px-4 py-3 bg-[#E6FBF6]/30 border-t border-[#E6FBF6] flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#0C4137]/70 font-semibold">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#06D6A0]" /> {post.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-[#06D6A0]" /> {post.views || 0}
                    </span>
                  </div>

                  {/* SECURITY RULE: Only original author sees Edit/Delete */}
                  {isOwner ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                          if (onEditPost) onEditPost(post);
                        }}
                        className="p-1.5 rounded-lg bg-[#06D6A0]/20 hover:bg-[#06D6A0] text-[#0C4137] transition-colors flex items-center gap-1 text-[11px] font-bold"
                        title="Edit Article"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onDeletePost) onDeletePost(post._id);
                        }}
                        className="p-1.5 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white text-red-600 transition-colors flex items-center gap-1 text-[11px] font-bold"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] text-[#0C4137]/50 font-bold uppercase tracking-wider">
                      Visitor View Mode
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, Heart, MessageSquare, Share2, Eye, Calendar, Clock, Send, User, Lock } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';

export default function PostDetailModal({ post, onClose, onLike, onAddComment, currentUser, onRequireAuth, onSelectAuthor }) {
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!post) return null;

  const handleLikeClick = () => {
    if (!currentUser) {
      onRequireAuth('Please sign in or register to like articles.');
      return;
    }
    onLike(post._id);
  };

  const handleAuthorClick = () => {
    if (onSelectAuthor) {
      const authorObj = post.author
        ? { _id: post.authorId, ...post.author }
        : { _id: post.authorId, name: 'Evara Rose' };
      onClose();
      onSelectAuthor(authorObj);
    }
  };


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      onRequireAuth('Please sign in or register to publish comments.');
      return;
    }
    if (!commentText.trim()) return;

    setSubmitting(true);
    await onAddComment(post._id, {
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: commentText.trim(),
    });
    setCommentText('');
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E6FBF6] relative">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 ml-auto p-2.5 rounded-full bg-white/90 hover:bg-[#06D6A0] text-[#0C4137] shadow-lg transition-colors z-20 flex items-center justify-center float-right mr-4"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header - Strict External URL Rendering */}
        <div className="relative w-full h-80 sm:h-96 rounded-t-3xl overflow-hidden bg-slate-900">
          <img
            src={normalizeImageUrl(post.coverImage || post.imageUrl)}
            alt={post.title}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="bg-[#06D6A0] text-[#0C4137] font-bold text-xs uppercase px-3 py-1 rounded-full inline-block mb-3">
              {post.category || 'Article'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight mb-2">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs font-semibold text-white/90 flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#06D6A0]" />
                {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#06D6A0]" />
                {post.readTime || '6 mins read'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#06D6A0]" />
                {post.views || 1} Views
              </span>
            </div>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="p-6 sm:p-10 text-[#0C4137]">
          
          {/* Author Card */}
          <div
            onClick={handleAuthorClick}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#E6FBF6]/60 border border-[#06D6A0]/30 hover:border-[#06D6A0] transition-all cursor-pointer mb-8 group"
          >
            <div className="flex items-center gap-3">
              <img
                src={normalizeImageUrl(post.author?.avatar)}
                alt={post.author?.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#06D6A0] group-hover:scale-105 transition-transform"
              />
              <div>
                <h4 className="font-bold text-sm text-[#0C4137] group-hover:text-[#06D6A0] transition-colors flex items-center gap-1.5">
                  <span>{post.author?.name || 'Evara Rose'}</span>
                  <span className="text-[10px] font-bold text-[#06D6A0] bg-[#0C4137] px-2 py-0.5 rounded-full">
                    View Author Profile
                  </span>
                </h4>
                <p className="text-xs text-[#0C4137]/70 font-medium">{post.author?.role || 'InsightVerse Author'}</p>
              </div>
            </div>


            <div className="flex items-center gap-2">
              <button
                onClick={handleLikeClick}
                className="bg-white hover:bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
              >
                <Heart className="w-4 h-4 fill-current text-red-500" />
                <span>{post.likes || 0} Likes</span>
              </button>

              <button className="p-2.5 rounded-full bg-white hover:bg-[#06D6A0] text-[#0C4137] border border-[#06D6A0]/30 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Excerpt Lead */}
          {post.excerpt && (
            <p className="text-lg font-serif italic text-[#0C4137]/90 leading-relaxed border-l-4 border-[#06D6A0] pl-4 mb-8 bg-[#E6FBF6]/30 py-3 rounded-r-xl">
              "{post.excerpt}"
            </p>
          )}

          {/* Main Content Render */}
          <div className="prose max-w-none text-sm sm:text-base font-sans text-[#0C4137]/90 leading-relaxed whitespace-pre-line mb-10 space-y-4">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-10 flex-wrap">
              <span className="text-xs font-bold text-[#0C4137]/60">Tags:</span>
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold bg-[#E6FBF6] text-[#0C4137] px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Comment Section */}
          <div className="border-t border-[#E6FBF6] pt-8">
            <h3 className="text-xl font-bold font-serif text-[#0C4137] mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#06D6A0]" />
              Comments ({post.comments ? post.comments.length : 0})
            </h3>

            {/* Comment Form / Auth Prompt */}
            {currentUser ? (
              <form onSubmit={handleCommentSubmit} className="bg-[#E6FBF6]/40 p-4 sm:p-5 rounded-2xl border border-[#06D6A0]/20 mb-8 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <img src={normalizeImageUrl(currentUser.avatar)} alt="me" referrerPolicy="no-referrer" className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-xs font-bold text-[#0C4137]">{currentUser.name}</span>
                </div>

                <div className="flex gap-2">
                  <textarea
                    rows="3"
                    placeholder="Share your thoughts on this article..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    className="w-full bg-white text-xs sm:text-sm text-[#0C4137] p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#0C4137] hover:bg-[#072A23] text-white px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all hover:scale-105 shrink-0"
                  >
                    <Send className="w-4 h-4 text-[#06D6A0]" />
                    <span className="hidden sm:inline">Post</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-[#E6FBF6] p-5 rounded-2xl border border-[#06D6A0]/40 text-center mb-8 flex flex-col items-center">
                <Lock className="w-6 h-6 text-[#0C4137] mb-2" />
                <p className="text-xs font-bold text-[#0C4137] mb-1">Join the conversation</p>
                <p className="text-[11px] text-[#0C4137]/70 mb-3">You must be signed in to post comments or like articles.</p>
                <button
                  onClick={() => onRequireAuth('Please sign in or register to comment.')}
                  className="bg-[#0C4137] hover:bg-[#072A23] text-white px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <User className="w-3.5 h-3.5 text-[#06D6A0]" /> Sign In / Register
                </button>
              </div>
            )}

            {/* Existing Comments List */}
            <div className="space-y-4">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((c, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-[#E6FBF6] shadow-sm flex gap-3">
                    <img
                      src={normalizeImageUrl(c.userAvatar)}
                      alt={c.userName}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-[#06D6A0] shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#0C4137]">{c.userName || 'Reader'}</span>
                        <span className="text-[10px] text-[#0C4137]/50">
                          {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Just now'}
                        </span>
                      </div>
                      <p className="text-xs text-[#0C4137]/80 font-medium leading-relaxed">
                        {c.content}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#0C4137]/50 italic text-center py-4">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

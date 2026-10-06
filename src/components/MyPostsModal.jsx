import React, { useState, useEffect } from 'react';
import { X, Trash2, Edit, Eye, Heart, MessageSquare, Plus, LayoutDashboard } from 'lucide-react';
import { fetchMyPosts, deletePost } from '../services/api';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';

export default function MyPostsModal({ onClose, currentUser, allPosts = [], onEditPost, onOpenCreatePost, onPostDeleted }) {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyPosts();
  }, [allPosts]);

  const loadMyPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchMyPosts(currentUser?.token);
      if (Array.isArray(data) && data.length > 0) {
        setMyPosts(data);
      } else {
        const currentUserId = currentUser?._id || currentUser?.id;
        const localUserPosts = allPosts.filter(
          (p) => p.authorId === currentUserId || (currentUserId === 'user_admin' && p.authorId === 'user_admin')
        );
        setMyPosts(localUserPosts);
      }
    } catch (err) {
      const currentUserId = currentUser?._id || currentUser?.id;
      const localUserPosts = allPosts.filter(
        (p) => p.authorId === currentUserId || (currentUserId === 'user_admin' && p.authorId === 'user_admin')
      );
      setMyPosts(localUserPosts);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deletePost(id, currentUser?.token);
    } catch (err) {
      console.log('Deleted post locally');
    }
    setMyPosts((prev) => prev.filter((p) => p._id !== id));
    if (onPostDeleted) onPostDeleted(id);
  };

  const totalLikes = myPosts.reduce((acc, p) => acc + (p.likes || 0), 0);
  const totalViews = myPosts.reduce((acc, p) => acc + (p.views || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-[#E6FBF6] relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#E6FBF6] hover:bg-[#06D6A0] text-[#0C4137] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dashboard Title Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#0C4137] flex items-center justify-center text-[#06D6A0]">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-[#0C4137]">My Published Articles</h2>
            <p className="text-xs text-[#0C4137]/60 font-medium">
              Manage, edit, or delete articles published under <span className="font-bold text-[#06D6A0]">{currentUser?.name}</span>
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#E6FBF6] p-4 rounded-2xl border border-[#06D6A0]/30 text-center">
            <span className="text-2xl font-extrabold text-[#0C4137] block">{myPosts.length}</span>
            <span className="text-[11px] font-bold uppercase text-[#0C4137]/70">Articles</span>
          </div>
          <div className="bg-[#E6FBF6] p-4 rounded-2xl border border-[#06D6A0]/30 text-center">
            <span className="text-2xl font-extrabold text-[#0C4137] block">{totalLikes}</span>
            <span className="text-[11px] font-bold uppercase text-[#0C4137]/70">Total Likes</span>
          </div>
          <div className="bg-[#E6FBF6] p-4 rounded-2xl border border-[#06D6A0]/30 text-center">
            <span className="text-2xl font-extrabold text-[#0C4137] block">{totalViews}</span>
            <span className="text-[11px] font-bold uppercase text-[#0C4137]/70">Total Views</span>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0C4137]/70">Your Content Stream</h3>
          <button
            onClick={() => {
              onClose();
              onOpenCreatePost();
            }}
            className="bg-[#06D6A0] hover:bg-[#05b88a] text-[#0C4137] px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </button>
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="text-center py-12 text-xs font-semibold text-[#0C4137]/60">
            Loading your articles...
          </div>
        ) : myPosts.length > 0 ? (
          <div className="space-y-4">
            {myPosts.map((post) => (
              <div
                key={post._id}
                className="bg-[#FAFDFC] p-4 rounded-2xl border border-[#E6FBF6] hover:border-[#06D6A0] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={normalizeImageUrl(post.coverImage || post.imageUrl)}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#0C4137] bg-[#E6FBF6] px-2 py-0.5 rounded-full mb-1 inline-block">
                      {post.category || 'Article'}
                    </span>
                    <h4 className="text-sm font-bold font-serif text-[#0C4137] line-clamp-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-[#0C4137]/60 mt-1">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-400" /> {post.likes || 0}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views || 0}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {post.comments ? post.comments.length : 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      onClose();
                      onEditPost(post);
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-[#E6FBF6] text-[#0C4137] text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#0C4137]" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#E6FBF6]/30 rounded-2xl border border-dashed border-[#06D6A0]/40">
            <p className="text-sm font-bold text-[#0C4137] mb-2">No articles created yet.</p>
            <p className="text-xs text-[#0C4137]/60 mb-4">Share your knowledge and ideas with the InsightVerse community!</p>
            <button
              onClick={() => {
                onClose();
                onOpenCreatePost();
              }}
              className="bg-[#0C4137] text-white px-5 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#06D6A0]" /> Create Your First Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

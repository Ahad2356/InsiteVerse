import React, { useState, useEffect } from 'react';
import TopTicker from './components/TopTicker';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryBar from './components/CategoryBar';
import LatestNewsGrid from './components/LatestNewsGrid';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import PostDetailModal from './components/PostDetailModal';
import CreatePostModal from './components/CreatePostModal';
import MyPostsModal from './components/MyPostsModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import AuthorProfileModal from './components/AuthorProfileModal';

import {
  fetchPosts,
  likePost as apiLikePost,
  addComment as apiAddComment,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  updateUserProfile,
  deletePost as apiDeletePost,
} from './services/api';

const fallbackPosts = [
  {
    _id: 'post_1',
    title: 'Textile Storytelling in Modern Fashion',
    category: 'Lifestyle',
    tags: ['Lifestyle', 'Fashion', 'Art'],
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    excerpt: "In today's fashion landscape, textiles are more than just fabric - they're vessels of culture, history, and personal identity.",
    content: `Fashion has transcended mere utility to become a dynamic storytelling canvas. Across global capitals, designers are leaning into ancient weaving techniques, sustainable organic dyes, and high-tech fiber innovations to tell poignant stories of heritage and environmental stewardship.

In this deep dive on InsightVerse, we explore how modern haute couture houses combine heritage craft with zero-waste tailoring.`,
    authorId: 'user_admin',
    author: { name: 'Evara Rose', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'Fashion Editor', bio: 'Senior Design & Tech Journalist at InsightVerse.' },
    isFeatured: true,
    likes: 98,
    views: 162,
    comments: [{ userName: 'Sophia Chen', userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', content: 'Fascinating article! The connection between zero-waste weaving and haute couture is so inspiring.' }],
  },
  {
    _id: 'post_2',
    title: 'Museums x Couture: A New Collaboration',
    category: 'Culture',
    tags: ['Culture', 'Art'],
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Where history meets high fashion, a new wave of collaboration is redefining both art and style.',
    content: `Prestigious institutions like the Louvre, the Met, and London's V&A are opening their archives to visionaries in contemporary fashion design.`,
    authorId: 'user_admin',
    author: { name: 'Bessie Cooper', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', role: 'Cultural Critic', bio: 'Cultural Critic and Arts Correspondent.' },
    isFeatured: true,
    likes: 98,
    views: 162,
    comments: [],
  },
  {
    _id: 'post_3',
    title: 'Neural Interfaces & The Future of Creative Thought',
    category: 'Technology',
    tags: ['Technology', 'AI'],
    readTime: '8 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How emerging generative AI algorithms and brain-computer interfaces are expanding human expression and artistic horizons.',
    content: `Artificial intelligence is evolving from a passive assistant into a collaborative creative partner. Designers are utilizing generative algorithms to generate complex bio-mimetic patterns in real time on InsightVerse.`,
    authorId: 'user_admin',
    author: { name: 'Eleanor Pena', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', role: 'Tech Editor', bio: 'Senior Technology & AI Editor.' },
    isFeatured: true,
    likes: 210,
    views: 450,
    comments: [],
  },
  {
    _id: 'post_4',
    title: 'Canvas & Couture: Art-Inspired Runways 2025',
    category: 'Fashion',
    tags: ['Fashion', 'Art'],
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How contemporary painters and sculptors are directly influencing modern haute couture design lines across European runways.',
    content: `Bold chromatic strokes, sculpted shoulder pads, and surrealist motifs dominated Paris Fashion Week.`,
    authorId: 'user_admin',
    author: { name: 'Evara Rose', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'Fashion Editor' },
    isFeatured: false,
    likes: 142,
    views: 320,
    comments: [],
  },
  {
    _id: 'post_5',
    title: "Palette & Pattern: Art's Role in Fashion",
    category: 'Art',
    tags: ['Art', 'Design'],
    readTime: '5 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Exploring color theory in avant-garde fashion and architectural tailoring.',
    content: `Color is not merely aesthetic; it communicates psychological mood and cultural shifts.`,
    authorId: 'user_admin',
    author: { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', role: 'Creative Director' },
    isFeatured: false,
    likes: 98,
    views: 162,
    comments: [],
  },
  {
    _id: 'post_6',
    title: 'Urban Renaissance: Streetwear as Art',
    category: 'Sports',
    tags: ['Sports', 'Culture'],
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How metropolitan subcultures transformed functional street garments into gallery-worthy art pieces.',
    content: `Streetwear was once born out of skate parks and basketball courts. Today, collectors bid millions.`,
    authorId: 'user_admin',
    author: { name: 'Liam Miller', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80', role: 'Streetwear Analyst' },
    isFeatured: false,
    likes: 98,
    views: 162,
    comments: [],
  },
  {
    _id: 'post_7',
    title: 'Gallery to Garment: Art Meets Design',
    category: 'Lifestyle',
    tags: ['Model'],
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'When brushstrokes inspire hemlines and canvases shape silhouettes, the result is a striking fusion of visual art and fashion design.',
    content: `An in-depth look at emerging fashion houses collaborating with digital sculptors to create kinetic garments.`,
    authorId: 'user_admin',
    author: { name: 'Eleanor Pena', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', role: 'Senior Stylist' },
    isFeatured: false,
    likes: 96,
    views: 162,
    comments: [],
  },
  {
    _id: 'post_8',
    title: 'Sustainable Eating in a Climate-Conscious World',
    category: 'Food and Drink',
    tags: ['Health', 'Food'],
    readTime: '6 mins read',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'As climate concerns grow, our plates are becoming powerful tools for change. Sustainable eating — centered on plant-based choices, local sourcing, and reducing food waste.',
    content: `Mindful culinary arts focus on biodiversity and regenerative agriculture. Chefs across the world are showcasing how hyper-local micro-farms can produce Michelin-star worthy dining experiences.`,
    authorId: 'user_admin',
    author: { name: 'Bessie Cooper', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', role: 'Food & Culinary Journalist' },
    isFeatured: false,
    likes: 98,
    views: 162,
    comments: [],
  }
];

export default function App() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMyPostsModal, setShowMyPostsModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  
  const [authModalNotice, setAuthModalNotice] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  // Authenticated user session persisted in localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('insightverse_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch articles from Backend API
  const loadPosts = async () => {
    try {
      const data = await fetchPosts({
        category: selectedCategory,
        search: searchTerm,
      });
      if (Array.isArray(data) && data.length > 0) {
        setPosts(data);
      } else if (!searchTerm && selectedCategory === 'All') {
        setPosts(fallbackPosts);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.warn('Backend API connection offline, using fallback dataset:', err.message);
      let filtered = [...fallbackPosts];
      if (selectedCategory !== 'All') {
        filtered = filtered.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
      }
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
      }
      setPosts(filtered);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedCategory, searchTerm]);

  // Prompt Auth modal for unauthenticated guest interactions
  const triggerAuthPrompt = (message = '') => {
    setAuthModalNotice(message);
    setShowAuthModal(true);
  };

  // Like Article
  const handleLikePost = async (id) => {
    if (!currentUser) {
      triggerAuthPrompt('Please sign in or register to like articles.');
      return;
    }
    try {
      await apiLikePost(id);
    } catch (err) {
      console.log('Liked post locally');
    }
    setPosts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, likes: (p.likes || 0) + 1 } : p))
    );
    if (selectedPost && selectedPost._id === id) {
      setSelectedPost((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    }
  };

  // Add Comment
  const handleAddComment = async (id, commentData) => {
    if (!currentUser) {
      triggerAuthPrompt('Please sign in or register to publish comments.');
      return;
    }
    try {
      await apiAddComment(id, commentData);
    } catch (err) {
      console.log('Comment added locally');
    }
    const newCommentObj = {
      userName: commentData.userName || currentUser.name,
      userAvatar: commentData.userAvatar || currentUser.avatar,
      content: commentData.content,
      createdAt: new Date(),
    };

    setPosts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, comments: [...(p.comments || []), newCommentObj] } : p))
    );

    if (selectedPost && selectedPost._id === id) {
      setSelectedPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newCommentObj],
      }));
    }
  };

  // Create New Article
  const handleCreatePost = async (newPostData) => {
    let created;
    try {
      created = await apiCreatePost(newPostData, currentUser?.token);
    } catch (err) {
      created = {
        _id: 'post_' + Date.now(),
        ...newPostData,
        authorId: currentUser?._id || 'user_admin',
        author: {
          name: currentUser?.name || 'Evara Rose',
          avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          role: currentUser?.role || 'Journalist',
        },
        views: 1,
        likes: 0,
        comments: [],
        createdAt: new Date(),
      };
    }
    setPosts((prev) => [created, ...prev]);
    setEditingPost(null);
  };

  // Edit Existing Article
  const handleUpdatePost = async (id, updatedData) => {
    try {
      await apiUpdatePost(id, updatedData, currentUser?.token);
    } catch (err) {
      console.log('Updated post locally');
    }
    setPosts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...updatedData } : p))
    );
    setEditingPost(null);
  };

  // Delete Article from My Posts / Author Profile
  const handlePostDeleted = async (id) => {
    try {
      await apiDeletePost(id, currentUser?.token);
    } catch (err) {
      console.log('Deleted post locally');
    }
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  // Update User Profile (Phase 1)
  const handleUpdateProfile = async (profileData) => {
    let updated;
    try {
      updated = await updateUserProfile(profileData, currentUser?.token);
    } catch (err) {
      updated = {
        ...currentUser,
        ...profileData,
      };
    }

    const merged = { ...currentUser, ...updated };
    setCurrentUser(merged);
    localStorage.setItem('insightverse_user', JSON.stringify(merged));

    // Update posts state so updated avatar & name reflect on all posts by this author
    setPosts((prev) =>
      prev.map((p) => {
        if (
          p.authorId === merged._id ||
          p.authorId === merged.id ||
          p.author?.name === currentUser?.name
        ) {
          return {
            ...p,
            author: {
              ...p.author,
              name: merged.name,
              avatar: merged.avatar,
              role: merged.role || p.author?.role,
              bio: merged.bio || p.author?.bio,
            },
          };
        }
        return p;
      })
    );
  };

  // Select Author for Public Author Profile Page (Phase 2)
  const handleSelectAuthor = (authorObj) => {
    setSelectedAuthor(authorObj);
  };

  // Login Success
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('insightverse_user', JSON.stringify(user));
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('insightverse_user');
  };

  const featuredPosts = posts.filter((p) => p.isFeatured || true).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDFC] text-[#0C4137]">
      
      {/* Top Breaking Ticker */}
      <TopTicker onOpenNewsletter={() => {
        const el = document.getElementById('newsletter-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Main Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenCreatePost={() => {
          setEditingPost(null);
          setShowCreateModal(true);
        }}
        onOpenMyPosts={() => setShowMyPostsModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenAuth={() => {
          setAuthModalNotice('');
          setShowAuthModal(true);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content Layout */}
      <main className="flex-grow">
        
        {/* Magazine Hero Section */}
        {selectedCategory === 'All' && !searchTerm && (
          <HeroSection
            featuredPosts={featuredPosts}
            onSelectPost={(post) => setSelectedPost(post)}
            onSelectAuthor={handleSelectAuthor}
          />
        )}

        {/* Category Pill Bar */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Search Header Feedback */}
        {searchTerm && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h2 className="text-xl font-bold font-serif text-[#0C4137]">
              Search Results for: <span className="text-[#06D6A0]">"{searchTerm}"</span> ({posts.length} articles)
            </h2>
          </div>
        )}

        {/* Magazine Grid Layout */}
        <LatestNewsGrid
          posts={posts}
          onSelectPost={(post) => setSelectedPost(post)}
          onLikePost={handleLikePost}
          onSelectAuthor={handleSelectAuthor}
        />

        {/* Weekly Newsletter Section */}
        <div id="newsletter-section">
          <NewsletterSection />
        </div>
      </main>

      {/* Footer with Functional Navigation */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenCreatePost={() => {
          setEditingPost(null);
          setShowCreateModal(true);
        }}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenAuth={() => {
          setAuthModalNotice('');
          setShowAuthModal(true);
        }}
        currentUser={currentUser}
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Single Article Detail View Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={handleLikePost}
          onAddComment={handleAddComment}
          currentUser={currentUser}
          onRequireAuth={triggerAuthPrompt}
          onSelectAuthor={handleSelectAuthor}
        />
      )}

      {/* Create / Edit Article Modal */}
      {showCreateModal && (
        <CreatePostModal
          onClose={() => {
            setShowCreateModal(false);
            setEditingPost(null);
          }}
          onSubmitPost={handleCreatePost}
          onUpdatePost={handleUpdatePost}
          editingPost={editingPost}
        />
      )}

      {/* My Posts Dashboard Modal */}
      {showMyPostsModal && currentUser && (
        <MyPostsModal
          currentUser={currentUser}
          allPosts={posts}
          onClose={() => setShowMyPostsModal(false)}
          onEditPost={(post) => {
            setEditingPost(post);
            setShowCreateModal(true);
          }}
          onOpenCreatePost={() => {
            setEditingPost(null);
            setShowCreateModal(true);
          }}
          onPostDeleted={handlePostDeleted}
        />
      )}

      {/* User Profile & Settings Modal (Phase 1) */}
      {showProfileModal && currentUser && (
        <ProfileModal
          currentUser={currentUser}
          onClose={() => setShowProfileModal(false)}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {/* Public Author Profile Modal (Phase 2) */}
      {selectedAuthor && (
        <AuthorProfileModal
          author={selectedAuthor}
          allPosts={posts}
          onClose={() => setSelectedAuthor(null)}
          onSelectPost={(post) => setSelectedPost(post)}
          currentUser={currentUser}
          onEditPost={(post) => {
            setEditingPost(post);
            setShowCreateModal(true);
          }}
          onDeletePost={handlePostDeleted}
        />
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
          initialNotice={authModalNotice}
        />
      )}
    </div>
  );
}

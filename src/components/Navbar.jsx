import React, { useState, useRef, useEffect } from 'react';
import { Search, PenSquare, User, LogOut, LayoutDashboard, Menu, X, Settings, ChevronDown } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenCreatePost,
  onOpenMyPosts,
  onOpenProfile,
  onOpenAuth,
  currentUser,
  onLogout,
  selectedCategory,
  setSelectedCategory,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E6FBF6] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - InsightVerse */}
          <div className="flex items-center gap-3">
            <div onClick={() => setSelectedCategory('All')} className="cursor-pointer group flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0C4137] to-[#072A23] p-2.5 flex items-center justify-center shadow-lg shadow-[#0C4137]/20 group-hover:scale-105 transition-transform duration-300 ring-2 ring-[#06D6A0]/40">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-[#06D6A0] stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a9 9 0 0 0 0 18M12 7v10M8 12h8" />
                </svg>
              </div>

              <div>
                <span className="text-2xl font-extrabold tracking-tight text-[#0C4137] font-serif uppercase block leading-none">
                  Insight<span className="text-[#06D6A0]">Verse.</span>
                </span>
                <span className="text-[10px] tracking-widest text-[#0C4137]/60 font-sans uppercase font-bold">
                  The Journal of Ideas
                </span>
              </div>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#0C4137]">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`hover:text-[#06D6A0] transition-colors py-1 ${
                selectedCategory === 'All' ? 'text-[#06D6A0] font-bold border-b-2 border-[#06D6A0]' : ''
              }`}
            >
              Home
            </button>

            {currentUser ? (
              <>
                <button
                  onClick={onOpenCreatePost}
                  className="hover:text-[#06D6A0] transition-colors flex items-center gap-1.5 py-1"
                >
                  <PenSquare className="w-4 h-4 text-[#06D6A0]" />
                  <span>Create Post</span>
                </button>

                <button
                  onClick={onOpenMyPosts}
                  className="hover:text-[#06D6A0] transition-colors flex items-center gap-1.5 py-1"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#06D6A0]" />
                  <span>My Posts</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setSelectedCategory('Technology')}
                className={`hover:text-[#06D6A0] transition-colors py-1 ${
                  selectedCategory === 'Technology' ? 'text-[#06D6A0] font-bold border-b-2 border-[#06D6A0]' : ''
                }`}
              >
                Posts
              </button>
            )}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <div className="hidden sm:flex items-center bg-[#E6FBF6]/70 border border-[#06D6A0]/30 rounded-full px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-[#06D6A0] transition-all">
                <Search className="w-4 h-4 text-[#0C4137]/60 mr-2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-xs text-[#0C4137] placeholder-[#0C4137]/50 focus:outline-none w-28 lg:w-40"
                />
              </div>

              <button onClick={() => setSearchOpen(!searchOpen)} className="sm:hidden p-2 text-[#0C4137] hover:text-[#06D6A0]">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* AUTH / USER PROFILE DROPDOWN */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-[#E6FBF6] px-3.5 py-1.5 rounded-full border border-[#06D6A0]/40 hover:border-[#06D6A0] transition-all"
                >
                  <img
                    src={
                      currentUser.avatar ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                    }
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-[#06D6A0]"
                  />
                  <span className="text-xs font-bold text-[#0C4137] hidden md:inline truncate max-w-[100px]">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0C4137]" />
                </button>

                {/* USER DROPDOWN MENU */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E6FBF6] py-2 z-50 animate-fadeIn text-[#0C4137]">
                    <div className="px-4 py-2 border-b border-[#E6FBF6]">
                      <p className="text-xs font-bold text-[#0C4137] truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-[#0C4137]/60 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onOpenProfile) onOpenProfile();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#E6FBF6] flex items-center gap-2 text-[#0C4137]"
                    >
                      <Settings className="w-4 h-4 text-[#06D6A0]" />
                      <span>My Account / Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenMyPosts();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#E6FBF6] flex items-center gap-2 text-[#0C4137]"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#06D6A0]" />
                      <span>My Published Posts</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenCreatePost();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#E6FBF6] flex items-center gap-2 text-[#0C4137]"
                    >
                      <PenSquare className="w-4 h-4 text-[#06D6A0]" />
                      <span>Create New Post</span>
                    </button>

                    <div className="border-t border-[#E6FBF6] mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-[#0C4137] hover:bg-[#072A23] text-white font-semibold text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md"
              >
                <User className="w-3.5 h-3.5 text-[#06D6A0]" />
                <span>Login / Register</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#0C4137] hover:text-[#06D6A0]">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {searchOpen && (
          <div className="sm:hidden pb-4 pt-1">
            <div className="flex items-center bg-[#E6FBF6] border border-[#06D6A0] rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-[#0C4137] mr-2" />
              <input
                type="text"
                placeholder="Search articles, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm text-[#0C4137] placeholder-[#0C4137]/60 focus:outline-none w-full"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E6FBF6] flex flex-col gap-2 font-semibold text-[#0C4137] bg-white/95 backdrop-blur-lg rounded-b-2xl p-4 shadow-xl">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm hover:bg-[#E6FBF6]"
            >
              Home
            </button>

            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    if (onOpenProfile) onOpenProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2.5 rounded-xl text-sm bg-[#E6FBF6] text-[#0C4137] font-bold flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-[#06D6A0]" /> My Account / Profile
                </button>

                <button
                  onClick={() => {
                    onOpenCreatePost();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2.5 rounded-xl text-sm bg-[#06D6A0]/20 text-[#0C4137] font-bold flex items-center gap-2"
                >
                  <PenSquare className="w-4 h-4" /> Create Post
                </button>

                <button
                  onClick={() => {
                    onOpenMyPosts();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2.5 rounded-xl text-sm bg-[#E6FBF6] text-[#0C4137] font-bold flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" /> My Posts
                </button>

                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2.5 rounded-xl text-sm bg-[#0C4137] text-white font-bold flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#06D6A0]" /> Login / Register
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

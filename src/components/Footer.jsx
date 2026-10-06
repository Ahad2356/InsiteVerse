import React, { useState } from 'react';
import { ArrowUp, Globe, Heart, CheckCircle2 } from 'lucide-react';

export default function Footer({
  onSelectCategory,
  onOpenCreatePost,
  onOpenProfile,
  onOpenAuth,
  currentUser,
  onScrollTop,
}) {
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const showInfoModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
  };

  const handleCategoryClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    if (onScrollTop) {
      onScrollTop();
    }
  };

  return (
    <footer className="bg-[#0C4137] text-white pt-16 pb-8 border-t border-[#165e51]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#06D6A0] p-2 flex items-center justify-center text-[#0C4137] font-bold">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.2]">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a9 9 0 0 0 0 18M12 7v10M8 12h8" />
                </svg>
              </div>
              <span className="text-2xl font-extrabold font-serif tracking-tight uppercase">
                Insight<span className="text-[#06D6A0]">Verse.</span>
              </span>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm font-medium">
              InsightVerse is a premier digital journal dedicated to artificial intelligence, modern technology, architectural design, culture, and sustainable living.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06D6A0] animate-pulse"></span>
              <span className="text-xs text-white/80 font-semibold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#06D6A0]" /> Global Edition 2026
              </span>
            </div>
          </div>

          {/* Quick Categories - Functional Nav Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#06D6A0] mb-4">Categories</h4>
            <ul className="space-y-2 text-xs text-white/70 font-medium">
              <li>
                <button onClick={() => handleCategoryClick('Technology')} className="hover:text-[#06D6A0] transition-colors text-left">
                  Technology & AI
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Fashion')} className="hover:text-[#06D6A0] transition-colors text-left">
                  Fashion & Design
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Lifestyle')} className="hover:text-[#06D6A0] transition-colors text-left">
                  Lifestyle & Wellness
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Food and Drink')} className="hover:text-[#06D6A0] transition-colors text-left">
                  Food & Sustainability
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Culture')} className="hover:text-[#06D6A0] transition-colors text-left">
                  Culture & Art
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial - Functional Nav Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#06D6A0] mb-4">Editorial</h4>
            <ul className="space-y-2 text-xs text-white/70 font-medium">
              <li>
                <button
                  onClick={() =>
                    showInfoModal(
                      'About InsightVerse',
                      'InsightVerse is a state-of-the-art publication bridging artificial intelligence, haute couture, culture, and investigative journalism. Founded in 2026.'
                    )
                  }
                  className="hover:text-[#06D6A0] transition-colors text-left"
                >
                  About InsightVerse
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (currentUser) {
                      onOpenCreatePost();
                    } else {
                      onOpenAuth();
                    }
                  }}
                  className="hover:text-[#06D6A0] transition-colors text-left"
                >
                  Publish Article
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (currentUser) {
                      onOpenProfile();
                    } else {
                      onOpenAuth();
                    }
                  }}
                  className="hover:text-[#06D6A0] transition-colors text-left"
                >
                  My Profile & Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    showInfoModal(
                      'Publishing Guidelines',
                      'We enforce strict plagiarism checks, factual accuracy, and high resolution cover imagery for all submissions.'
                    )
                  }
                  className="hover:text-[#06D6A0] transition-colors text-left"
                >
                  Publishing Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    showInfoModal(
                      'Contact Editorial Desk',
                      'For press inquiries, editorial tips, or media partnerships, reach out to editor@insightverse.com.'
                    )
                  }
                  className="hover:text-[#06D6A0] transition-colors text-left"
                >
                  Contact Editorial Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Legal - Functional Nav Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#06D6A0] mb-4">Legal</h4>
            <ul className="space-y-2 text-xs text-white/70 font-medium">
              <li>
                <button
                  onClick={() =>
                    showInfoModal(
                      'Privacy Policy',
                      'InsightVerse prioritizes reader privacy. Your personal information and data are encrypted and never shared with third parties.'
                    )
                  }
                  className="hover:text-[#06D6A0] transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    showInfoModal(
                      'Terms of Service',
                      'By accessing InsightVerse, readers agree to respect intellectual property and abide by our community publishing standards.'
                    )
                  }
                  className="hover:text-[#06D6A0] transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    showInfoModal(
                      'Cookie Preferences',
                      'InsightVerse uses essential functional cookies for authentication and performance analytics.'
                    )
                  }
                  className="hover:text-[#06D6A0] transition-colors text-left"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 font-medium gap-4">
          <p>© 2026 InsightVerse Media Group. All rights reserved.</p>

          <div className="flex items-center gap-1 text-white/80">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-current inline" />
            <span>for MERN Stack Blog Platform</span>
          </div>

          <button
            onClick={onScrollTop}
            className="p-2.5 rounded-full bg-white/10 hover:bg-[#06D6A0] hover:text-[#0C4137] transition-all text-white flex items-center justify-center"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editorial & Legal Information Modal */}
      {modalTitle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-[#0C4137] shadow-2xl relative">
            <h3 className="text-xl font-bold font-serif mb-3 text-[#0C4137]">{modalTitle}</h3>
            <p className="text-xs text-[#0C4137]/80 leading-relaxed mb-6">{modalContent}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setModalTitle('')}
                className="bg-[#0C4137] hover:bg-[#072A23] text-white px-5 py-2 rounded-full text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

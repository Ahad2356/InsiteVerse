import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 6000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Newsletter Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E6FBF6] shadow-sm relative overflow-hidden flex flex-col justify-between">
          
          <div className="absolute top-0 right-0 opacity-20 pointer-events-none p-6">
            <div className="grid grid-cols-6 gap-2">
              {Array(24).fill(0).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0C4137]"></div>
              ))}
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#E6FBF6] text-[#0C4137] px-3 py-1 rounded-full text-xs font-bold mb-4">
              <Mail className="w-3.5 h-3.5 text-[#06D6A0]" />
              <span>Insight Weekly</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0C4137] leading-tight mb-6 max-w-md">
              Subscribe to InsightVerse and stay informed each week
            </h3>
          </div>

          {subscribed ? (
            <div className="bg-[#E6FBF6] border border-[#06D6A0] text-[#0C4137] p-4 rounded-2xl flex items-center gap-3 font-semibold text-xs animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-[#06D6A0] shrink-0" />
              <span>Welcome to InsightVerse! You will receive our weekly curated digest.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-full bg-[#E6FBF6]/50 border border-[#06D6A0]/30 text-xs sm:text-sm text-[#0C4137] placeholder-[#0C4137]/50 focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#06D6A0] hover:bg-[#05b88a] text-[#0C4137] font-extrabold text-xs px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-md shrink-0"
              >
                Subscribe Now
              </button>
            </form>
          )}
        </div>

        {/* Partners Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#E6FBF6] shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0C4137]/60">Syndicated Media Partners</span>
            <Sparkles className="w-4 h-4 text-[#06D6A0]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center my-auto py-4 opacity-80">
            <div className="text-xl font-black font-serif text-[#0C4137] tracking-tighter">CUBE</div>
            <div className="text-xl font-bold italic text-[#0C4137] font-serif">Clickl</div>
            <div className="text-lg font-extrabold tracking-widest text-[#0C4137]">RETOOL</div>
            <div className="text-xl font-bold tracking-tight text-[#0C4137]">piab</div>
            <div className="text-2xl font-black text-[#0C4137] font-serif">ma</div>
            <div className="text-lg font-bold text-[#06D6A0]">Insight.</div>
          </div>

          <p className="text-[11px] text-[#0C4137]/60 text-center font-medium mt-4 pt-4 border-t border-[#E6FBF6]">
            Reaching over 500,000+ technology and lifestyle leaders monthly.
          </p>
        </div>

      </div>
    </section>
  );
}

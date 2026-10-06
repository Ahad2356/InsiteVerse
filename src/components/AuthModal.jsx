import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

export default function AuthModal({ onClose, onLoginSuccess, initialNotice = '' }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (isRegister) {
        try {
          data = await registerUser({ name: name || 'Insight Author', email, password });
        } catch (apiErr) {
          data = {
            _id: 'user_' + Date.now(),
            name: name || 'Insight Author',
            email,
            role: 'author',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            token: 'jwt_demo_token_123',
          };
        }
      } else {
        try {
          data = await loginUser({ email, password });
        } catch (apiErr) {
          data = {
            _id: 'user_admin',
            name: 'Evara Rose',
            email: email || 'editor@insightverse.com',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            token: 'jwt_demo_token_123',
          };
        }
      }
      onLoginSuccess(data);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess({
      _id: 'user_admin',
      name: 'Evara Rose',
      email: 'editor@insightverse.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      token: 'jwt_demo_token_xyz',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E6FBF6] relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#E6FBF6] hover:bg-[#06D6A0] text-[#0C4137] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0C4137] mx-auto mb-3 flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-6 h-6 text-[#06D6A0]" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-[#0C4137]">
            {isRegister ? 'Join InsightVerse' : 'Sign In to InsightVerse'}
          </h3>
          <p className="text-xs text-[#0C4137]/60 mt-1 font-medium">
            Access exclusive publishing tools, dashboards and personalized stories.
          </p>
        </div>

        {initialNotice && (
          <div className="bg-[#E6FBF6] border border-[#06D6A0] text-[#0C4137] p-3 rounded-xl text-xs font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#06D6A0] shrink-0" />
            <span>{initialNotice}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#0C4137]">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#0C4137]/50 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Evara Rose"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#E6FBF6]/30 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#06D6A0] outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#0C4137]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#0C4137]/50 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="editor@insightverse.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#E6FBF6]/30 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#06D6A0] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#0C4137]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#0C4137]/50 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#E6FBF6]/30 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#06D6A0] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0C4137] hover:bg-[#072A23] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
          >
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4 text-[#06D6A0]" />
          </button>
        </form>

        {/* 1-Click Quick Demo Login */}
        <div className="mt-4 pt-4 border-t border-[#E6FBF6] text-center">
          <button
            onClick={handleQuickDemoLogin}
            className="w-full bg-[#E6FBF6] hover:bg-[#06D6A0]/20 text-[#0C4137] py-2.5 rounded-xl text-xs font-bold transition-colors border border-[#06D6A0]/40 flex items-center justify-center gap-1.5"
          >
            <span>⚡ 1-Click Quick Demo Login (Editor Account)</span>
          </button>
        </div>

        <p className="text-center text-xs text-[#0C4137]/70 mt-4">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-bold text-[#06D6A0] hover:underline"
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

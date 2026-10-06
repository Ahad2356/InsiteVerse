import React, { useState } from 'react';
import { X, User, Mail, Shield, FileText, Camera, Upload, Loader2, CheckCircle2, Save, Sparkles } from 'lucide-react';
import { uploadImageToCloudinary } from '../services/api';

export default function ProfileModal({ currentUser, onClose, onUpdateProfile }) {
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [role, setRole] = useState(currentUser?.role || 'author');
  const [bio, setBio] = useState(currentUser?.bio || 'Senior Design & Tech Journalist at InsightVerse.');
  const [avatar, setAvatar] = useState(currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarSuccess, setAvatarSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Cloudinary Avatar Upload handler
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setAvatarSuccess(false);
    setStatusMsg('');

    // Instant local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const result = await uploadImageToCloudinary(file);
      if (result && (result.url || result.imageUrl)) {
        const cloudinaryUrl = result.url || result.imageUrl;
        setAvatar(cloudinaryUrl);
        setAvatarSuccess(true);
      }
    } catch (err) {
      console.error('Avatar upload failed:', err);
      setStatusMsg('Failed to upload image to Cloudinary. Please try again.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg('');

    try {
      await onUpdateProfile({
        name,
        email,
        role,
        bio,
        avatar,
      });
      setStatusMsg('Profile updated successfully!');
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      setStatusMsg('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E6FBF6] relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#E6FBF6] hover:bg-[#06D6A0] text-[#0C4137] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#06D6A0]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0C4137]">Account Management</span>
        </div>
        <h2 className="text-2xl font-bold font-serif text-[#0C4137] mb-6">Profile Settings</h2>

        {statusMsg && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs font-bold flex items-center gap-2 ${
              statusMsg.includes('successfully')
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-[#0C4137]">
          {/* Avatar Upload with Cloudinary Integration */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-[#E6FBF6]/30 border border-[#06D6A0]/30">
            <div className="relative group shrink-0">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-[#06D6A0] shadow-md"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                }}
              />
              <label className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Camera className="w-6 h-6 text-white" />
                <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
              </label>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0C4137]">
                Profile Picture (Cloudinary)
              </label>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <label className="bg-[#0C4137] hover:bg-[#072A23] text-white text-xs font-bold px-3.5 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105">
                  <Upload className="w-3.5 h-3.5 text-[#06D6A0]" />
                  <span>Choose Photo</span>
                  <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
                </label>
              </div>

              {uploadingAvatar && (
                <p className="text-[11px] font-semibold text-[#0C4137] flex items-center gap-1 animate-pulse justify-center sm:justify-start">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#06D6A0]" /> Uploading to Cloudinary...
                </p>
              )}
              {avatarSuccess && !uploadingAvatar && (
                <p className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 justify-center sm:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cloudinary Avatar Updated
                </p>
              )}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#06D6A0]" /> Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#E6FBF6]/30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-medium"
            />
          </div>

          {/* Email Address & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#06D6A0]" /> Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#E6FBF6]/30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#06D6A0]" /> Professional Title / Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Tech Journalist"
                className="w-full px-4 py-3 rounded-xl bg-[#E6FBF6]/30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-medium"
              />
            </div>
          </div>

          {/* Bio / About */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#06D6A0]" /> Author Bio / About You
            </label>
            <textarea
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a brief introduction about your journalism background and topics of interest..."
              className="w-full px-4 py-3 rounded-xl bg-[#E6FBF6]/30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#06D6A0] text-sm font-medium resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6FBF6]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-[#0C4137] bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || uploadingAvatar}
              className="bg-[#0C4137] hover:bg-[#072A23] text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin text-[#06D6A0]" /> : <Save className="w-4 h-4 text-[#06D6A0]" />}
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

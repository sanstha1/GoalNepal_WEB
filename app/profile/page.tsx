"use client";

import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { toast } from "react-toastify";
import Header from "@/components/header";
import { User, Mail, Camera, LogOut, X, Trophy, Users, Lock, Shield, Star, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, setUser, logout, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [displayImageUrl, setDisplayImageUrl] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const buildImageUrl = (filename?: string | null): string | null => {
    if (!filename) return null;
    if (filename.startsWith("http")) return `${filename}?t=${Date.now()}`;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
    return `${baseUrl}/profile_pictures/${filename}?t=${Date.now()}`;
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (!loading && !user) {
        await refreshUser();
      }
    };
    loadUserData();
  }, [loading, user, refreshUser]);

  useEffect(() => {
    if (user?.profilePicture) {
      setDisplayImageUrl(buildImageUrl(user.profilePicture));
    }
  }, [user?.profilePicture]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setDisplayImageUrl(URL.createObjectURL(file));
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await handleUpdateProfile(formData);

      if (response.success && response.user) {
        setUser(response.user);
        setDisplayImageUrl(buildImageUrl(response.user.profilePicture));
        toast.success("Profile image updated successfully!");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(response.message || "Update failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An unexpected error occurred during upload");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const confirmLogout = () => { setShowLogoutModal(false); logout(); };
  const cancelLogout = () => setShowLogoutModal(false);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
          <motion.div 
            className="text-center p-12 rounded-3xl shadow-2xl max-w-md w-full border border-white/10"
            style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={40} className="text-white/30" />
            </div>
            <h1 className="text-2xl font-bold text-white">Please log in</h1>
            <p className="text-white/50 mt-2">We couldn&apos;t find an active session.</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-8 w-full py-4 bg-[#e05d2e] text-white rounded-2xl font-bold hover:bg-[#d64a1f] transition-all shadow-lg"
            >
              Go to Login
            </button>
          </motion.div>
        </div>
      </>
    );
  }

  const stats = [
    { value: "12", label: "Goals", icon: <Target size={18} /> },
    { value: "5", label: "Assists", icon: <Star size={18} /> },
    { value: "8", label: "Matches", icon: <Shield size={18} /> },
    { value: "4.5", label: "Rating", icon: <Trophy size={18} /> },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      <Header />
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white">My Profile</h1>
          <p className="text-white/50 mt-2">Manage your account and view your football statistics</p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              className="rounded-3xl p-8 border border-white/10 shadow-lg"
              style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-lg bg-white/5">
                    {displayImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={displayImageUrl}
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error("Image failed to load:", displayImageUrl);
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#e05d2e] to-[#d64a1f]">
                        <span className="text-3xl font-bold text-white">
                          {user.fullName?.substring(0, 2).toUpperCase() ?? "SS"}
                        </span>
                      </div>
                    )}
                  </div>
                  {uploadingImage && (
                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                  <motion.button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="absolute bottom-1 -left-1 bg-[#e05d2e] p-2 rounded-full text-white border-2 border-white hover:bg-[#d64a1f] transition-colors shadow-lg disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera size={18} />
                  </motion.button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <div className="w-full space-y-6">
                  <div className="flex items-center gap-3 mb-2 border-b border-white/10 pb-4">
                    <User className="text-white/50" size={20} />
                    <h2 className="text-xl font-bold text-white">Personal Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1">Full Name</label>
                      <p className="text-lg font-medium text-white">{user.fullName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1">Email</label>
                      <div className="flex items-center gap-2 text-white">
                        <Mail size={16} className="text-white/50" />
                        <p className="text-base">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="rounded-3xl p-8 border border-white/10 shadow-lg"
              style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <Trophy className="text-white/50" size={20} />
                <h2 className="text-xl font-bold text-white">Player Statistics</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label} 
                    className="rounded-2xl p-5 flex flex-col items-center justify-center text-center border border-white/10"
                    style={{ background: "rgba(224, 93, 46, 0.05)" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-white/60 mb-2">{stat.icon}</div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/50 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="rounded-3xl p-8 border border-white/10 shadow-lg"
              style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <Users className="text-white/50" size={20} />
                <h2 className="text-xl font-bold text-white">Team Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1">Team Name</label>
                  <p className="text-lg font-medium text-white">Mountain Kings</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1">Role</label>
                  <p className="text-lg font-medium text-white">Player</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1">Joined</label>
                  <p className="text-lg font-medium text-white">January 2024</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div 
              className="rounded-3xl p-8 border border-white/10 shadow-lg"
              style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">Settings</h2>
              <div className="space-y-2">
                <motion.button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full flex items-center gap-4 py-4 px-2 rounded-2xl hover:bg-white/5 transition-colors text-left group"
                  whileHover={{ x: 4 }}
                >
                  <div className="p-2.5 rounded-xl bg-white/5 text-white/60 group-hover:bg-white/10 transition-colors">
                    <Lock size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">Change Password</p>
                    <p className="text-sm text-white/50">Update your credentials</p>
                  </div>
                  <span className="text-white/30 text-lg">›</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              onClick={handleLogoutClick}
              className="w-full border border-white/10 text-white/70 py-4 rounded-2xl font-bold hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all flex items-center justify-center gap-2 group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={20} />
              Logout
            </motion.button>
          </div>
        </div>
      </main>

      {showLogoutModal && (
        <motion.div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-white/10"
            style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={cancelLogout} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="text-center">
              <motion.div 
                className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <LogOut size={32} className="text-red-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-3">Logout Confirmation</h2>
              <p className="text-white/60 mb-8">
                Are you sure you want to logout? You&apos;ll need to sign in again to access your account.
              </p>
              <div className="flex gap-4">
                <motion.button 
                  onClick={cancelLogout} 
                  className="flex-1 py-3 px-6 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-colors border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  onClick={confirmLogout} 
                  className="flex-1 py-3 px-6 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showPasswordModal && (
        <motion.div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-white/10"
            style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={() => setShowPasswordModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div>
              <motion.div 
                className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-white/10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <Lock size={28} className="text-[#e05d2e]" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Change Password</h2>
              <p className="text-white/50 mb-8">Update your account password below.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    className="w-full border border-white/10 rounded-2xl px-4 py-3 text-white bg-white/5 focus:outline-none focus:border-[#e05d2e] focus:bg-white/10 transition-colors"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPass}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                    className="w-full border border-white/10 rounded-2xl px-4 py-3 text-white bg-white/5 focus:outline-none focus:border-[#e05d2e] focus:bg-white/10 transition-colors"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    className="w-full border border-white/10 rounded-2xl px-4 py-3 text-white bg-white/5 focus:outline-none focus:border-[#e05d2e] focus:bg-white/10 transition-colors"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <motion.button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 px-6 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-colors border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => {
                    if (passwordForm.newPass !== passwordForm.confirm) {
                      toast.error("Passwords do not match");
                      return;
                    }
                    toast.success("Password updated successfully!");
                    setShowPasswordModal(false);
                    setPasswordForm({ current: "", newPass: "", confirm: "" });
                  }}
                  className="flex-1 py-3 px-6 bg-[#e05d2e] text-white rounded-2xl font-bold hover:bg-[#d64a1f] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

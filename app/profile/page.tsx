"use client";

import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { toast } from "react-toastify";
import Header from "@/components/header";
import { User, Mail, Camera, LogOut, X, Trophy, Users, Lock, Shield, Star, Target } from "lucide-react";
import { useRouter } from "next/navigation";

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
        <div className="min-h-screen flex items-center justify-center bg-[#fdfcf0]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#64748b]"></div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-[#fdfcf0]">
          <div className="text-center p-12 bg-white rounded-[40px] shadow-sm border border-gray-100 max-w-md w-full mx-4">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={40} className="text-slate-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Please log in</h1>
            <p className="text-gray-500 mt-2">We couldn&apos;t find an active session.</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-8 w-full py-4 bg-[#64748b] text-white rounded-2xl font-bold hover:bg-slate-600 transition-all shadow-lg shadow-slate-200"
            >
              Go to Login
            </button>
          </div>
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
    <div className="min-h-screen bg-[#fdfcf0] font-sans">
      <Header />
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and view your football statistics</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="w-32 h-32 rounded-full border-4 border-gray-100 overflow-hidden shadow-sm bg-gray-50">
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
                      <div className="w-full h-full flex items-center justify-center bg-[#64748b]">
                        <span className="text-3xl font-bold text-white">
                          {user.fullName?.substring(0, 2).toUpperCase() ?? "SS"}
                        </span>
                      </div>
                    )}
                  </div>
                  {uploadingImage && (
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="absolute bottom-1 -left-1 bg-[#64748b] p-2 rounded-full text-white border-2 border-white hover:bg-slate-600 transition-colors shadow-sm disabled:opacity-50"
                  >
                    <Camera size={18} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <div className="w-full space-y-6">
                  <div className="flex items-center gap-3 mb-2 border-b border-gray-50 pb-4">
                    <User className="text-gray-400" size={20} />
                    <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
                      <p className="text-lg font-medium text-gray-800">{user.fullName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Email</label>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail size={16} className="text-gray-400" />
                        <p className="text-base">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <Trophy className="text-gray-400" size={20} />
                <h2 className="text-xl font-bold text-gray-800">Player Statistics</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-[#fdfcf0] rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                    <div className="text-gray-400 mb-2">{stat.icon}</div>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <Users className="text-gray-400" size={20} />
                <h2 className="text-xl font-bold text-gray-800">Team Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Team Name</label>
                  <p className="text-lg font-medium text-gray-800">Mountain Kings</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Role</label>
                  <p className="text-lg font-medium text-gray-800">Player</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Joined</label>
                  <p className="text-lg font-medium text-gray-800">January 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Settings</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full flex items-center gap-4 py-4 px-2 rounded-2xl hover:bg-gray-50 transition-colors text-left group"
                >
                  <div className="p-2.5 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-slate-100 transition-colors">
                    <Lock size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Change Password</p>
                    <p className="text-sm text-gray-400">Update your credentials</p>
                  </div>
                  <span className="text-gray-300 text-lg">›</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleLogoutClick}
              className="w-full bg-white border border-gray-200 text-gray-400 py-4 rounded-2xl font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2 group"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </main>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={cancelLogout} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogOut size={32} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Logout Confirmation</h2>
              <p className="text-gray-600 mb-8">
                Are you sure you want to logout? You&apos;ll need to sign in again to access your account.
              </p>
              <div className="flex gap-4">
                <button onClick={cancelLogout} className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmLogout} className="flex-1 py-3 px-6 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowPasswordModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
            <div>
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Lock size={28} className="text-[#64748b]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Change Password</h2>
              <p className="text-gray-500 mb-8">Update your account password below.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:border-[#64748b] transition-colors"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPass}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:border-[#64748b] transition-colors"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:border-[#64748b] transition-colors"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (passwordForm.newPass !== passwordForm.confirm) {
                      toast.error("Passwords do not match");
                      return;
                    }
                    toast.success("Password updated successfully!");
                    setShowPasswordModal(false);
                    setPasswordForm({ current: "", newPass: "", confirm: "" });
                  }}
                  className="flex-1 py-3 px-6 bg-[#64748b] text-white rounded-2xl font-bold hover:bg-slate-600 transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { toast } from "react-toastify";
import Header from "@/components/header";
import { User, Mail, Bell, Moon, Camera } from "lucide-react";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string | null;
  role?: "user" | "admin" | string;
  createdAt: string;
  updatedAt?: string;
}

export default function ProfilePage() {
  const { user, setUser, logout } = useAuth();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialUser, setInitialUser] = useState<AuthUser | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (user) {
        setInitialUser(user);
        setLoading(false);
        return;
      }
      if (typeof window !== "undefined") {
        try {
          const userCookie = localStorage.getItem("user");
          if (userCookie) {
            const parsedUser = JSON.parse(userCookie) as AuthUser;
            setUser(parsedUser);
            setInitialUser(parsedUser);
          }
        } catch {
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [setUser, user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const response = await handleUpdateProfile(formData);
      if (response.success && response.data) {
        setUser(response.data);
        toast.success("Profile image updated successfully!");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const getImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";
    const timestamp = new Date().getTime();
    return `${baseUrl}/${imagePath}?t=${timestamp}`;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-[#fdfcf0]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </>
    );
  }

  const displayUser = user || initialUser;

  if (!displayUser) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-[#fdfcf0]">
          <h1 className="text-2xl font-bold text-gray-800">Please log in</h1>
        </div>
      </>
    );
  }

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
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative">
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="w-32 h-32 rounded-full border-4 border-gray-100 overflow-hidden shadow-sm">
                    {displayUser.profilePicture ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={getImageUrl(displayUser.profilePicture) || ""} alt={displayUser.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User size={48} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <button onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="absolute bottom-1 -left-1 bg-[#64748b] p-2 rounded-full text-white border-2 border-white hover:bg-slate-600 transition-colors shadow-sm disabled:opacity-50">
                    <Camera size={18} />
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>
                <div className="w-full space-y-6">
                  <div className="flex items-center gap-3 mb-2 border-b border-gray-50 pb-4">
                    <User className="text-gray-400" size={20} />
                    <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
                      <p className="text-lg font-medium text-gray-800">{displayUser.fullName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Email</label>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail size={16} className="text-gray-400" />
                        <p className="text-base">{displayUser.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Settings</h2>
              <div className="space-y-8">
                <div className="border-t border-gray-50 pt-6 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-gray-50 text-gray-400 border border-transparent">
                      <Bell size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Notifications</p>
                      <p className="text-sm text-gray-400">Match updates</p>
                    </div>
                  </div>
                  <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-all duration-200 relative ${notifications ? 'bg-[#64748b]' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${notifications ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div className="border-t border-gray-50 pt-6 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-gray-50 text-gray-400 border border-transparent">
                      <Moon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Dark Mode</p>
                      <p className="text-sm text-gray-400">Toggle theme</p>
                    </div>
                  </div>
                  <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-6 rounded-full transition-all duration-200 relative ${darkMode ? 'bg-[#64748b]' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
            <button onClick={logout} className="w-full bg-white border border-gray-200 text-gray-400 py-4 rounded-2xl font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2 group">
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

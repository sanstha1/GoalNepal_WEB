/* eslint-disable @next/next/no-img-element */
"use client";

import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleUpdateUser } from "@/lib/actions/admin/user-action";
import { motion } from "framer-motion";
import { X, Upload } from "lucide-react";

interface EditUserFormProps {
  user: {
    _id: string;
    fullName: string;
    email: string;
    profilePicture?: string;
    role: string;
    createdAt: string;
  };
  onSuccess?: () => void;
}

const getImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  const filename = imagePath.split("/").pop();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
  return `${baseUrl}/profile_pictures/${filename}`;
};

export default function EditUserForm({ user, onSuccess }: EditUserFormProps) {
  const [pending, startTransition] = useTransition();
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      password: "",
      confirmPassword: "",
    }
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: UserData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        if (data.password) formData.append('password', data.password);
        if (data.confirmPassword) formData.append('confirmPassword', data.confirmPassword);
        if (data.profilePicture) formData.append('profilePicture', data.profilePicture);

        const response = await handleUpdateUser(user._id, formData);

        if (!response.success) {
          throw new Error(response.message || 'Update profile failed');
        }

        reset();
        toast.success('Profile updated successfully');
        onSuccess?.();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Update profile failed';
        toast.error(message);
      }
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid rgba(255,255,255,0.1)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
          Profile Picture
        </label>
        <div className="flex gap-4 items-start">
          {previewImage || user.profilePicture ? (
            <div className="relative w-20 h-20 shrink-0">
              <img
                src={previewImage || getImageUrl(user.profilePicture)}
                alt="Profile"
                className="w-20 h-20 rounded-lg object-cover"
                style={{ border: "2px solid rgba(224, 93, 46, 0.3)" }}
              />
              <Controller
                name="profilePicture"
                control={control}
                render={({ field: { onChange } }) => (
                  <motion.button
                    type="button"
                    onClick={() => handleDismissImage(onChange)}
                    className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center text-sm hover:opacity-80"
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={14} color="#ef4444" />
                  </motion.button>
                )}
              />
            </div>
          ) : (
            <div
              className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "2px dashed rgba(255,255,255,0.1)"
              }}
            >
              <span className="text-xs text-white/30">No image</span>
            </div>
          )}

          <Controller
            name="profilePicture"
            control={control}
            render={({ field: { onChange } }) => (
              <motion.label
                className="flex-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                />
                <div
                  className="px-4 py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition border"
                  style={{
                    background: "rgba(224, 93, 46, 0.1)",
                    border: "1.5px solid rgba(224, 93, 46, 0.3)"
                  }}
                >
                  <Upload size={16} color="#e05d2e" />
                  <span className="text-sm font-semibold text-white/70">Upload Image</span>
                </div>
              </motion.label>
            )}
          />
        </div>
        {errors.profilePicture && (
          <p className="text-xs text-red-400 mt-2">{errors.profilePicture.message as string}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
          Full Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition text-sm"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
          {...register("fullName")}
          placeholder="Enter full name"
        />
        {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition text-sm"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
          {...register("email")}
          placeholder="Enter email"
        />
        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
          Password (leave empty to keep current)
        </label>
        <input
          type="password"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition text-sm"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
          {...register("password")}
          placeholder="••••••••"
        />
        {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition text-sm"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
          {...register("confirmPassword")}
          placeholder="••••••••"
        />
        {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>}
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting || pending}
        className="w-full py-3 rounded-lg text-white font-bold text-sm transition disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #e05d2e, #d45a28)"
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {isSubmitting || pending ? "Updating..." : "Update User"}
      </motion.button>
    </motion.form>
  );
}
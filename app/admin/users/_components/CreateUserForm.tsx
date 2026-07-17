/* eslint-disable @next/next/no-img-element */
"use client";

import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleCreateUser } from "@/lib/actions/admin/user-action";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";

export default function CreateUserForm({ onSuccess }: { onSuccess?: () => void }) {
    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<UserData>({
        resolver: zodResolver(UserSchema)
    });

    const [, setServerError] = useState<string | null>(null);
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
        setServerError(null);
        startTransition(async () => {
            try {
                const formData = new FormData();

                formData.append('fullName', data.fullName);
                formData.append('email', data.email);
                formData.append('password', data.password);
                formData.append('confirmPassword', data.confirmPassword);

                if (data.profilePicture) {
                    formData.append('profilePicture', data.profilePicture);
                }

                const response = await handleCreateUser(formData);

                if (!response.success) {
                    throw new Error(response.message || 'Create profile failed');
                }

                reset();
                handleDismissImage();
                toast.success('User created successfully');
                onSuccess?.();

            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Create profile failed';
                toast.error(message);
                setServerError(message);
            }
        });
    };

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                padding: "24px",
                border: "1px solid #E5E7EB"
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
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
                    Profile Picture
                </label>
                <div className="flex gap-4 items-start">
                    {previewImage ? (
                        <div className="relative w-20 h-20 shrink-0">
                            <img
                                src={previewImage}
                                alt="Profile"
                                className="w-20 h-20 rounded-lg object-cover"
                                style={{ border: "2px solid rgba(255, 138, 42, 0.3)" }}
                            />
                            <Controller
                                name="profilePicture"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <motion.button
                                        type="button"
                                        onClick={() => handleDismissImage(onChange)}
                                        className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                        style={{ backgroundColor: "rgba(239, 68, 68, 0.15)" }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X size={14} color="#EF4444" />
                                    </motion.button>
                                )}
                            />
                        </div>
                    ) : (
                        <div
                            className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                                backgroundColor: "#FAFAFA",
                                border: "2px dashed #E5E7EB"
                            }}
                        >
                            <span className="text-xs text-[#9CA3AF]">No image</span>
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
                                        backgroundColor: "#FFF4E8",
                                        border: "1.5px solid rgba(255, 138, 42, 0.3)"
                                    }}
                                >
                                    <Upload size={16} color="#FF8A2A" />
                                    <span className="text-sm font-semibold text-[#2F2F2F]">Upload Image</span>
                                </div>
                            </motion.label>
                        )}
                    />
                </div>
                {errors.profilePicture && (
                    <p className="text-xs text-[#EF4444] mt-2">{errors.profilePicture.message as string}</p>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                    Full Name
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white border text-[#2F2F2F] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8A2A] focus:ring-4 focus:ring-[rgba(255,138,42,0.15)] transition text-sm"
                    style={{ borderColor: "#E5E7EB" }}
                    {...register("fullName")}
                    placeholder="Enter full name"
                />
                {errors.fullName && (
                    <p className="text-xs text-[#EF4444] mt-1">{errors.fullName.message}</p>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                    Email
                </label>
                <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white border text-[#2F2F2F] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8A2A] focus:ring-4 focus:ring-[rgba(255,138,42,0.15)] transition text-sm"
                    style={{ borderColor: "#E5E7EB" }}
                    {...register("email")}
                    placeholder="Enter email"
                />
                {errors.email && (
                    <p className="text-xs text-[#EF4444] mt-1">{errors.email.message}</p>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                    Password
                </label>
                <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-white border text-[#2F2F2F] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8A2A] focus:ring-4 focus:ring-[rgba(255,138,42,0.15)] transition text-sm"
                    style={{ borderColor: "#E5E7EB" }}
                    {...register("password")}
                    placeholder="••••••••"
                />
                {errors.password && (
                    <p className="text-xs text-[#EF4444] mt-1">{errors.password.message}</p>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                    Confirm Password
                </label>
                <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-white border text-[#2F2F2F] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8A2A] focus:ring-4 focus:ring-[rgba(255,138,42,0.15)] transition text-sm"
                    style={{ borderColor: "#E5E7EB" }}
                    {...register("confirmPassword")}
                    placeholder="••••••••"
                />
                {errors.confirmPassword && (
                    <p className="text-xs text-[#EF4444] mt-1">{errors.confirmPassword.message}</p>
                )}
            </motion.div>

            <motion.button
                type="submit"
                disabled={isSubmitting || pending}
                className="w-full py-3 rounded-lg text-white font-bold text-sm transition disabled:opacity-50"
                style={{
                    backgroundColor: "#FF8A2A"
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
            >
                {isSubmitting || pending ? "Creating..." : "Create User"}
            </motion.button>
        </motion.form>
    );
}
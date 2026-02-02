"use client";

import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleCreateUser } from "@/lib/actions/admin/user-action";

export default function CreateUserForm() {
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
                
                // Full name added here
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
                toast.success('Profile Created successfully');

            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Create profile failed';
                toast.error(message);
                setServerError(message);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image Preview */}
            <div className="mb-4">
                {previewImage ? (
                    <div className="relative w-24 h-24">
                        {/* <img
                            src={previewImage}
                            alt="Profile Image Preview"
                            className="w-24 h-24 rounded-full object-cover border border-gray-200"
                        /> */}
                        <Controller
                            name="profilePicture"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <button
                                    type="button"
                                    onClick={() => handleDismissImage(onChange)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 shadow-md"
                                >
                                    ✕
                                </button>
                            )}
                        />
                    </div>
                ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-gray-400 text-xs text-center">No Image</span>
                    </div>
                )}
            </div>

            {/* Profile Image Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Profile Image</label>
                <Controller
                    name="profilePicture"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                            accept=".jpg,.jpeg,.png,.webp"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        />
                    )}
                />
                {errors.profilePicture && (
                    <p className="text-sm text-red-600 mt-1">{errors.profilePicture.message as string}</p>
                )}
            </div>

            {/* Full Name */}
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    className="h-10 w-full rounded-md border border-black/10 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("fullName")}
                    placeholder="Santosh Shrestha"
                />
                {errors.fullName && (
                    <p className="text-xs text-red-600">{errors.fullName.message}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className="h-10 w-full rounded-md border border-black/10 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("email")}
                    placeholder="sthasantosh@example.com"
                />
                {errors.email && (
                    <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    className="h-10 w-full rounded-md border border-black/10 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("password")}
                    placeholder="••••••"
                />
                {errors.password && (
                    <p className="text-xs text-red-600">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    className="h-10 w-full rounded-md border border-black/10 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("confirmPassword")}
                    placeholder="••••••"
                />
                {errors.confirmPassword && (
                    <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-black text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-all shadow-sm"
            >
                {isSubmitting || pending ? "Creating account..." : "Create account"}
            </button>
        </form>
    );
}
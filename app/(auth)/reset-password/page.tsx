"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { resetPasswordSchema, ResetPasswordData } from "@/app/(auth)/schema";
import { handleResetPassword } from "@/lib/actions/auth-action";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fefee3]">
        <div className="p-8 w-96 rounded-xl border border-black shadow-lg bg-white">
          <h1 className="text-2xl font-bold text-center mb-4 text-red-600">Invalid Token</h1>
          <p className="text-center text-gray-600 mb-6">
            The password reset link is invalid or has expired.
          </p>
          <button
            onClick={() => router.push("/forgot-password")}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-zinc-800 transition-colors"
          >
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      setLoading(true);
      const result = await handleResetPassword(token, data.newPassword);

      if (result.success) {
        toast.success("Password has been reset successfully.");
        router.push("/login");
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Failed to reset password");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#1e1e1e]">
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#4a4a4a] text-white p-8">
        <Image
          src="/images/image.png"
          alt="Football Image"
          width={350}
          height={350}
          className="mb-6"
        />
        <h2 className="text-3xl font-bold text-center">
          Nepal&apos;s Home for <br /> Football & Futsal Events
        </h2>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#fefee3]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 w-96 rounded-xl border border-black shadow-lg bg-white"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-black uppercase tracking-tight">
            Reset Password
          </h1>

          <p className="text-sm text-gray-600 text-center mb-6">
            Enter your new password below.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("newPassword")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10 text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmNewPassword")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10 text-black"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg mt-6 font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Want to log in?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-black font-bold cursor-pointer hover:underline"
            >
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/app/(auth)/schema";
import Image from "next/image";
import { handleRegister } from "@/lib/actions/auth-action";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      setLoading(true);

      const result = await handleRegister({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (result.success) {
        toast.success("Account created successfully! Please login.");
        router.push("/login");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 50%, #FAFAFA 100%)" }}
    >
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 order-2 lg:order-1">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-10">
            <motion.h1
              className="text-4xl font-bold text-[#2F2F2F] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create Account
            </motion.h1>
            <motion.p
              className="text-[#9CA3AF] text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Join our community of football enthusiasts
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold text-[#2F2F2F] mb-3">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Santosh Shrestha"
              {...register("fullName")}
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-[#2F2F2F] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8A2A] focus:bg-white transition"
            />
            {errors.fullName && (
              <p className="text-[#EF4444] text-xs mt-2">{errors.fullName.message}</p>
            )}
          </motion.div>

          <motion.div
            className="mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <label className="block text-sm font-semibold text-[#2F2F2F] mb-3">
              Email Address
            </label>
            <input
              type="email"
              placeholder="s@gmail.com"
              {...register("email")}
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-[#2F2F2F] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8A2A] focus:bg-white transition"
            />
            {errors.email && (
              <p className="text-[#EF4444] text-xs mt-2">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            className="mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-semibold text-[#2F2F2F] mb-3">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-[#2F2F2F] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8A2A] focus:bg-white transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[#EF4444] text-xs mt-2">{errors.password.message}</p>
            )}
          </motion.div>

          <motion.div
            className="mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <label className="block text-sm font-semibold text-[#2F2F2F] mb-3">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-[#2F2F2F] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8A2A] focus:bg-white transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[#EF4444] text-xs mt-2">{errors.confirmPassword.message}</p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full mt-8 px-6 py-3 rounded-lg bg-linear-to-r from-[#FF8A2A] to-[#F97316] text-white font-bold hover:from-[#F97316] hover:to-[#F97316] transition flex items-center justify-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {loading ? "Creating account..." : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>

          <motion.p
            className="text-center mt-8 text-[#9CA3AF] text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Already have an account?{" "}
            <motion.button
              type="button"
              onClick={() => router.push("/login")}
              className="text-[#FF8A2A] font-semibold hover:text-[#F97316] transition"
              whileHover={{ x: 2 }}
            >
              Sign in here
            </motion.button>
          </motion.p>
        </motion.form>
      </div>

      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 order-1 lg:order-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <Image
            src="/images/image.png"
            alt="Football"
            width={300}
            height={300}
            className="mb-8 rounded-2xl scale-x-[-1]"
          />
          <h2 className="text-4xl font-bold text-[#2F2F2F] mb-4">
            Building Nepal&apos;s Football Future
          </h2>
          <p className="text-[#6B7280] text-lg">
            Be part of the revolution in sports management
          </p>
        </motion.div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { forgetPasswordSchema, ForgetPasswordData } from "@/app/(auth)/schema";
import { handleRequestPasswordReset } from "@/lib/actions/auth-action";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: ForgetPasswordData) => {
    try {
      setLoading(true);
      const result = await handleRequestPasswordReset(data.email);

      if (result.success) {
        toast.success("If the email is registered, a reset link has been sent.");
        router.push("/login");
      } else {
        toast.error(result.message || "Failed to send reset link");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Failed to send reset link");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 50%, #FAFAFA 100%)" }}
    >
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12">
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
            className="mb-8 rounded-2xl"
          />
          <h2 className="text-4xl font-bold text-[#2F2F2F] mb-4">
            Nepal&apos;s Home for Football & Futsal
          </h2>
          <p className="text-[#6B7280] text-lg">
            We&apos;ll help you recover your account quickly and securely
          </p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
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
              Forgot Password?
            </motion.h1>
            <motion.p
              className="text-[#9CA3AF] text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Enter your email and we&apos;ll send you a reset link
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold text-[#2F2F2F] mb-3">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-[#2F2F2F] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FF8A2A] focus:bg-white transition"
            />
            {errors.email && (
              <p className="text-[#EF4444] text-xs mt-2">{errors.email.message}</p>
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
            transition={{ delay: 0.4 }}
          >
            {loading ? "Sending..." : (
              <>
                Send Reset Link
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>

          <motion.p
            className="text-center mt-8 text-[#9CA3AF] text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Remember your password?{" "}
            <motion.button
              type="button"
              onClick={() => router.push("/login")}
              className="text-[#FF8A2A] font-semibold hover:text-[#F97316] transition"
              whileHover={{ x: 2 }}
            >
              Sign in
            </motion.button>
          </motion.p>
        </motion.form>
      </div>
    </div>
  );
}
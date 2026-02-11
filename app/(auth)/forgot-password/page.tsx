"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import InputField from "@/components/inputfield";
import { forgetPasswordSchema, ForgetPasswordData } from "@/app/(auth)/schema";
import { handleRequestPasswordReset } from "@/lib/actions/auth-action";

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
            Forgot Password
          </h1>

          <p className="text-sm text-gray-600 text-center mb-6">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

          <InputField
            label="Email"
            type="email"
            placeholder="example@mail.com"
            register={register("email")}
            error={errors.email}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg mt-6 font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Remember your password?{" "}
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
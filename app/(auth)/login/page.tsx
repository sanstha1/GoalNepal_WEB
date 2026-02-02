"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/app/(auth)/schema";
import InputField from "@/components/inputfield";
import Image from "next/image";
import { handleLogin } from "@/lib/actions/auth-action";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      setLoading(true);
      const result = await handleLogin(data);

      if (result.success) {
            toast.success("Welcome back! Login successful.");

            router.replace("/home");
            router.refresh();
      } else {
        toast.error(result.message ?? "Invalid credentials");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Login failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#1e1e1e]">
      {/* Left side image (desktop only) */}
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

      {/* Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#fefee3]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 w-96 rounded-xl border border-black shadow-lg bg-white"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-black uppercase tracking-tight">
            Log In
          </h1>

          <InputField
            label="Email"
            type="email"
            placeholder="example@mail.com"
            register={register("email")}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            register={register("password")}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg mt-6 font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-black font-bold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

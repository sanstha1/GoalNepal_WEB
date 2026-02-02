"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/app/(auth)/schema";
import InputField from "@/components/inputfield";
import Image from "next/image";
import { handleRegister } from "@/lib/actions/auth-action";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex bg-[#1e1e1e]">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#fefee3]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 w-96 border border-black rounded-xl bg-white shadow-lg"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-black uppercase tracking-tight">
            Register
          </h1>

          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            register={register("fullName")}
            error={errors.fullName}
          />

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

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg mt-6 font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-black font-bold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>

      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#4a4a4a] text-white p-8">
        <Image
          src="/images/image.png"
          alt="Football Image"
          width={350}
          height={350}
          className="mb-6 scale-x-[-1]"
        />
        <h2 className="text-3xl font-bold text-center mt-4">
          Building Nepal&apos;s <br /> Football Future
        </h2>
      </div>
    </div>
  );
}
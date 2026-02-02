"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "@/app/(auth)/schema";

import {
  register,
  login,
  whoAmI,
  updateProfile,
} from "@/lib/api/auth";

import {
  clearAuthCookies,
  setUserData,
} from "@/lib/cookie";

import type { AuthUser } from "../types/AuthUser";
import { cookies } from "next/headers";

/* -------------------------------- REGISTER -------------------------------- */

export const handleRegister = async (data: RegisterSchemaType) => {
  try {
    const response = await register(data);

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Registration failed",
      };
    }

    return {
      success: true,
      message: "Registration successful",
      data: response.data as AuthUser,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Registration action failed",
    };
  }
};

/* ---------------------------------- LOGIN ---------------------------------- */

export const handleLogin = async (data: LoginSchemaType) => {
  try {
    const response = await login(data);

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Login failed",
      };
    }

    const cookieStore = cookies();

    // ✅ TOKEN (used by middleware)
    (await
          // ✅ TOKEN (used by middleware)
          cookieStore).set("token", response.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    // ✅ USER DATA (used by app)
    (await
          // ✅ USER DATA (used by app)
          cookieStore).set("user", JSON.stringify(response.data), {
      sameSite: "lax",
      path: "/",
    });

    return {
      success: true,
      message: "Login successful",
      data: response.data as AuthUser,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Login action failed",
    };
  }
};

/* --------------------------------- LOGOUT ---------------------------------- */

export const handleLogout = async () => {
  await clearAuthCookies();
  redirect("/login");
};

/* -------------------------------- WHO AM I --------------------------------- */

export const handleWhoAmI = async () => {
  try {
    const result = await whoAmI();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch user data",
      };
    }

    return {
      success: true,
      message: "User data fetched successfully",
      data: result.data as AuthUser,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "WhoAmI action failed",
    };
  }
};

/* ------------------------------ UPDATE PROFILE ------------------------------ */

export const handleUpdateProfile = async (profileData: FormData) => {
  try {
    const result = await updateProfile(profileData);

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }

    // Update user cookie with new data
    await setUserData(result.data as AuthUser);

    // Revalidate profile page
    revalidatePath("/user/profile");

    return {
      success: true,
      message: "Profile updated successfully",
      data: result.data as AuthUser,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Update profile action failed",
    };
  }
};

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "@/app/(auth)/schema";

import {
  register,
  login,
  whoAmI,
  updateProfile,
  requestPasswordReset,
  resetPassword,
} from "@/lib/api/auth";

import {
  clearAuthCookies,
} from "@/lib/cookie";

import type { AuthUser } from "../types/AuthUser";

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
      user: response.data as AuthUser,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Registration action failed",
    };
  }
};

export const handleLogin = async (data: LoginSchemaType) => {
  try {
    const response = await login(data);

    console.log('handleLogin - Full response:', JSON.stringify(response, null, 2));
    console.log('handleLogin - Response success:', response.success);
    console.log('handleLogin - Response token:', response.token);
    console.log('handleLogin - Response user:', JSON.stringify(response.user, null, 2));

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Login failed",
      };
    }

    const cookieStore = await cookies();

    console.log('handleLogin - Setting token cookie');
    cookieStore.set('token', response.token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: false,
      maxAge: 60 * 60 * 24 * 7
    });

    console.log('handleLogin - Fetching full user data via whoAmI');
    try {
      const userResult = await whoAmI(response.token);
      
      if (userResult.success && userResult.user) {
        const userString = JSON.stringify(userResult.user);
        console.log('handleLogin - User string from whoAmI:', userString);
        
        cookieStore.set('user', userString, {
          httpOnly: false,
          sameSite: 'lax',
          path: '/',
          secure: false,
          maxAge: 60 * 60 * 24 * 7
        });

        const tokenCheck = (await cookies()).get('token')?.value;
        const userCheck = (await cookies()).get('user')?.value;
        console.log('handleLogin - Token saved:', !!tokenCheck);
        console.log('handleLogin - User saved:', !!userCheck);
        console.log('handleLogin - User data:', userCheck);

        return {
          success: true,
          message: "Login successful",
          data: userResult.user as AuthUser,
        };
      } else {
        console.error('handleLogin - whoAmI failed, falling back to login user data');
        const userString = JSON.stringify(response.user);
        cookieStore.set('user', userString, {
          httpOnly: false,
          sameSite: 'lax',
          path: '/',
          secure: false,
          maxAge: 60 * 60 * 24 * 7
        });

        return {
          success: true,
          message: "Login successful",
          data: response.user as AuthUser,
        };
      }
    } catch (whoAmIError) {
      console.error('handleLogin - whoAmI error:', whoAmIError);
      const userString = JSON.stringify(response.user);
      cookieStore.set('user', userString, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        secure: false,
        maxAge: 60 * 60 * 24 * 7
      });

      return {
        success: true,
        message: "Login successful",
        data: response.user as AuthUser,
      };
    }
  } catch (error) {
    console.error('handleLogin - Error:', error);
    return {
      success: false,
      message: (error as Error).message || "Login action failed",
    };
  }
};

export const handleLogout = async () => {
  await clearAuthCookies();
  redirect("/login");
};

export const handleWhoAmI = async () => {
  try {
    const result = await whoAmI();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch user data",
      };
    }

    const cookieStore = await cookies();
    const userString = JSON.stringify(result.user);
    
    console.log('handleWhoAmI - Setting user cookie:', userString);
    
    cookieStore.set('user', userString, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      secure: false,
      maxAge: 60 * 60 * 24 * 7
    });

    return {
      success: true,
      message: "User data fetched successfully",
      user: result.user as AuthUser,
    };
  } catch (error) {
    console.error('handleWhoAmI - Error:', error);
    return {
      success: false,
      message: (error as Error).message || "WhoAmI action failed",
    };
  }
};

export const handleUpdateProfile = async (profileData: FormData) => {
  try {
    const result = await updateProfile(profileData);

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }

    const cookieStore = await cookies();
    const userString = JSON.stringify(result.data);
    
    console.log('handleUpdateProfile - Setting user cookie:', userString);
    
    cookieStore.set('user', userString, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      secure: false,
      maxAge: 60 * 60 * 24 * 7
    });

    revalidatePath("/user/profile");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Profile updated successfully",
      user: result.data as AuthUser,
    };
  } catch (error) {
    console.error('handleUpdateProfile - Error:', error);
    return {
      success: false,
      message: (error as Error).message || "Update profile action failed",
    };
  }
};

export const handleRequestPasswordReset = async (email: string) => {
  try {
    const response = await requestPasswordReset(email);
    
    if (response.success) {
      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    }
    
    return {
      success: false,
      message: response.message || "Request password reset failed",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Request password reset action failed",
    };
  }
};

export const handleResetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await resetPassword(token, newPassword);
    
    if (response.success) {
      return {
        success: true,
        message: "Password has been reset successfully",
      };
    }
    
    return {
      success: false,
      message: response.message || "Reset password failed",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Reset password action failed",
    };
  }
};
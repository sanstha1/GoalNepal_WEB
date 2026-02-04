import axios from "./axios";
import type { AxiosError } from "axios";

import { API } from "./endpoints";
import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "@/app/(auth)/schema";

import type { AuthUser } from "../types/AuthUser";
import type { AdminRegisterData } from "@/app/admin/register/schema";

export const register = async (registerData: RegisterSchemaType) => {
  try {
    const response = await axios.post(API.AUTH.REGISTER, registerData);

    return {
      success: true,
      data: response.data.data as AuthUser,
      message: response.data.message || "Registration successful",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "Registration failed"
    );
  }
};

export const login = async (loginData: LoginSchemaType) => {
  try {
    const response = await axios.post(API.AUTH.LOGIN, loginData);

    // Backend returns: { token, user: { id, fullName, email, profilePicture } }
    return {
      success: true,
      token: response.data.token as string,
      user: response.data.user as AuthUser, // Changed from response.data.data to response.data.user
      message: response.data.message || "Login successful",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "Login failed"
    );
  }
};

export const whoAmI = async (token?: string) => {
  try {
    const config = token 
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    
    const response = await axios.get(API.AUTH.WHOAMI, config);

    // Backend returns: { success: true, data: user }
    return {
      success: true,
      user: response.data.data as AuthUser,
      message: "User fetched successfully",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "WhoAmI failed"
    );
  }
};

export const updateProfile = async (profileData: FormData) => {
  try {
    const userDataString = await import('../cookie').then(m => m.getUserData());
    const userData = userDataString ? await userDataString : null;
    
    if (!userData || !userData._id) {
      throw new Error("User not found");
    }

    const response = await axios.post(
      `/api/profile/upload-profile-picture/${userData._id}`,
      profileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Backend returns: { success: true, message, data: user }
    return {
      success: true,
      data: response.data.data as AuthUser,
      message: response.data.message || "Profile updated successfully",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "Update profile failed"
    );
  }
};

export const handleAdminRegister = async (
  adminData: AdminRegisterData
) => {
  try {
    const response = await axios.post(
      API.ADMIN.REGISTER,
      adminData
    );

    return {
      success: true,
      data: response.data.data as AuthUser,
      message:
        response.data.message ||
        "Admin account created successfully",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    return {
      success: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "Admin registration failed",
    };
  }
};
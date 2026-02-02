import axios from "./axios";
import type { AxiosError } from "axios";

import { API } from "./endpoints";
import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "@/app/(auth)/schema";

import type { AuthUser } from "../types/AuthUser";
import type { AdminRegisterData } from "@/app/admin/register/schema";

/* -------------------------------- REGISTER -------------------------------- */

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

/* ---------------------------------- LOGIN ---------------------------------- */

export const login = async (loginData: LoginSchemaType) => {
  try {
    const response = await axios.post(API.AUTH.LOGIN, loginData);

    return {
      success: true,
      token: response.data.token as string,
      data: response.data.data as AuthUser,
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

/* -------------------------------- WHO AM I --------------------------------- */

export const whoAmI = async () => {
  try {
    const response = await axios.get(API.AUTH.WHOAMI);

    return {
      success: true,
      data: response.data.data as AuthUser,
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

/* ------------------------------ UPDATE PROFILE ------------------------------ */

export const updateProfile = async (profileData: FormData) => {
  try {
    const response = await axios.put(
      API.AUTH.UPDATE_PROFILE,
      profileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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

/* ----------------------------- ADMIN REGISTER ------------------------------- */

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

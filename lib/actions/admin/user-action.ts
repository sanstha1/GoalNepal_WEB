"use server";

import { createUser } from "@/lib/api/admin/user";
import { revalidatePath } from "next/cache";

export const handleCreateUser = async (data: FormData) => {
  try {
    const response = await createUser(data);

    if (response.success) {
      revalidatePath("/admin/users");
      return {
        success: true,
        message: "Registration successful",
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message || "Registration failed",
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Registration action failed",
    };
  }
};

"use server";

import { cookies } from "next/headers";
import { registerForTournament as apiRegister } from "@/lib/api/registration";

export interface RegistrationPayload {
  tournamentId: string;
  tournamentTitle: string;
  teamName: string;
  captainName: string;
  captainPhone: string;
  captainEmail: string;
  playerCount: number;
}

export const handleRegisterForTournament = async (payload: RegistrationPayload) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "You must be logged in to register" };
    }

    const result = await apiRegister(payload, token);
    return result;
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Registration failed",
    };
  }
};
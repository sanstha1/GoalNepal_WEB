import axios from "./axios";
import type { AxiosError } from "axios";

export interface RegistrationPayload {
  tournamentId: string;
  tournamentTitle: string;
  teamName: string;
  captainName: string;
  captainPhone: string;
  captainEmail: string;
  playerCount: number;
}

export const registerForTournament = async (payload: RegistrationPayload, token?: string) => {
  try {
    const response = await axios.post("/api/registrations", payload, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return {
      success: true,
      data: response.data.data,
      message: response.data.message || "Registered successfully",
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "Registration failed",
    };
  }
};

export const getMyRegistrations = async () => {
  try {
    const response = await axios.get("/api/registrations/my");
    return {
      success: true,
      data: response.data.data || response.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message: err.response?.data?.message || err.message || "Failed to fetch registrations",
      data: [],
    };
  }
};
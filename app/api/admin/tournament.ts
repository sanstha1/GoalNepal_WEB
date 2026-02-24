import axios from "@/lib/api/axios";
import type { AxiosError } from "axios";
import { API } from "@/lib/api/endpoints";

export const createTournament = async (data: FormData) => {
    try {
        const response = await axios.post(API.ADMIN.TOURNAMENT.CREATE, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: true,
            data: response.data.data,
            message: response.data.message || "Tournament created successfully",
        };
    } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Create tournament failed"
        );
    }
};

export const updateTournament = async (tournamentId: string, data: FormData) => {
    try {
        const response = await axios.put(API.ADMIN.TOURNAMENT.UPDATE(tournamentId), data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: true,
            data: response.data.data,
            message: response.data.message || "Tournament updated successfully",
        };
    } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Update tournament failed"
        );
    }
};

export const deleteTournament = async (tournamentId: string) => {
    try {
        const response = await axios.delete(API.ADMIN.TOURNAMENT.DELETE(tournamentId));

        return {
            success: true,
            data: response.data.data,
            message: response.data.message || "Tournament deleted successfully",
        };
    } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Delete tournament failed"
        );
    }
};

export const getAllTournaments = async () => {
    try {
        const response = await axios.get(API.ADMIN.TOURNAMENT.GET_ALL);

        return {
            success: true,
            data: response.data.data,
            message: response.data.message || "Tournaments fetched successfully",
        };
    } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Fetch tournaments failed"
        );
    }
};

export const getTournamentById = async (tournamentId: string) => {
    try {
        const response = await axios.get(API.ADMIN.TOURNAMENT.GET_BY_ID(tournamentId));

        return {
            success: true,
            data: response.data.data,
            message: response.data.message || "Tournament fetched successfully",
        };
    } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Fetch tournament failed"
        );
    }
};
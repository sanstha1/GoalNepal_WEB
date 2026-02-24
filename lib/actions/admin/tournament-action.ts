"use server";

import { createTournament, updateTournament, deleteTournament } from "@/app/api/admin/tournament";
import { revalidatePath } from "next/cache";

export const handleCreateTournament = async (data: FormData) => {
    try {
        const response = await createTournament(data);

        if (response.success) {
            revalidatePath("/admin/tournaments");
            return {
                success: true,
                message: response.message || "Tournament created successfully",
                data: response.data,
            };
        }

        return {
            success: false,
            message: "Tournament creation failed",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "Tournament creation action failed",
        };
    }
};

export const handleUpdateTournament = async (tournamentId: string, data: FormData) => {
    try {
        const response = await updateTournament(tournamentId, data);

        if (response.success) {
            revalidatePath("/admin/tournaments");
            revalidatePath(`/admin/tournaments/${tournamentId}`);
            return {
                success: true,
                message: response.message || "Tournament updated successfully",
                data: response.data,
            };
        }

        return {
            success: false,
            message: "Tournament update failed",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "Tournament update action failed",
        };
    }
};

export const handleDeleteTournament = async (tournamentId: string) => {
    try {
        const response = await deleteTournament(tournamentId);

        if (response.success) {
            revalidatePath("/admin/tournaments");
            return {
                success: true,
                message: response.message || "Tournament deleted successfully",
            };
        }

        return {
            success: false,
            message: "Tournament deletion failed",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "Tournament deletion action failed",
        };
    }
};
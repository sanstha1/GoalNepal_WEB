import { API } from "../endpoints";
import axios from "../axios";
import { AxiosError } from "axios";

export const createUser = async (userData: unknown) => {
    try {
        const response = await axios.post(
            API.ADMIN.USER.CREATE,
            userData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Create user failed');
        }
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(axiosError?.response?.data?.message || 'Create user failed');
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(API.ADMIN.USER.GET_ALL);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Get all users failed');
        }
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(axiosError?.response?.data?.message || 'Get all users failed');
    }
}

export const getUserById = async (userId: string) => {
    try {
        const response = await axios.get(`${API.ADMIN.USER.GET_BY_ID}/${userId}`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Get user failed');
        }
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(axiosError?.response?.data?.message || 'Get user failed');
    }
}

export const updateUser = async (userId: string, userData: unknown) => {
    try {
        const response = await axios.put(
            `${API.ADMIN.USER.UPDATE}/${userId}`,
            userData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Update user failed');
        }
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(axiosError?.response?.data?.message || 'Update user failed');
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const response = await axios.delete(`${API.ADMIN.USER.DELETE}/${userId}`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Delete user failed');
        }
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(axiosError?.response?.data?.message || 'Delete user failed');
    }
}
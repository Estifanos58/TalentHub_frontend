"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const getUser = async () => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return { success: false, status: 401, message: "No token found", data: null };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    const response = await axios.get(`${apiUrl}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return { success: true, status: response.status, data: response.data.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error.response?.status || 500,
        message:
          error.response?.data?.message || "Failed to fetch user data",
      };
    }
    return { success: false, status: 500, message: "Unexpected error" };
  }
};

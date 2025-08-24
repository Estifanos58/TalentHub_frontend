"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const getAdminDashboard = async () => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return { success: false, status: 401, message: "User not authenticated" };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get(`${apiUrl}/admin`, {
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
          error.response?.data?.message ||
          "Failed to fetch admin dashboard data",
      };
    }
    return { success: false, status: 500, message: "Unexpected error" };
  }
};

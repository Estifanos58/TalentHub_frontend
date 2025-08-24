"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function createJob(data: FormData) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return { success: false, status: 401, message: "No token found" };
    }

    const res = await axios.post(`${apiUrl}/jobs/`, data, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return { success: true, status: res.status, data: res.data.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to create job",
      };
    }
    return { success: false, status: 500, message: "Unexpected error" };
  }
}

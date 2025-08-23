"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const getAdminDashboard = async() => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      throw new Error("User not authenticated");
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get(`${apiUrl}/admin`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch admin dashboard data");
    }

    return response.data.data;


  } catch (error) {
    throw error;
  }
};

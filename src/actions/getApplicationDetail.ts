"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getApplicationDetail(applicationId: string) {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      throw new Error("User not authenticated");
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get(`${apiUrl}/application/${applicationId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch application details");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

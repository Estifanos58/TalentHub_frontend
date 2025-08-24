"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const updateApplicationStatus = async ({
  applicationId,
  status,
}: {
  applicationId: string;
  status: string;
}) => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return { success: false, status: 401, message: "User not authenticated" };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.patch(
      `${apiUrl}/application/${applicationId}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    return { success: true, status: response.status, data: response.data.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error.response?.status || 500,
        message:
          error.response?.data?.message ||
          "Failed to update application status",
      };
    }
    return { success: false, status: 500, message: "Unexpected error" };
  }
};

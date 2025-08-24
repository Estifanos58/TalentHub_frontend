'use server'

import axios from "axios";

export async function getJobs(
  searchParams: { [key: string]: string | string[] | undefined },
  yourJob?: boolean,
  userId?: string
) {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(
        ([key, value]) => typeof key === "string" && value !== undefined
      )
    );

    // console.log("Your Job", yourJob, "User ID:", userId);

    const query = new URLSearchParams(filteredParams as Record<string, string>);

    if (yourJob !== undefined) {
      query.append("userId", userId || "");
      query.append("yourJob", yourJob.toString());
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await axios.get(`${apiUrl}/jobs/?${query.toString()}`, {
      withCredentials: true,
    });

    // console.log("API response:", res);
    return { success: true, status: res.status, data: res.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to fetch jobs",
      };
    }
    return { success: false, status: 500, message: "Unexpected error" };
  }
}

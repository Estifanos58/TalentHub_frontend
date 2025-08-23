"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const applyJob = async (
  jobId: string,
  coverLetter: string,
  resumeUrl: string | null
) => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) {
      throw new Error("User not authenticated");
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post(
      `${apiUrl}/application`,
      {
        jobId,
        coverLetter,
        resume: resumeUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if(response.status !== 201) {
      throw new Error("Failed to submit application");
    }

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

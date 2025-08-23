"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function deleteJob(jobId: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) throw new Error("No token found");

    const res = await axios.delete(`${apiUrl}/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if(res.status !== 200) throw new Error('Deletion Error Occured')
    
    return res.data
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

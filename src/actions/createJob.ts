"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function createJob(data: FormData) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) throw new Error("No token found");

    const res = await axios.post(`${apiUrl}/jobs/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return res.data.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create job");
  }
}

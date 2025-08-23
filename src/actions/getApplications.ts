"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getApplications({
  searchParams,
  jobId,
}: {
  searchParams: any;
  jobId?: string;
}) {
  try {

    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) {
      throw new Error("User not authenticated");
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const page = parseInt((searchParams.page as string) || "1");
    const ITEM_PER_PAGE = parseInt(process.env.ITEMS_PER_PAGE || "10");

    const response = await axios.get(`${apiUrl}/application`, {
      params: {
        jobId: jobId,
        page,
        limit: ITEM_PER_PAGE,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch applications");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

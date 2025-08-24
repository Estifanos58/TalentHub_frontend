import axios from "axios";
import { cookies } from "next/headers";

export async function getApplications(
  searchParams: { [key: string]: string | string[] | undefined },
  jobId?: string
) {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) {
      return {
        success: false,
        status: 401,
        message: "User not authenticated",
      };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const page = parseInt((searchParams.page as string) || "1");
    const ITEM_PER_PAGE = parseInt(process.env.ITEMS_PER_PAGE || "10");

    const response = await axios.get(`${apiUrl}/application`, {
      params: {
        jobId,
        page,
        limit: ITEM_PER_PAGE,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return { success: true, status: response.status, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
    return {
      success: false,
      status: 500,
      message: "Unexpected error occurred",
    };
  }
}

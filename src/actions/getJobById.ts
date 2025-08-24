import axios from "axios";

export async function getJobById(id: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`,
      { withCredentials: true }
    );

    return { success: true, status: res.status, data: res.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error.response?.status || 500,
        message:
          error.response?.data?.message || "Failed to fetch job by ID",
      };
    }
    return { success: false, status: 500, message: "Unexpected error" };
  }
}

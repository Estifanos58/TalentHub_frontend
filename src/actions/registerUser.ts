"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const cookie = await cookies();

    const response = await axios.post(`${apiUrl}/auth/register`, data, {
      withCredentials: true,
    });

    cookie.set("token", response.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return { success: true, status: response.status, data: response.data.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error.response?.status || 500,
        message:
          error.response?.data?.message || "Failed to register user",
      };
    }
    return { success: false, status: 500, message: "Unexpected error" };
  }
};

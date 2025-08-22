"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const registerUser = async (data: { username: string; email: string; password: string }) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const cookie = await cookies()
    const response = await axios.post(`${apiUrl}/auth/register`, data,{ withCredentials:true });

    if(response.status !== 201) {
        throw new Error('Failed to register user');
    }

    cookie.set('token', response.data.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
    return response.data.data;

  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}



/*

  const cookie = await cookies()
    const token = cookie.get('token')?.value;
    if(!token) {
        throw new Error('No token found');
    }
    const response = await axios.post('/api/register', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

*/
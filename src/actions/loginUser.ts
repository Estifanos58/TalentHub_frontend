'use server';

import axios from "axios";
import { cookies } from "next/headers";

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const cookie = await cookies()
        const response = await axios.post(`${apiUrl}/auth/login`, data,{ withCredentials:true });
    
        if(response.status !== 200) {
            throw new Error('Failed to login user');
        }
    
        cookie.set('token', response.data.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
        return response.data.data;
    
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}